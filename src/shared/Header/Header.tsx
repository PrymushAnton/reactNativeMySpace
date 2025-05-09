import { View, StyleSheet, TouchableOpacity } from "react-native";
import { LogoutIcon } from "../ui/icons/logout-icon";
import { PlusIcon } from "../ui/icons/plus-icon";
import { SettingsIcon } from "../ui/icons/settings-icon";
import { LogoIcon } from "../ui/icons/logo-icon";

export function Header() {
	return (
		<View style={styles.header}>
			<TouchableOpacity>
				
				{/* <LogoIcon /> */}
			</TouchableOpacity>
			<View style={styles.icons}>
				<TouchableOpacity>
					
					{/* <PlusIcon /> */}
				</TouchableOpacity>
				<TouchableOpacity>
					
					{/* <SettingsIcon /> */}
				</TouchableOpacity>
				<TouchableOpacity>
					
					{/* <LogoutIcon /> */}
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flex: 1,
		justifyContent: "space-between",
	},
	icons: {
		justifyContent: "space-between",
	},
});
