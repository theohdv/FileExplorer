import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  node_item: {
    height: 50,
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "grey",
    flexDirection: "row",
    paddingHorizontal: 20
  },
  left_part: {
    flex: 1
  },
  right_part: {
    flex: 1,
    alignItems: "flex-end"
  },
  middle_part: {
    flex: 8
  },
  last_update: {
    fontSize: 10,
    opacity: 0.7
  }
});

export default styles;
