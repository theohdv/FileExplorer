import { StackNavigator } from "react-navigation";
import NodesList from "../containers/nodes-list";
import FileScreen from "../containers/file";

const RootNavigator = StackNavigator(
  {
    NodesList: { screen: NodesList },
    FileScreen: { screen: FileScreen }
  },
  {
    initialRouteName: "NodesList",
    headerMode: "float"
  }
);

export default RootNavigator;
