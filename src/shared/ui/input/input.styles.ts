import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	inputBox: {
		height: 60,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 15,
		borderRadius: 10,
		backgroundColor: "#FFFFFF",
		borderColor:"#CDCED2",
		borderWidth: 1,
		maxWidth: "auto",
		width: "100%"

	},

	inputEmailCodeBox: {
		width: 40,
		height: 40,
		borderWidth: 1,
		borderColor: "#CDCED2",
		borderRadius: 10,
	},
	inputEmailCode: {
		height: "100%",
		textAlign: "center",
	},
	labelEmailCode: {
		fontWeight: 500,
		fontSize: 24,
		color: "#070A1C",
		fontFamily: "GTWalsheimPro-Regular"
	},
	underlineContainer: {
		position: "absolute",
		bottom: 4,
		width: "100%",
		alignItems: "center",
	},
	underline: {
		position: "absolute",
		bottom: 8,
		height: 2,
		width: 25,
		backgroundColor: "#81818D",
	},
	codeContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 10,
		marginTop: 10,
	},

	codeInput: {
		width: 40,
		height: 50,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 6,
		textAlign: "center",
		fontSize: 24,
		color: "#000",
	},

	input: {
		flex: 1,
		height: "100%",
		color: "white",
	},
	label: {
		fontWeight: 500,
		fontSize: 24,
		color: "white",
	},
	errorBox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 30,
		gap: 2,
	},
	errorMessage: {
		color: "red",
		fontSize: 16,
	},

});

