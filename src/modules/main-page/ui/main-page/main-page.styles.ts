import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants";

export const styles = StyleSheet.create({
    mainModalWindow: {
        width: 375,
        minHeight: 523,
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
        paddingTop: 24,
        paddingRight: 16,
        paddingBottom: 44,
        paddingLeft: 16,
    },
    closeModalButton: {
        alignItems: "flex-end",
        width: 343,
        height: 20
    }, 
    mainModalInputsFrame: {
        width: 343,
        height: 368,
        paddingTop: 24,
        paddingBottom: 24,
        gap: 16
    },
    themeModalInputFrame: {
        width: 343,
        height: 66,
        gap: 6
    },
});