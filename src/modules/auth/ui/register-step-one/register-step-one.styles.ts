import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "center", 
        gap: 30
    },

    form: {
        width: "100%",
        minHeight: 250,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
    },

    inputContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        width: "100%"
    },

    buttonBlock: {
        alignSelf: "center",
        alignItems: "center"
    },
})