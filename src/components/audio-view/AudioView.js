/**
 * External import
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ProgressViewIOS,
  Platform
} from "react-native";
import ProgressBar from "ProgressBarAndroid";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Sound from "react-native-sound";
import styles from "./style";
import moment from "moment";
import I18n from "../../internationalization";

class AudioView extends PureComponent {
  state = {
    loading: true,
    is_paused: true,
    time: 0,
    progress: 0
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { url } = this.props;
    this.sound = new Sound(url, undefined, error => {
      if (error) {
        Alert.alert('', I18n.t("error"));
      } else {
        this.setState({
          loading: false,
          duration: this.sound.getDuration()
        });
      }
    });
  }

  componentWillUnmount() {
    this.sound.release();
    this._stopTick();
  }

  _formatTime(time) {
    const time_rounded = Math.round(time);
    const mins = Math.floor((time_rounded % 3600) / 60);
    const secs = time_rounded % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  _startTick = () => {
    this.tick_interval = setInterval(() => {
      this._tick();
    }, 1000);
  };

  _stopTick() {
    if (this.tick_interval) {
      clearInterval(this.tick_interval);
      this.tick_interval = null;
    }
  }

  _tick() {
    this.sound.getCurrentTime(seconds => {
      if (this.tick_interval) {
        this.setState({
          time: seconds,
          progress: seconds / this.state.duration
        });
      }
    });
  }

  _playCallback = success => {
    this._stopTick();
    this.setState({
      time: this.state.duration,
      progress: 1,
      is_paused: "play"
    });
    this.sound.stop();
  };

  _toggleSound = () => {
    if (this.state.is_paused) {
      if (!this.tick_interval) this._startTick();
      this.sound.play(this._playCallback);
    } else {
      this._stopTick();
      this.sound.pause();
    }
    this.setState({ is_paused: !this.state.is_paused });
  };

  render() {
    const { url } = this.props;
    const { is_paused } = this.state;

    return (
      <View>
        {this.state.loading ? (
          <ActivityIndicator />
        ) : (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {Platform.select({
              ios: (
                <ProgressViewIOS
                  style={styles.progress_bar}
                  progress={this.state.progress}
                />
              ),
              android: (
                <ProgressBar
                  styleAttr="Horizontal"
                  indeterminate={false}
                  style={styles.progress_bar}
                  progress={this.state.progress}
                />
              )
            })}
            <View style={styles.time_container}>
              <Text style={styles.time_desc}>
                {this._formatTime(this.state.time)}
              </Text>
              <Text style={styles.time_desc}>
                {this._formatTime(this.state.duration)}
              </Text>
            </View>
            <TouchableOpacity onPress={this._toggleSound}>
              <FontAwesome name={is_paused ? "play" : "pause"} size={25} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

AudioView.propTypes = {
  url: PropTypes.string.isRequired
};

export default AudioView;
