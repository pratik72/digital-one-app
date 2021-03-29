import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,

    },
    paginationView: {
        justifyContent: 'flex-end',
        flex: 1,
        marginVertical: 20
    }
});

export default styles;