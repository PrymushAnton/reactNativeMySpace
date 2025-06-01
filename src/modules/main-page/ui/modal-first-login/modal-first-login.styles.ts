import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 24,
		width: "90%",
		alignSelf: "center"
	},
	title: {
		fontSize: 20,
		fontWeight: "700",
		textAlign: "center",
		marginBottom: 24,
		color: "#000"
	},
	inputWrapper: {
		marginBottom: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: "#DADADA",
		borderRadius: 10,
		paddingVertical: 12,
		paddingHorizontal: 16,
		fontSize: 16,
		color: "#000"
	},
	label: {
		marginBottom: 6,
		fontSize: 14,
		color: "#000"
	},
	usernameHint: {
		fontSize: 12,
		color: "#22C55E",
		textAlign: "left",
		marginTop: -8,
		marginBottom: 16
	},
	suggestion: {
		fontSize: 14,
		marginTop: 8,
		marginBottom: 16,
		color: "#000",
		textAlign: "center"
	},
	button: {
		backgroundColor: "#543C52",
		paddingVertical: 14,
		borderRadius: 12,
		alignItems: "center",
		marginTop: 8
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600"
	},
	closeButton: {
		position: "absolute",
		top: 12,
		right: 12,
		zIndex: 1
	},
	atSymbol: {
		position: "absolute",
		left: 16,
		top: 42,
		color: "#999"
	}
});
