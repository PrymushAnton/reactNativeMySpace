import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		width: 350,
		height: "80%",
		backgroundColor: "white",
		borderRadius: 20,
		paddingTop: 24,
		paddingHorizontal: 44,
		paddingBottom: 44,
		gap: 24,
	},
	search: {
		backgroundColor: "#FFFFFF",
		borderColor: "#CDCED2",
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 16,
		paddingVertical: 10,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		width: "100%",
	},
	bottom: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignSelf: "flex-end",
		gap: 16,
	},
	main: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	topText: {
		fontSize: 34,
		fontWeight: 500,
		marginBottom: 10,
		alignSelf: "center",
	},
	butt1: {
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderWidth: 1,
		borderColor: "#543C52",
		borderRadius: 1234,
	},
	butt2: {
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 1234,
		backgroundColor: "#543C52",
	},
});
