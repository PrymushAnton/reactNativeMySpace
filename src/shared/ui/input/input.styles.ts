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
	input: {
		flex: 1,
        height: '100%',
		color: "white",
    },
	
	label: {
		fontWeight: 500,
		fontSize: 24,
		color: "white"

	},
	errorBox: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
	},
	errorMessage: {
		color: "red",
		fontSize: 16,
	},
	
});