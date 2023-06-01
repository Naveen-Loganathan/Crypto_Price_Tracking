import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        // paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: "space-between"
    },
    tickerContainer: {
        flexDirection: "row",
        justifyContent: "center"
    },
    tickerTitle: {
        color: 'white',
        fontSize: 19,
        fontWeight: "bold",
        marginHorizontal: 5
    },
    rankContainer: {
        backgroundColor: '#585858',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5
    },
    rankTitle: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 15
    }
})

export default styles