import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { ICONS } from "../ui/icons";

export function Footer() {
	return (
		<View style={styles.footer}>
			<View>
				<TouchableOpacity style={styles.button}>
					<ICONS.HouseIcon/>
					{/* <Text>🏠</Text> */}
					<Text>Головна</Text>
				</TouchableOpacity>
			</View>

			<View>
				<TouchableOpacity style={styles.button}>
				<ICONS.ImageIcon/>
				{/* <Text>🖼</Text> */}
				<Text>Мої публікації</Text>
			</TouchableOpacity>
			</View>

			<View>
				<TouchableOpacity style={styles.button}>
				<ICONS.FriendsIcon/>
				{/* <Text>👨‍👨‍👦</Text> */}
				<Text>Друзі</Text>
			</TouchableOpacity>
			</View>

			<View>
				<TouchableOpacity style={styles.button}>
				<ICONS.ChatIcon/>
				{/* <Text>💬</Text> */}
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
		paddingHorizontal: 16,
		paddingVertical: 8,
	
	},
	button: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between"
	},
});
