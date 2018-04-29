import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { ImageBackground, ActivityIndicator } from "react-native";
import styles from "./style";
import moment from "moment";

class ImageView extends PureComponent {
  state = {
    loading: true
  };

  constructor(props) {
    super(props);
  }

  _onImageLoadEnd = () => {
    this.setState({ loading: false });
  };

  render() {
    const { url } = this.props;
    const { loading } = this.state;

    return (
      <ImageBackground
        source={{ uri: url }}
        style={styles.image}
        onLoadEnd={this._onImageLoadEnd}
      >
        {loading && <ActivityIndicator />}
      </ImageBackground>
    );
  }
}

ImageView.propTypes = {
  url: PropTypes.string.isRequired
};

export default ImageView;
