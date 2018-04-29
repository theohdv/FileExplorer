import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  TouchableHighlight,
  RefreshControl,
  Alert,
  NativeEventEmitter,
  NativeModules,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../actions";
import I18n from "../../internationalization";
import styles from "./style";
import NodeItem from "../../components/node-item";
import OpenFile from "react-native-doc-viewer";
import LoadingModal from "../../components/loading-modal";

const INGREDIENTS_MAX = 3;
const MEDIA_TYPE = ["audio", "video", "image"];

class NodesList extends Component {
  state = {
    path: this.props.navigation.getParam("path", "/nodes"),
    loading: false
  };

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: (
      <Text style={styles.header_title}>
        {navigation.getParam("title", I18n.t("my_documents"))}
      </Text>
    )
  });

  constructor(props) {
    super(props);
    this.eventEmitter = new NativeEventEmitter(
      NativeModules.RNReactNativeDocViewer
    );
    this.eventEmitter.addListener("DoneButtonEvent", this._closeLoadingModal);
  }

  componentDidMount() {
    if (this.props.nodes[this.state.path]) {
      return;
    }
    this._fetchNode(this.state.path);
  }

  componentWillUnmount() {
    this.eventEmitter.removeListener();
  }

  _closeLoadingModal = () => {
    this.setState({ loading: false });
  };

  _fetchNode = path => {
    try {
      this.props.fetchNodes(path);
    } catch (e) {
      Alert.alert("", I18n.t("error"));
    }
  };

  _onRefresh = () => {
    this._fetchNode(this.state.path);
  };

  _onNodePress = node => {
    if (node.mimetype === "inode/directory") {
      const path = `${this.state.path}${node.path}`;
      this.props.navigation.navigate("NodesList", { path, title: node.name });
    } else if (MEDIA_TYPE.indexOf(node.mimetype.split("/")[0]) > -1) {
      this.props.navigation.navigate("FileScreen", {
        node,
        file_name: node.name
      });
    } else {
      this.setState({ loading: true });
      OpenFile.openDoc(
        [
          {
            url: node.url,
            fileName: node.name,
            cache: false,
            fileType: node.mimetype
          }
        ],
        (error, url) => {
          if (Platform.OS == "android") {
            this.setState({ loading: false });
          }
          if (error) {
            this.setState({ loading: false }, () => {
              Alert.alert("", I18n.t("error_file"));
            });
          }
        }
      );
    }
  };

  _renderNode = node => {
    return (
      <NodeItem key={node.id} node={node} onNodePress={this._onNodePress} />
    );
  };

  render() {
    const { nodes } = this.props;
    const path = this.state.path;

    return (
      <SafeAreaView style={styles.screen_container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={nodes[path] ? nodes[path].loading : false}
              onRefresh={this._onRefresh}
            />
          }
        >
          {nodes[this.state.path] &&
            nodes[this.state.path].list &&
            nodes[this.state.path].list.map(node => {
              return this._renderNode(node);
            })}
        </ScrollView>
        <LoadingModal visible={this.state.loading} />
      </SafeAreaView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    nodes: state.nodes
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NodesList);
