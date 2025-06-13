import { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FriendRequest } from "../friend-component/friend-request-component";
import { HeaderNavigationFriendPages } from "../header-navigation-friends-page";
import { FriendCard } from "../../types/friend-info";

export function FriendRecommendationPage() {
	const [users, setUsers] = useState<FriendCard[]>([]);

	const fetchUsers = async () => {
		const token = await AsyncStorage.getItem("token");
		const res = await fetch("http://192.168.1.10:3011/friend/all-users", {
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await res.json();
		setUsers(data.users);
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<HeaderNavigationFriendPages />
			<ScrollView contentContainerStyle={{ alignItems: "center",  }}>
				{users.map((user) => (
					<View key={user.id} style={{ marginBottom: 10, width: "90%", alignItems: "center" }}>
						<FriendRequest.FriendSendRequest {...user} />
					</View>
				))}
			</ScrollView>
		</View>
	);
}