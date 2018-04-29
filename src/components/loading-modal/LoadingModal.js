/**
 * External import
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text, View, Modal, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

/**
 * Internal import
 */
import { styles } from "./style";
import I18n from "../../internationalization";

class LoadingModal extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    text: PropTypes.string,
    onRequestClose: PropTypes.func
  };

  static defaultProps = {
    visible: false,
    onRequestClose: () => {}
  };

  constructor(props) {
    super(props);
  }

  render() {
    let text = I18n.t("please_wait");
    if (this.props.text) {
      text = this.props.text;
    }

    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}
        supportedOrientations={[
          "portrait",
          "portrait-upside-down",
          "landscape"
        ]}
      >
        <View style={styles.modal_container}>
          <ActivityIndicator size="large" />
          <Text style={styles.text_modal}>{text}</Text>
        </View>
      </Modal>
    );
  }
}

export default LoadingModal;
