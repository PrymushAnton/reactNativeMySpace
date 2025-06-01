import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants";

export const styles = StyleSheet.create({
	containerMainView: {
		backgroundColor: "#fff",
		borderRadius: 20,
		paddingTop: 24,
        paddingBottom: 24,
        // paddingLeft: 16,
        // paddingRight: 16,
		width: "90%",
        minHeight: 467,
        alignItems: "flex-end",
        justifyContent: "center",
        alignSelf: "center"
	},
	titleDetailsMainText: {
		fontSize: 20,
		fontWeight: "700",
		textAlign: "center",
		marginBottom: 24,
		color: "#070A1C",
        fontFamily: "GTWalsheimPro-Regular",
	},
	variantsOfNameAndSurnameText: {
		fontSize: 14,
		marginTop: 8,
		marginBottom: 16,
		color: "#070A1C",
		textAlign: "center",
        fontFamily: "GTWalsheimPro-Regular",
	},
	buttonNext: {
		backgroundColor: "#543C52",
		// paddingVertical: 14,
		borderRadius: 30,
		alignItems: "center",
        justifyContent: "center",
		// marginTop: 8,
        width: 112,
        height: 40
	},
	buttonNextText: {
		color: "#fff",
		fontSize: 14,
		fontWeight: "600",
        fontFamily: "GTWalsheimPro-Regular",
	},
});
