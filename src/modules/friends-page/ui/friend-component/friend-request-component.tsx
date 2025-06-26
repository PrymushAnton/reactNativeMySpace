import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FriendCard, FriendRequestType } from "../../types/friend-info";
import { ICONS } from "../../../../shared/ui/icons";
import { styles } from "./friend-request-component.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HOST, PORT } from "../../../../shared/base-url";
import { HTTPS_HOST } from "../../../../shared/base-url/base-url";
import { ModalStatusMessage } from "../../../../shared/ui/modal-status-message"

export function FriendRequest(
	props: FriendRequestType & {
		onAccept: () => void;
		onReject: () => void;
	}
) {
	// useEffect(() => {
	// 	// console.log("friendrequesttt",props.avatars && props.avatars[0].image)
	// 	console.log(props)
	// }, [props])
	return (
		<View style={styles.friendCard}>
			<View>
				{props.profile1.avatars[0]?.image ? (
					<Image
						source={{ uri: HTTPS_HOST + "/media/" + props.profile1.avatars[0]?.image }}
						style={{ width: 96, height: 96, borderRadius: 50 }}
					/>
				) : (
					<ICONS.AnonymousLogoIcon width={96} height={96} />
				)}
			</View>
			<View
				style={[
					styles.userInfo,
					{ alignItems: "center", paddingTop: 10 },
				]}
			>
				<View style={{ alignItems: "center" }}>
					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontSize: 24,
							fontWeight: "700",
						}}
					>
						{props.profile1.user.first_name} {props.profile1.user.last_name}
					</Text>
					<Text
						style={{
							fontSize: 14,
							paddingTop: 10,
							paddingBottom: 16,
							fontWeight: "500",
						}}
					>
						@{props.profile1.user.username}
					</Text>
				</View>
			</View>

			<View style={{ flexDirection: "row" }}>
				<TouchableOpacity
					style={[styles.button, { backgroundColor: "#543C52" }]}
					onPress={props.onAccept}
				>
					<Text
						style={{
							color: "#FFFFFF",
							fontFamily: "GTWalsheimPro-Regular",
							fontSize: 14,
						}}
					>
						Підтвердити
					</Text>
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
					onPress={props.onReject}
				>
					<Text>Відхилити</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export function FriendSendRequest(
	props: FriendCard & { onRefresh: () => void }
) {

	const [isRequestVisible, setRequestVisible] = useState(false)
	const [isNetworkVisible, setNetworkVisible] = useState(false)

	const sendRequest = async () => {
		const token = await AsyncStorage.getItem("token");
		try {
			const res = await fetch(
				`http://${HOST}/friend/send-friend-request`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ to: Number(props.user.id) }),
				}
			);
			const result = await res.json()
			if (result.status === "success"){
				props.onRefresh()
			}
			else setRequestVisible(true)
		} catch {
			setNetworkVisible(true)
		}
	};

	return (
		<View style={styles.friendCard}>
			<ModalStatusMessage isVisible={isRequestVisible} setIsVisible={setRequestVisible} status="Помилка на сервері!" message="Помилка при надсиланні запиту"/>
			<ModalStatusMessage isVisible={isNetworkVisible} setIsVisible={setNetworkVisible} status="Помилка на сервері!" message="Помилка мережі"/>
			<View>
				{props.avatars[0]?.image ? (
					<Image
						source={{ uri: HTTPS_HOST + "/media/" + props.avatars[0]?.image }}
						style={{ width: 96, height: 96, borderRadius: 50 }}
					/>
				) : (
					<ICONS.AnonymousLogoIcon width={96} height={96} />
				)}
			</View>
			<View
				style={[
					styles.userInfo,
					{ alignItems: "center", paddingTop: 10 },
				]}
			>
				<View style={{ alignItems: "center" }}>
					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontSize: 24,
							fontWeight: "700",
						}}
					>
						{props.user.first_name} {props.user.last_name}
					</Text>
					<Text
						style={{
							fontSize: 14,
							paddingTop: 10,
							paddingBottom: 16,
							fontWeight: "500",
						}}
					>
						@{props.user.username}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<TouchableOpacity
					style={[styles.button, { backgroundColor: "#543C52" }]}
					onPress={sendRequest}
				>
					<Text
						style={{
							color: "white",
							fontFamily: "GTWalsheimPro-Regular",
							fontSize: 14,
						}}
					>
						Додати
					</Text>
				</TouchableOpacity>
				{/* <TouchableOpacity
					style={[
						styles.button,
						{
							borderWidth: 1,
							borderColor: "#543C52",
							backgroundColor: "white",
						},
					]}
					onPress={props.onReject}
				>
					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontSize: 14,
						}}
					>
						Видалити
					</Text>
				</TouchableOpacity> */}
			</View>
		</View>
	);
}

export function FriendItem(props: FriendCard & {onRefresh: () => void}) {

	const [isErrorVisible, setErrorVisible] = useState(false)
	const [isErrorDeleteFriendVisible, setErrorDeleteFriendVisible] = useState(false)

	const handleDelete = async () => {
		try {
			const token = await AsyncStorage.getItem("token");
			if (!token) return;

			const res = await fetch(
				`http://${HOST}/friend/delete-friend`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ friendId: props.user.id }),
				}
			);

			const data = await res.json();

			if (data.status === "success") {
				// alert("Успіх! Друг видалений");
				props.onRefresh()
			} else {
				setErrorVisible(true)
			}
		} catch (e) {
			console.error("Error deleting friend", e);
			setErrorDeleteFriendVisible(true)
		}
	};

	return (
		<View style={styles.friendCard}>
			<ModalStatusMessage isVisible={isErrorVisible} setIsVisible={setErrorVisible} status="Помилка!" message="Щось пішло не так"/>
			<ModalStatusMessage isVisible={isErrorDeleteFriendVisible} setIsVisible={setErrorDeleteFriendVisible} status="Помилка!" message="Не вдалося видалити друга"/>
			<View>
				{props.avatars[0]?.image ? (
					<Image
						source={{ uri: HTTPS_HOST + "/media/" + props.avatars[0]?.image }}
						style={{ width: 96, height: 96, borderRadius: 50 }}
					/>
				) : (
					<ICONS.AnonymousLogoIcon width={96} height={96} />
				)}
			</View>
			<View
				style={[
					styles.userInfo,
					{ alignItems: "center", paddingTop: 10 },
				]}
			>
				<View style={{ alignItems: "center" }}>
					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontSize: 24,
							fontWeight: "700",
						}}
					>
						{props.user.first_name} {props.user.last_name}
					</Text>
					<Text
						style={{
							fontSize: 14,
							paddingTop: 10,
							paddingBottom: 16,
							fontWeight: "500",
						}}
					>
						@{props.user.username}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<TouchableOpacity
					style={[
						styles.button,
						{
							backgroundColor: "#543C52",
							padding: 10,
							borderRadius: 50,
							justifyContent: "center",
							alignItems: "center",
						},
					]}
				>
					<Text style={{ color: "#fff", fontWeight: "600" }}>
						Повідомлення
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={handleDelete}
					style={[
						styles.button,
						{
							borderWidth: 1,
							borderColor: "#543C52",
							backgroundColor: "white",
						},
					]}
				>
					<Text>Видалити</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

FriendRequest.FriendSendRequest = FriendSendRequest;
FriendRequest.FriendItem = FriendItem;
