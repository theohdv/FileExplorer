import { AppRegistry } from "react-native";
import AppContainer from "./src/containers/AppContainer";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader",
  "Module RCTVideoManager"
]);

AppRegistry.registerComponent("FileExplorer", () => AppContainer);
