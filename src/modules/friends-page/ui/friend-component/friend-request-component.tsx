import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FriendCard } from "../../types/friend-info";
import { ICONS } from "../../../../shared/ui/icons";
import { styles } from "./friend-request-component.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function FriendRequest({
	id,
	image,
	name,
	surname,
	username,
	onAccept,
	onReject,
}: FriendCard & {
	onAccept: () => void;
	onReject: () => void;
}) {
	return (
		<View style={styles.friendCard}>
			<View style={styles.userInfo}>
				{image ? (
					<Image
						source={{ uri: image }}
						style={{ width: 46, height: 46, borderRadius: 20 }}
					/>
				) : (
					<ICONS.AnonymousLogoIcon width={46} height={46} />
				)}
				<View style={{ marginLeft: 12 }}>
					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontSize: 16,
							fontWeight: "700",
						}}
					>
						{name} {surname}
					</Text>
					<Text style={{ fontSize: 14 }}>@{username}</Text>
				</View>
			</View>

			<View style={{ flexDirection: "row" }}>
				<TouchableOpacity
					style={[styles.button, { backgroundColor: "#543C52" }]}
					onPress={onAccept}
				>
					<ICONS.CheckMarkIcon
						width={17}
						height={17}
						color="#FFFFFF"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.button,
						{
							borderWidth: 1,
							borderColor: "#543C52",
							backgroundColor: "white",
						},
					]}
					onPress={onReject}
				>
					<ICONS.CloseIcon width={15} height={15} color="#543C52" />
				</TouchableOpacity>
			</View>
		</View>
	);
}

export function FriendSendRequest({
	id,
	image,
	name,
	surname,
	username,
}: FriendCard) {
	const sendRequest = async () => {
		const token = await AsyncStorage.getItem("token");
		try {
			const res = await fetch(
				"http://192.168.1.10:3011/friend/send-friend-request",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ toUser: Number(id) }),
				}
			);
			if (res.ok) alert("Request send");
			else alert("Request send error");
		} catch {
			alert("Network error");
		}
	};

	return (
		<View style={styles.friendCard}>
			<View style={styles.userInfo}>
				{image ? (
					<Image
						source={{ uri: image }}
						style={{ width: 46, height: 46, borderRadius: 20 }}
					/>
				) : (
					<ICONS.AnonymousLogoIcon width={46} height={46} />
				)}
				<View style={{ marginLeft: 12 }}>
					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontSize: 16,
							fontWeight: "700",
						}}
					>
						{name} {surname}
					</Text>
					<Text style={{ fontSize: 14 }}>@{username}</Text>
				</View>
			</View>
			<TouchableOpacity
				style={[styles.button, { backgroundColor: "#543C52" }]}
				onPress={sendRequest}
			>
				<ICONS.PaperPlaneIcon width={17} height={17} />
			</TouchableOpacity>
		</View>
	);
}

export function FriendItem({
	id,
	image,
	name,
	surname,
	username,
}: FriendCard) {
	return (
		<View style={styles.friendCard}>
			<View style={styles.userInfo}>
				{image ? (
					<Image
						source={{ uri: image }}
						style={{ width: 46, height: 46, borderRadius: 20 }}
					/>
				) : (
					<ICONS.AnonymousLogoIcon width={46} height={46} />
				)}
				<View style={{ marginLeft: 12 }}>
					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontSize: 16,
							fontWeight: "700",
						}}
					>
						{name} {surname}
					</Text>
					<Text style={{ fontSize: 14 }}>@{username}</Text>
				</View>
			</View>

			<TouchableOpacity
				style={[
					styles.button,
					{
						backgroundColor: "#543C52",
						paddingHorizontal: 12,
						paddingVertical: 6,
						borderRadius: 8,
						justifyContent: "center",
						alignItems: "center",
					},
				]}
			>
				<Text style={{ color: "#fff", fontWeight: "600" }}>Друзі</Text>
			</TouchableOpacity>
		</View>
	);
}

FriendRequest.FriendSendRequest = FriendSendRequest;
FriendRequest.FriendItem = FriendItem;
