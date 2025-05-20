import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { IPostProps } from "../../types/post-info";
import { styles } from "./post.styles";
import { ICONS } from "../../../../shared/ui/icons";
import { useRef, useState } from "react";
import { ModalTool } from "../../../../shared/modal";
import { useModal } from "../../../../modules/auth/context";

export function PublicatedPost(props: IPostProps) {
	const { name, avatar, text, hashtags, photo, likes, views } = props;

	const [isLiked, setIsLiked] = useState<boolean>(false);

	const { isVisible, closeModal } = useModal();
	const { openModal } = useModal();
	const [isSettingsVisible, setSettingsVisible] = useState(false);

	const [modalPosition, setModalPosition] = useState<{
		top: number;
		left: number;
	} | null>(null);
	const dotsRef = useRef<View>(null);

	return (
		<View style={styles.post}>
			<View style={styles.top}>
				<View style={styles.userInfo}>
					<Image style={styles.avatar} source={{ uri: avatar }} />
					<Text style={styles.name}>{name}</Text>
				</View>
				<TouchableOpacity
					ref={dotsRef}
					onPress={() => {
						dotsRef.current?.measureInWindow((x, y) => {
							setModalPosition({
								top: y - 20,
								left: x - 330 + 20,
							}); 
							setSettingsVisible(true);
						});
					}}
				>
					<View style={styles.actions}>
						<ICONS.DotsIcon />
					</View>
				</TouchableOpacity>
			</View>
			<ModalTool
				isVisible={isSettingsVisible}
				onClose={() => setSettingsVisible(false)}
				position={modalPosition ?? undefined}
			>
				<View style={styles.mainSmallModalPostSettings}>
					<View style={styles.headerRow}>
						<View style={styles.threeDotsSmallModal}>
							<ICONS.DotsIcon />
						</View>
					</View>

					<TouchableOpacity style={styles.mainEditPostButton}>
						<ICONS.PencilIcon width={15} height={15} />
						<Text style={styles.actionText}>Редагувати допис</Text>
					</TouchableOpacity>

					<View style={styles.separator} />

					<TouchableOpacity style={styles.mainDeletePostButton}>
						<ICONS.TrashCanIcon
							width={15}
							height={15}
							color={"#543C52"}
						/>
						<Text style={styles.actionText}>
							Видалити публікацію
						</Text>
					</TouchableOpacity>
				</View>
			</ModalTool>

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
