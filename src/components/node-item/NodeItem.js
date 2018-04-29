import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./style";
import moment from "moment";
import I18n from "../../internationalization";

class NodeItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  _getIconName = () => {
    const node_type = this.props.node.mimetype.split("/")[0];

    switch (node_type) {
      case "image":
        return "file-image-o";
      case "video":
        return "file-video-o";
      case "application":
        return "file";
      case "inode":
        return "folder";
      case "audio":
        return "file-audio-o";
      default:
        return "file-o";
    }
  };

  render() {
    const { node } = this.props;
    const date_formatted = moment.unix(node.modification_time).fromNow();
    const icon_name = this._getIconName();

    return (
      <TouchableOpacity
        key={node.id}
        onPress={() => {
          this.props.onNodePress(node);
        }}
      >
        <View style={styles.node_item}>
          <View style={styles.left_part}>
            <FontAwesome name={icon_name} size={20} />
          </View>
          <View style={styles.middle_part}>
            <Text style={styles.node_title}>{node.name}</Text>
            <Text style={styles.last_update}>
              {I18n.t("last_update", { date: date_formatted })}
            </Text>
          </View>
          <View style={styles.right_part}>
            {node.mimetype === "inode/directory" && (
              <FontAwesome name="angle-right" size={20} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

NodeItem.propTypes = {
  node: PropTypes.object.isRequired,
  onNodePress: PropTypes.func.isRequired
};

export default NodeItem;
