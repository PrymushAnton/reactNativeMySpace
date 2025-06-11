import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	friendCard: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#CDCED2",
		padding: 12,
        width: "95%",
        borderRadius: 10
	},
	button: {
		// width: 32,
		// height: 32,
		padding: 8,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 8,
	},
	userInfo: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
});
