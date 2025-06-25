import {
	Modal,
	TouchableOpacity,
	View,
	Text,
	FlatList,
	Image,
} from "react-native";
import { IContactCard } from "../../../../types/chat-info";
import { useState } from "react";
import { styles } from "./new-group-modal-two.styles";
import { ICONS } from "../../../../../../shared/ui/icons";
import { Card } from "../../../card/card";
import { FriendCard } from "../../../../../friends-page/types/friend-info";
import { pickImage } from "../../../../../../shared/tools";

export function NewGroupModalTwo({
	visible,
	onClose,
	onBack,
	setSelectedFriends,
	selectedFriends,
	setTotalSelected,
	totalSelected,
}: {
	visible: boolean;
	onClose: () => void;
	onBack: () => void;
	setSelectedFriends: (value: FriendCard[]) => void;
	selectedFriends: FriendCard[];
	setTotalSelected: (value: number) => void;
	totalSelected: number;
}) {
	const [avatar, setAvatar] = useState<string>("");

	function pickImageHandler() {
		async function pickImageAsync() {
			try {
				const image = await pickImage({
					allowsMultipleSelection: false,
					base64: true,
				});
				if (!image) return;
				if (!image[0].base64) return;
				const mimeType =
					image[0].mimeType ||
					(image[0].uri?.endsWith(".png")
						? "image/png"
						: "image/jpeg");
				const base64WithPrefix = `data:${mimeType};base64,${image[0].base64}`;

				setAvatar(base64WithPrefix);
			} catch (error) {
				console.log((error as Error).message);
			}
		}
		pickImageAsync();
	}

	return (
		<Modal visible={visible} transparent={true} animationType="slide">
			<View style={styles.main}>
				<View style={styles.container}>
					<TouchableOpacity
						onPress={onClose}
						style={{ alignSelf: "flex-end" }}
					>
						<ICONS.CloseIcon width={20} height={20} />
					</TouchableOpacity>
					<Text style={styles.topText}>Нова група</Text>
					<View style={{ gap: 6 }}>
						<Text>Назва</Text>
						<View style={styles.input}>
							<Text style={{ color: "#81818D", fontSize: 16 }}>
								Введіть назву
							</Text>
						</View>
					</View>

					<View style={{ gap: 12, alignItems: "center" }}>
						{avatar === "" ? (
							<ICONS.ChatDefaultLogoIcon />
						) : (
							<Image
								style={{
									width: 75,
									height: 75,
									borderRadius: 50,
									alignSelf: "center",
								}}
								source={{
									uri: avatar,
								}}
							/>
						)}
						<View style={{ flexDirection: "row", gap: 24 }}>
							<TouchableOpacity
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 8,
								}}
								onPress={() => {
									pickImageHandler();
								}}
							>
								<ICONS.PlusWithoutBorder
									width={15}
									height={15}
								></ICONS.PlusWithoutBorder>
								<Text style={styles.text}>Додайте фото</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 8,
								}}
								onPress={() => {
									setAvatar("")
								}}
							>
								<ICONS.TrashCanIcon
									width={15}
									height={15}
								></ICONS.TrashCanIcon>
								<Text style={styles.text}>Видалити фото</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.participants}>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Text>Учасники</Text>
							<TouchableOpacity
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 8,
								}}
							>
								<ICONS.PlusWithoutBorder
									width={15}
									height={15}
								></ICONS.PlusWithoutBorder>
								<Text>Додайте учасника</Text>
							</TouchableOpacity>
						</View>
						
						
						<FlatList
							overScrollMode="never"
							data={selectedFriends}
							keyExtractor={(_, index) => index.toString()}
							renderItem={({ item }) => (
								<Card.GroupDelete
									friend={item}
									totalSelected={totalSelected}
									setTotalSelected={setTotalSelected}
									selectedFriends={selectedFriends}
									setSelectedFriends={setSelectedFriends}
								/>
							)}
						/>
					</View>
					<View style={styles.bottom}>
						<TouchableOpacity style={styles.butt1} onPress={onBack}>
							<Text style={{ color: "#543C52", fontWeight: 400 }}>
								Назад
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.butt2}>
							<Text style={{ color: "#FFFFFF" }}>
								Створити групу
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}
