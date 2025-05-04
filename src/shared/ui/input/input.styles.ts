import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
	inputBox: {
		height: 60,
		flexDirection: "row",
		alignItems: "center",
		// justifyContent: "flex-start",
		paddingHorizontal: 15,
		borderRadius: 25,
		backgroundColor: COLORS.GREY,
		maxWidth: 330,
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