import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ICONS } from "../ui/icons";
import { useAuthContext } from "../../modules/auth/context";
import { ModalTool } from "../../shared/modal";
import { useEffect, useState } from "react";
import { useModal } from "../../modules/auth/context";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
interface IHeaderProps {
	isOnSettings: boolean;
}
export function Header(props: IHeaderProps) {
	const { logout } = useAuthContext();
	const { openCreateModal } = useModal();
	const {replace} = useRouter()

	return (
		<View style={styles.header}>
			<TouchableOpacity onPress={() => {replace("/main")}}>
				<ICONS.LogoIcon />
			</TouchableOpacity>
			<View style={styles.icons}>
				<TouchableOpacity onPress={() => {props.isOnSettings ? null : openCreateModal()}} disabled={props.isOnSettings}>
					<ICONS.PlusIcon />
				</TouchableOpacity>

				<TouchableOpacity disabled={props.isOnSettings} onPress={() => {replace("/personal-info")}}>
					{props.isOnSettings ? (
						<ICONS.SettingsIcon fill={"#E9E5EE"} />
					) : (
						<ICONS.SettingsIcon />
					)}
				</TouchableOpacity>

				<TouchableOpacity onPress={logout}>
					<ICONS.LogoutIcon />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		height: 56,
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 8,
		backgroundColor: "#fff",
	},
	icons: {
		justifyContent: "space-between",
		flexDirection: "row",
		gap: 10,
	},
});
