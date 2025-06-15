import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeaderNavigationFriendPages } from "../header-navigation-friends-page";
import { FriendRequestType } from "../../types/friend-info";
import { FriendRequest } from "../friend-component/friend-request-component";

export function FriendRequestPage() {
	const [requests, setRequests] = useState<FriendRequestType[]>([]);

	const loadRequests = async () => {
		const token = await AsyncStorage.getItem("token");
		const res = await fetch(
			"http://192.168.3.11:3011/friend/pending-requests",
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		const json = await res.json();
		const requestsArray = json.requests as FriendRequestType[];
		setRequests(requestsArray.filter((r) => !r.isAccepted));
	};

	useEffect(() => {
		loadRequests();
	}, []);

	const respondRequest = async (id: number, accept: boolean) => {
		const token = await AsyncStorage.getItem("token");
		const url = accept
			? `http://192.168.3.11:3011/friend/accept-request`
			: `http://192.168.3.11:3011/friend/reject-request`;

		await fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ requestId: id }),
		});
		loadRequests();
	};

	return (
		<View style={{ alignItems: "center" }}>
			<HeaderNavigationFriendPages />
			{requests.length === 0 && <Text>Немає вхідних запитів</Text>}
			{requests.map((item) => {
				const user = item.fromUserDetails;
				if (!user) return null;
				return (
					<FriendRequest
						key={item.id.toString()}
						id={user.id}
						image={user.image}
						name={user.name}
						surname={user.surname}
						username={user.username}
						onAccept={() => respondRequest(item.id, true)}
						onReject={() => respondRequest(item.id, false)}
					/>
				);
			})}
		</View>
	);
}
