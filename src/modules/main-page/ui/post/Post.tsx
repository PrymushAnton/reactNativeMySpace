import { View, Text, Image, TouchableOpacity } from "react-native";
import { IPostProps } from "../../types/post-info";
import { styles } from "./post.styles";
import { ICONS } from "../../../../shared/ui/icons";
import { useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "react-native";
import { ModalThreeDots } from "../modal-three-dots/modal-three-dots";
import { useAuthContext } from "../../../auth/context";
import { useRouter } from "expo-router";
import { HOST, PORT } from "../../../../shared/base-url";

export function PublicatedPost(props: IPostProps) {
	const {
		id,
		name,
		text,
		hashtags,
		photo,
		likes,
		views,
		link,
		user: postUser,
	} = props;

	const router = useRouter();

	const [isLiked, setIsLiked] = useState<boolean>(false);

	const [isSettingsVisible, setSettingsVisible] = useState(false);

	const [isFriend, setIsFriend] = useState(false);

	const { user: currentUser } = useAuthContext();

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

	const [modalPosition, setModalPosition] = useState<{
		top: number;
		left: number;
	} | null>(null);
	const dotsRef = useRef<View>(null);

	let photoIndex = 0;
	const rows = photo ? getPhotosPerRow(photo.length) : [];

	const handleProfilePress = async () => {
		if (!postUser?.id || !currentUser?.id) return;

		if (postUser.id === currentUser.id) {
			router.replace("/user-profile");
		} else {
			try {
				const res = await fetch(
					`http://${HOST}:${PORT}/friend/check/${currentUser.id}/${postUser.id}`
				);
				const data = await res.json();
				if (data.isFriend) {
					router.replace("/friend-profile");
				} else {
					router.replace("/another-user-profile");
				}
			} catch (err) {
				console.error("Ошибка при проверке дружбы", err);
				router.push("/another-user-profile");
			}
		}
	};

	// useEffect(() => {
	// 	if (!user?.id || !props.user?.id) return;
	// 	if (user.id === props.user.id) return;

	// 	const checkFriendStatus = async () => {
	// 		try {
	// 			const res = await fetch(
	// 				`http://${HOST}:${PORT}/friends/check/${user.id}/${props.user.id}`
	// 			);
	// 			const data = await res.json();
	// 			setIsFriend(data.isFriend);
	// 		} catch (err) {
	// 			console.error("Ошибка при проверке дружбы", err);
	// 		}
	// 	};

	// 	checkFriendStatus();
	// }, [user?.id, props.user?.id]);

	return (
		<View>
			<ModalThreeDots
				{...props}
				isVisible={isSettingsVisible}
				setIsVisible={setSettingsVisible}
				modalPosition={modalPosition}
			/>
			<View style={styles.post}>
				<View style={styles.top}>
					<TouchableOpacity
						style={styles.userInfo}
						onPress={handleProfilePress}
					>
						{props.user?.image ? (
							<Image
								style={styles.avatar}
								source={{
									uri:
										"data:image/jpeg;base64," +
										props.user.image,
								}}
							/>
						) : (
							<ICONS.AnonymousLogoIcon width={36} height={36} />
						)}

						<Text style={styles.name}>
							{props.user?.username ??
								props.user?.email?.split("@")[0] ??
								"Анонім"}
						</Text>
					</TouchableOpacity>
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

				<View style={styles.content}>
					<Text style={styles.name}>{name}</Text>
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

					{/* Блок ссылок */}
					{props.link && props.link.length > 0 && (
						<View
							style={{
								flexDirection: "row",
								flexWrap: "wrap",
								gap: 8,
								marginTop: 12,
							}}
						>
							{props.link.map((url, index) => (
								<TouchableOpacity
									key={index}
									onPress={() => {
										// Открываем ссылку
										// Лучше использовать Linking API от React Native
										import("react-native").then(
											({ Linking }) =>
												Linking.openURL(url)
										);
									}}
									style={{
										paddingVertical: 6,
										paddingHorizontal: 12,
										borderRadius: 12,
										borderWidth: 1,
										borderColor: "#543C52",
										backgroundColor: "white",
									}}
								>
									<Text
										style={{
											color: "#543C52",
											fontSize: 14,
										}}
										numberOfLines={1}
									>
										{url.length > 30
											? url.slice(0, 30) + "..."
											: url}
									</Text>
								</TouchableOpacity>
							))}
						</View>
					)}

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
											const totalGap =
												GAP * (countInRow - 1);
											const width =
												(screenWidth -
													PADDING -
													totalGap) /
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
		</View>
	);
}
