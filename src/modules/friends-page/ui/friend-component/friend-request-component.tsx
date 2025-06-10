import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FriendCard } from "../../types/friend-info";
import { ICONS } from "../../../../shared/ui/icons";
import { styles } from "./friend-request-component.styles";

export function FriendRequest(friend: FriendCard) {
	return (
		<View>
			<View style={styles.friendCard}>
				<View style={styles.userInfo}>
					{friend.image ? (
						<Image
							source={{ uri: friend.image }}
							style={{
								width: 46,
								height: 46,
								borderRadius: 20,
							}}
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
							{friend.name} {friend.surname}
						</Text>
						<Text style={{ fontSize: 14 }}>@{friend.username}</Text>
					</View>
				</View>

				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity
						style={[styles.button, { backgroundColor: "#543C52" }]}
					>
						<ICONS.CheckMarkIcon
							width={17}
							height={17}
							color={"#FFFFFF"}
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
					>
						<ICONS.CloseIcon
							width={15}
							height={15}
							color={"#543C52"}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

export function FriendSendRequest(friend: FriendCard) {
	return (
		<View style={styles.friendCard}>
			<View style={styles.userInfo}>
				{friend.image ? (
					<Image
						source={{ uri: friend.image }}
						style={{
							width: 46,
							height: 46,
							borderRadius: 20,
						}}
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
						{friend.name} {friend.surname}
					</Text>
					<Text style={{ fontSize: 14 }}>@{friend.username}</Text>
				</View>
			</View>
			<TouchableOpacity
				style={[styles.button, { backgroundColor: "#543C52" }]}
			>
				<ICONS.PaperPlaneIcon width={17} height={17} />
			</TouchableOpacity>
		</View>
	);
}

FriendRequest.FriendSendRequest = FriendSendRequest;
