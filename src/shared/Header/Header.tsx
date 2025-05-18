import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { ICONS } from "../ui/icons";
import { useAuthContext } from "../../modules/auth/context";
import { ModalTool } from "../../shared/modal";
import { useState } from "react";
import { useModal } from "../../modules/auth/context"

export function Header() {
	const {logout} = useAuthContext()
	const [visible, setVisible] = useState(false);
	const { openModal } = useModal();

	return (
		<Animated.View style={styles.header}>
			<TouchableOpacity>
				<ICONS.LogoIcon />
			</TouchableOpacity>
			<View style={styles.icons}>

				<TouchableOpacity onPress={openModal}>
					<ICONS.PlusIcon />
				</TouchableOpacity>

				<TouchableOpacity>
					<ICONS.SettingsIcon />
				</TouchableOpacity>
				
				<TouchableOpacity onPress={logout}>
					<ICONS.LogoutIcon />
				</TouchableOpacity>

			</View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	header: {
		flex: 1,
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 8
	},
	icons: {
		justifyContent: "space-between",
		flexDirection: "row",
		gap: 10
	},
});
