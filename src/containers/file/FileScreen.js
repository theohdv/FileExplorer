import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../actions";
import moment from "moment";
import I18n from "../../internationalization";
import styles from "./style";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ImageView from "../../components/image-view";
import AudioView from "../../components/audio-view";
import Video from "react-native-af-video-player";

class FileScreen extends Component {
  state = {
    node: this.props.navigation.getParam("node", null),
    modal_visible: false
  };

  static navigationOptions = ({ navigation }) => {
    const show_header = navigation.getParam("full_screen", true);
    return {
      header: show_header ? undefined : null,
      headerTitle: (
        <Text style={styles.header_title}>
          {navigation.getParam("file_name", "")}
        </Text>
      ),
      headerRight: (
        <TouchableOpacity
          onPress={navigation.state.params.openModal}
          style={styles.infos}
        >
          <FontAwesome name="info-circle" size={20} color="#177efb" />
        </TouchableOpacity>
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      openModal: this._openModal
    });
  }

  _openModal = () => {
    this.setState({ modal_visible: true });
  };

  _closeModal = () => {
    this.setState({ modal_visible: false });
  };

  _onFullScreen(status) {
    this.props.navigation.setParams({
      full_screen: !status
    });
  }

  _renderFile = () => {
    const node = this.state.node;
    switch (node.mimetype.split("/")[0]) {
      case "image":
        return <ImageView url={node.url} />;
      case "audio":
        return <AudioView url={node.url} />;
      case "video":
        return (
          <Video
            url={node.url}
            onFullScreen={status => this._onFullScreen(status)}
          />
        );
    }
  };

  render() {
    const { modal_visible, node } = this.state;

    return (
      <SafeAreaView style={styles.screen_container}>
        {this._renderFile()}
        <Modal
          animationType="none"
          transparent={true}
          visible={modal_visible}
          onRequestClose={this._closeModal}
          supportedOrientations={[
            "portrait",
            "portrait-upside-down",
            "landscape"
          ]}
        >
          <TouchableWithoutFeedback onPress={this._closeModal}>
            <View style={styles.modal_container}>
              <TouchableWithoutFeedback onPress={() => null}>
                <View style={styles.infos_container}>
                  <Text>{I18n.t("infos_name", { name: node.name })}</Text>
                  <Text>
                    {I18n.t("infos_mimetype", { mimetype: node.mimetype })}
                  </Text>
                  <Text>
                    {I18n.t("infos_updated_at", {
                      date: moment.unix(node.modification_time).format('LLL')
                    })}
                  </Text>
                  <Text>
                    {I18n.t("infos_url", {
                      url: node.url
                    })}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(FileScreen);
