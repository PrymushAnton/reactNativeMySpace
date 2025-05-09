import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { IPostProps } from "../../types/types";
// import { DotsIcon } from "../../../../shared/ui/icons/dots-icon";
// import { WritingIcon } from "../../../../shared/ui/icons/writing-icon";
// import { LikeIcon } from "../../../../shared/ui/icons/like-icon";
// import { SeenIcon } from "../../../../shared/ui/icons/seen-icon";
import { ICONS } from "../../../../shared/ui/icons";

export function Post(props: IPostProps) {
	const { name, avatar, text, hashtags, photo, likes, views } = props;

	return (
		<View style={styles.post}>
			<View style={styles.top}>
				<View style={styles.userInfo}>
					<Image style={styles.avatar} source={{ uri: avatar }} />
					<Text style={styles.name}>{name}</Text>
				</View>

				<View style={styles.actions}>
					{/* <DotsIcon/> */}
					<View>{/* <WritingIcon></WritingIcon> */}</View>
				</View>
			</View>

			<View style={styles.content}>
				<Text style={styles.text}>{text}</Text>
				<View style={styles.hashtags}>
					{hashtags
						? hashtags.map((tag, i) => (
								<Text key={i} style={styles.hashtag}>
									#{tag}
								</Text>
						  ))
						: undefined}
				</View>

				{photo ? (
					<View style={styles.photoGrid}>
						{photo.map((tag, i) => (
							<Image
								key={i}
								source={{ uri: tag }}
								style={styles.photo}
							/>
						))}
					</View>
				) : undefined}

				<View style={styles.reactions}>
					<TouchableOpacity style={styles.reaction}>
						{/* <ICONS.LikeIcon></ICONS.LikeIcon> */}
						<Text style={styles.reactionText}>👍{likes} Вподобань</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.reaction}>
						{/* <SeenIcon></SeenIcon> */}
						<Text style={styles.reactionText}>👁{views} Переглядів</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
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
		justifyContent: "space-between"
	},

	photo: {
		width: 80,
		height: 80,
		borderRadius: 8,
	},

	reactions: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 8,
	},

	reaction: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},

	reactionText: {
		fontSize: 14,
		color: "#070A1C",
	},
});
