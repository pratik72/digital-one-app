import { StyleSheet } from "react-native";
import { Colors } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  chipStyle: {
    margin: 4,
    height: 35
  },
  btnStyle: {
    marginHorizontal: 5
  },
  btnStyle2: {
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderColor: '#0000001f',
    borderWidth: 1,
    flex: 1
  },
  btnText: {
    fontSize: 16,
    color: Colors.deepPurpleA700,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  listRow: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 20
  },
  disabledRow: {
    backgroundColor: '#0000001f'
  },
  listView: {
    flex: 1,
    marginBottom: 0
  },
  listContainer: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#CEDCCE'
  },
  listText: {
    color: '#2684FF', fontSize: 16, fontWeight: 'bold'
  },
  disabledText: {
    color: '#00000042'
  },
  rowSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CEDCCE"
  },

  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },

  modalView: {
    flex: 1,
    marginVertical: 20
  },
  modalLable: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 10
  }
});

export default styles;