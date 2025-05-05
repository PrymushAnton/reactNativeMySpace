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
        gap: 20,
        flex: 1
    },

    formContent: {
        alignItems: "center",
        justifyContent: "center"
    },

    inputContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        width: "100%"
    },

    buttonBlock: {
        alignSelf: "center"
    },
})