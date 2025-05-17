import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { IPostProps } from "../../types/types";
import { styles } from "./post.styles";
import { ICONS } from "../../../../shared/ui/icons";
import { useState } from "react";
import { ModalTool } from "../../../../shared/modal";
import { useModal } from "../../../../modules/auth/context";

export function PublicatedPost(props: IPostProps) {
	const { name, avatar, text, hashtags, photo, likes, views } = props;

	const [isLiked, setIsLiked] = useState<boolean>(false);

	const { isVisible, closeModal } = useModal();
	const { openModal } = useModal();

	return (
		<View style={styles.post}>
			<View style={styles.top}>
				<View style={styles.userInfo}>
					<Image style={styles.avatar} source={{ uri: avatar }} />
					<Text style={styles.name}>{name}</Text>
				</View>
				<TouchableOpacity>
					<View style={styles.actions}>
						<ICONS.DotsIcon />
					</View>
				</TouchableOpacity>
			</View>
			{/* <ModalTool isVisible={isVisible} onClose={() => closeModal()}>
				<View style={styles.mainSmallModalPostSettings}>
					<View style={styles.threeDotsSmallModal}>
						<ICONS.DotsIcon />
					</View>
					<View style={styles.mainEditPostButton}>
						<ICONS.PencilIcon width={15} height={15}/>
						<Text style={{fontSize: 16, fontFamily: "GTWalsheimPro-Regular"}}>Редагувати альбом</Text>
					</View>
					<View style={{flex: 1, height: 1, backgroundColor: '#CDCED2'}} />
					
					<View style={styles.mainDeletePostButton}>
						<ICONS.TrashCanIcon width={15} height={15}/>
						<Text style={{fontSize: 16, fontFamily: "GTWalsheimPro-Regular"}}>Редагувати альбом</Text>
					</View>
				</View>
			</ModalTool> */}
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

