import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
        marginHorizontal: 10
    },
    btnStyle: {
        marginHorizontal: 5
    },
    scrollWrapper: {
        flex: 1,
        marginHorizontal: 15
    },
    rowView: {
        flexDirection: 'row',
        flex: 1,
        borderBottomWidth: 1,
        paddingVertical: 10,
        borderBottomColor: '#0000001f'
    },
    labelView: {
        flexGrow: 2,
        flex: 1
    },
    ValueView: {
        flexGrow: 4,
        flex: 1
    }
});

export default styles;