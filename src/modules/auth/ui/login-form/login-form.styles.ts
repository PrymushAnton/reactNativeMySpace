import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {

        flex: 1, 
        justifyContent: "flex-end", 
        gap: 30
    },

    form: {
        minHeight: 300,
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
    },
})