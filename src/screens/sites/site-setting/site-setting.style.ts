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
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        paddingVertical: 7,
        borderColor: '#0000001f'
    }
});

export default styles;