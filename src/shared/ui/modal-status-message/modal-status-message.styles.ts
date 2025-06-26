import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    closeModalButton: {
        alignItems: "flex-end",
        width: 343,
        height: 20,
    },
    mainModalView: {
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#E9E5EE"
    },
    messageText: {
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 16,
        color: "#070A1C"
    },
    messageView: {
        padding: 16
    },
    statusText: {
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 24,
        color: "#070A1C",
    },
    button: {
		padding: 10,
		paddingHorizontal: 15,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 8,
        backgroundColor: "#543C52"
	},
});
