import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen_container: {
    flex: 1,
    justifyContent: "center"
  },
  infos: {
    width: 45,
    paddingRight: 9,
    alignItems: "flex-end"
  },
  modal_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  },
  infos_container: {
    borderRadius: 3,
    width: "90%",
    height: 200,
    backgroundColor: "white",
    padding: 20
  }
});

export default styles;
