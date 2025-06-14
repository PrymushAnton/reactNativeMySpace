import { View, Text, TouchableOpacity } from "react-native";
import { ICONS } from "../../../../shared/ui/icons";
import { styles } from "./chats-page-header.styles";
import { navigate } from "expo-router/build/global-state/routing";

export function ChatsPageHeader() {
	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				paddingHorizontal: 16,
				backgroundColor: "#FFFFFF",
			}}
		>
			<TouchableOpacity
				style={styles.container}
				onPress={() => {
					navigate("/contacts");
				}}
			>
				<ICONS.FriendsIcon width={20} height={20}></ICONS.FriendsIcon>
				<Text style={styles.text}>Контакти</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.container}
				onPress={() => {
					navigate("/messages");
				}}
			>
				<ICONS.ChatIcon width={20} height={20}></ICONS.ChatIcon>
				<Text style={styles.text}>Повідомлення</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.container}
				onPress={() => {
					navigate("/group-chats");
				}}
			>
				<ICONS.ChatIcon width={20} height={20}></ICONS.ChatIcon>
				<Text style={styles.text}>Групові чати</Text>
			</TouchableOpacity>
		</View>
	);
}
