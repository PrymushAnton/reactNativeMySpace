import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { ChatsIcon } from "../ui/icons/chats-icon";
import { FriendsIcon } from "../ui/icons/friends-icon";
import { MainPageIcon } from "../ui/icons/main-page-icon";
import { MyPublIcon } from "../ui/icons/my-publ-icon";

export function Footer() {
	return (
		<View style={styles.footer}>
			<View>
				<TouchableOpacity style={styles.button}>
					{/* <MainPageIcon/> */}
					<Text>🏠</Text>
					<Text>Головна</Text>
				</TouchableOpacity>
			</View>

			<View>
				<TouchableOpacity style={styles.button}>
				{/* <MyPublIcon></MyPublIcon> */}
				<Text>🖼</Text>
				<Text>Мої публікації</Text>
			</TouchableOpacity>
			</View>

			<View>
				<TouchableOpacity style={styles.button}>
				{/* <FriendsIcon></FriendsIcon> */}
				<Text>👨‍👨‍👦</Text>
				<Text>Друзі</Text>
			</TouchableOpacity>
			</View>

			<View>
				<TouchableOpacity style={styles.button}>
				{/* <ChatsIcon></ChatsIcon> */}
				<Text>💬</Text>
				<Text>Чати</Text>
			</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	footer: {
		position: "relative", 
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10
	},
	button: {
		flex: 1,
		alignItems: "center",
	},
});
