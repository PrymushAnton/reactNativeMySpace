import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { IPostProps } from "../../types/post-info";
import { styles } from "./post.styles";
import { ICONS } from "../../../../shared/ui/icons";
import { useRef, useState } from "react";
import { ModalTool } from "../../../../shared/modal";
import { useModal } from "../../../../modules/auth/context";
import { usePost } from "../../hooks/usePost";
import { IUserPost } from "../../types/post";
import { useWindowDimensions } from "react-native";

export function PublicatedPost(props: IPostProps) {
	const { id, name, avatar, text, hashtags, photo, likes, views } = props;

	const [isLiked, setIsLiked] = useState<boolean>(false);

	const { isVisible, closeModal } = useModal();
	const { openModal } = useModal();
	const [isSettingsVisible, setSettingsVisible] = useState(false);

	const { width: screenWidth } = useWindowDimensions();

	const GAP = 4;
	const PADDING = 24;

	function getPhotosPerRow(totalPhotos: number): number[] {
		switch (totalPhotos) {
			case 1:
				return [1];
			case 2:
				return [2];
			case 3:
				return [3];
			case 4:
				return [2, 2];
			case 5:
				return [2, 3];
			case 6:
				return [3, 3];
			case 7:
				return [3, 3, 1];
			case 8:
				return [4, 4];
			case 9:
				return [3, 3, 3];
			default:
				return [3]; // на всякий
		}
	}

	const {
		createPost,
		updatePost,
		deletePost,
		getAllPosts,
		getPostsByUserId,
		getAllTags,
	} = usePost();

	const [modalPosition, setModalPosition] = useState<{
		top: number;
		left: number;
	} | null>(null);
	const dotsRef = useRef<View>(null);

	let photoIndex = 0;
	const rows = photo ? getPhotosPerRow(photo.length) : [];

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
				animationIn="fadeIn"
				animationOut="fadeOut"
			>
				<View style={styles.mainSmallModalPostSettings}>
					<View style={styles.headerRow}>
						<TouchableOpacity
							style={styles.threeDotsSmallModal}
							onPress={() => setSettingsVisible(false)}
						>
							<ICONS.DotsIcon />
						</TouchableOpacity>
					</View>

					<TouchableOpacity style={styles.mainEditPostButton}>
						<ICONS.PencilIcon width={15} height={15} />
						<Text style={styles.actionText}>Редагувати допис</Text>
					</TouchableOpacity>

					<View style={styles.separator} />

					<TouchableOpacity
						style={styles.mainDeletePostButton}
						onPress={async () => {
							if (props.id !== undefined) {
								await deletePost(props.id);
								props.onRefresh?.(); // ?.() - если onRefresh, и он не undefined, то она будет вызвана
								setSettingsVisible(false);
							}
						}}
					>
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
					<View style={{ gap: GAP }}>
						{rows.map((countInRow, rowIdx) => {
							const photosInRow = photo.slice(
								photoIndex,
								photoIndex + countInRow
							);
							photoIndex += countInRow;

							return (
								<View
									key={rowIdx}
									style={{
										flexDirection: "row",
										gap: GAP,
										justifyContent: "flex-start",
									}}
								>
									{photosInRow.map((url, i) => {
										const totalGap = GAP * (countInRow - 1);
										const width =
											(screenWidth - PADDING - totalGap) /
											countInRow;
										const aspectRatio = 167.5 / 203; // расчитываем размер исходя из размера экрана

										return (
											<Image
												key={i}
												source={{
													uri:
														"data:image/jpeg;base64," +
														url,
												}}
												style={{
													width,
													aspectRatio,
													borderRadius: 8,
												}}
												resizeMode="cover"
											/>
										);
									})}
								</View>
							);
						})}
					</View>
				) : null}

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
