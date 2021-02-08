import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btnContainer: {
        marginVertical: 10,
        marginHorizontal: 15
    },
    fieldView: {
        marginTop: 10
    },
    btnView: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    btn: {
        flex: 1,
        marginHorizontal: 5
    },
    labelText: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5
    }
});

export default styles;