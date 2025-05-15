import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { IPostProps } from "../../types/types";

import { ICONS } from "../../../../shared/ui/icons";
import { useState } from "react";

export function Post(props: IPostProps) {
	const { name, avatar, text, hashtags, photo, likes, views } = props;

	const [isLiked, setIsLiked] = useState<boolean>(false);

	return (
		<View style={styles.post}>
			<View style={styles.top}>
				<View style={styles.userInfo}>
					<Image style={styles.avatar} source={{ uri: avatar }} />
					<Text style={styles.name}>{name}</Text>
				</View>

				<View style={styles.actions}>
					<ICONS.DotsIcon />
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
					<View style={styles.postActions}>
						<TouchableOpacity
							style={styles.reaction}
							onPress={() => {
								setIsLiked(!isLiked);
							}}
						>
							{isLiked ? (
								<ICONS.PressedLikeIcon />
							) : (
								<ICONS.LikeIcon />
							)}
						</TouchableOpacity>
						<Text style={styles.reactionText}>
							{likes} Вподобань
						</Text>
					</View>

					<View style={styles.postActions}>
						<ICONS.ViewsIcon />
						<Text style={styles.reactionText}>
							{views} Переглядів
						</Text>
					</View>
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
});
