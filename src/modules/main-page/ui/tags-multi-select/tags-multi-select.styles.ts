import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants";

export const styles = StyleSheet.create({
	// styleDropdownMenu: {
	// 	borderWidth: 1,
	// 	borderRadius: 10,
	// 	borderColor: "#ccc",
	// 	alignItems: "center",
	// 	justifyContent: "center",
	// 	overflow: "hidden",
	// 	height: 42,
	// },
	// styleSelectorContainer: {
	// 	borderRadius: 10,
	// 	overflow: "hidden",
	// 	borderWidth: 0,
	// 	shadowColor: "transparent",
	// },
	// styleListContainer: {
	// 	borderWidth: 1,
	// 	borderColor: "#CDCED2",
	// 	borderTopLeftRadius: 10,
	// 	borderTopRightRadius: 10,
	// 	backgroundColor: "#fff",
	// 	marginTop: 5,
	// 	maxHeight: 250,

	// },
	// styleDropdownMenuSubsection: {
	// 	paddingRight: 5,
	// 	height: 51,
	// },
	mainInputTagsView: {
		marginBottom: 10,
		position: "relative",
	},
	mainInputTagsTouchableOpacity: {
		borderColor: "#CDCED2",
		borderWidth: 1,
		borderRadius: 12,
		// paddingVertical: 10,
		paddingHorizontal: 14,
		height: 42,
		justifyContent: "center",
	},

	tagsView: {
		position: "absolute",
		top: 50,
		left: 0,
		right: 0,
		borderRadius: 12,
		backgroundColor: "#fff",
		borderColor: "#D1D5DB",
		borderWidth: 1,
		maxHeight: 250,
		overflow: "hidden",
		zIndex: 9999,
		elevation: 10, // для дроида
	},
	tagsInputSearch: {
		height: 40,
		borderBottomWidth: 1,
		borderColor: "#ccc",
		margin: 10,
		paddingHorizontal: 10,
		borderRadius: 10,
		backgroundColor: "#fff",
		fontFamily: "GTWalsheimPro-Regular",
	},
	tagsTouchableOpacity: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 10,
		marginBottom: 6,
	},
	tagsConfirmButtonTouchableOpacity: {
		backgroundColor: "#543C52",
		padding: 12,
		borderTopWidth: 1,
		borderTopColor: "#D1D5DB",
	},

	selectedTagMainView: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	selectedTagView: {
		flexDirection: "row",
		alignItems: "center",
		borderColor: "#CDCED2",
		borderWidth: 1,
		borderRadius: 50,
		paddingVertical: 4,
		paddingHorizontal: 10,
		marginRight: 8,
		backgroundColor: "#fff",
		marginTop: 10,
	},
	selectedTagText: {
		marginRight: 6,
		fontSize: 14,
		color: "#000",
		fontFamily: "GTWalsheimPro-Regular",
	},
	selectedTagCloseButtonTouchableOpacity: {
		backgroundColor: "#CDCED2",
		borderRadius: 999,
		padding: 4,
		justifyContent: "center",
		alignItems: "center",
	},
});
