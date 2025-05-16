import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants";

export const styles = StyleSheet.create({
	mainCustomTagsTextInputView: {
		position: "relative",
		borderWidth: 1,
		borderColor: "#CDCED2",
		borderRadius: 10,
		paddingRight: 80,
		paddingLeft: 12,
	},
	customTagsTextInput: {
		fontFamily: "GTWalsheimPro-Regular",
		fontSize: 14,
		paddingRight: 10,
		height: 42,
	},
	buttonAddCustomTag: {
		position: "absolute",
		right: 10,
		top: 7,
		backgroundColor: "#543C52",
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 10,
	},
	mainTagsView: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		marginTop: 10,
	},
	mappingTagsView: {
		borderWidth: 1,
		borderColor: "#CDCED2",
		backgroundColor: "#F3F4F6",
		borderRadius: 20,
		paddingHorizontal: 12,
		paddingVertical: 6,
		flexDirection: "row",
		alignItems: "center",
	},
	textTags: {
		fontFamily: "GTWalsheimPro-Regular",
		color: "#070A1C",
		fontSize: 14,
	},
});
