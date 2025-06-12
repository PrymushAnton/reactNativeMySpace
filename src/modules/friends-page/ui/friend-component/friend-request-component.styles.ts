import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	friendCard: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#CDCED2",
		padding: 16,
        width: "95%",
        borderRadius: 10
	},
	button: {
		// width: 32,
		// height: 32,
		padding: 10,
		paddingHorizontal: 15,
		borderRadius: 30,
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
