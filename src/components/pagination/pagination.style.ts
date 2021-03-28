import { StyleSheet } from "react-native";
import { Colors } from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,

    },
    btnText: {
        fontSize: 14,
        color: Colors.cyanA700
    },
    btnView: {
        paddingHorizontal: 8,
        paddingVertical: 5
    },
    activeBtnView: {
        borderColor: Colors.cyanA700,
        borderWidth: 1
    }
});

export default styles;