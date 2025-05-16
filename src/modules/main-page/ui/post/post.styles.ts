import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	post: {
		borderColor: "#CDCED2",
		borderWidth: 1,
		marginTop: 12,
		borderRadius: 12,
		backgroundColor: "#fff",
		padding: 12,
		gap: 10,
	},

	top: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	userInfo: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},

	avatar: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: "#ccc",
	},

	name: {
		fontWeight: "bold",
		color: "#070A1C",
		fontFamily: 'GTWalsheimPro-Regular',
	},

	actions: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},

	content: {
		gap: 8,
	},

	text: {
		color: "#070A1C",
		fontSize: 14,
		fontFamily: 'GTWalsheimPro-Regular',
	},

	hashtags: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 6,
	},

	hashtag: {
		color: "#543C52",
		fontSize: 14,
	},

	photoGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 6,
		marginTop: 8,
		justifyContent: "space-between",
	},

	photo: {
		width: 80,
		height: 80,
		borderRadius: 8,
	},

	reactions: {
		flexDirection: "row",
		justifyContent: "flex-start",
		marginTop: 8,
		gap: 24,
	},

	reaction: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},

	reactionText: {
		fontSize: 14,
		color: "#070A1C",
		fontFamily: 'GTWalsheimPro-Regular',
	},
	postActions: {
		flexDirection: "row",
		gap: 5,
	},
	// стили модалки
	mainSmallModalPostSettings: {
		width: 343,
		height: 140,
		borderRadius: 10,
		backgroundColor: "#E9E5EE",
		alignItems: "center",
		justifyContent: "flex-start",
		padding: 16,
		gap: 16,
	},
	threeDotsSmallModal: {
		width: 311,
		height: 20,
		justifyContent: "flex-end"
	},
	mainEditPostButton: {
		width: 172,
		height: 20,
		gap: 10,
		flexDirection: "row",

	},
	mainDeletePostButton: {
		width: 159,
		height: 20,
		gap: 10,
		flexDirection: "row",
	}
});
