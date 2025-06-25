import { Tabs } from "expo-router";
import { Header } from "../../shared/ui/header/header";
import { ICONS } from "../../shared/ui/icons";
import { TouchableOpacity, View } from "react-native";
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useEffect } from "react";

export default function TabsLayout() {
	const insets = useSafeAreaInsets();
	
	return (
		<Tabs
			initialRouteName="main"
			screenOptions={{
				tabBarLabelStyle: {
					fontSize: 12,
					color: "#070A1C",
				},
				tabBarStyle: {
					// minHeight: 60,
					// maxHeight: 80,
					// height: insets.top,
				},
				tabBarActiveTintColor: "black",
			}}
		>

			<Tabs.Screen
				name="main"
				options={{
					tabBarLabel: "Головна",
					tabBarIcon: () => <ICONS.HouseIcon />,
					header: () => <Header page="posts" />,
				}}
			/>

			<Tabs.Screen
				name="my-posts"
				options={{
					tabBarLabel: "Мої пости",
					tabBarIcon: () => <ICONS.ImageIcon />,
					header: () => <Header page="posts" />,
				}}
			/>

			<Tabs.Screen
				name="friends"
				options={{
					tabBarLabel: "Друзі",
					tabBarIcon: () => <ICONS.FriendsIcon />,
					header: () => <Header page="friends" />,
				}}
			/>

			<Tabs.Screen
				name="chats"
				options={{
					tabBarLabel: "Чати",
					tabBarIcon: () => <ICONS.ChatIcon />,
					header: () => <Header page="chats" />,
				}}
			/>

			<Tabs.Screen
				name="(settings)"
				options={{
					tabBarIcon: () => <ICONS.ChatIcon />,
					href: null,
					header: () => <Header page="settings" />,
				}}
			/>

			<Tabs.Screen
				name="(friends)"
				options={{
					tabBarIcon: () => <ICONS.ChatIcon />,
					href: null,
					header: () => <Header page="friends" />,
				}}
			/>

			<Tabs.Screen
				name="(chats)"
				options={{
					tabBarIcon: () => <ICONS.ChatIcon />,
					href: null,
					header: () => <Header page="chats" />,
				}}
			/>

			<Tabs.Screen
				name="(user-profile)"
				options={{
					tabBarIcon: () => <ICONS.HouseIcon />,
					href: null,
					header: () => <Header page="profile" />,
				}}
			/>
		</Tabs>
	);
}
