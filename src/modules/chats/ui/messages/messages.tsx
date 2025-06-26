import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { ICONS } from "../../../../shared/ui/icons";
import { styles } from "./messages.styles";
import { Card } from "../card/card";
import { IContactCard } from "../../types/chat-info";
import { useEffect, useState } from "react";
import { IMessage } from "./messages.types";
import { HTTPS_HOST } from "../../../../shared/base-url/base-url";
import { useAuthContext } from "../../../auth/context";
import { ModalStatusMessage } from "../../../../shared/ui/modal-status-message"

export function MessagesPage() {
	const { token } = useAuthContext();

	const [messages, setMessages] = useState<IMessage[] | null>(null);

	const [isErrorMessagesVisible, setErrorMessagesVisible] = useState(false)

	async function getMessages() {
		const response = await fetch(HTTPS_HOST + "/chat/personal-chats", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const result = await response.json()

		if (result.status === "success") {
			setMessages(result.chats)
		} else {
			setErrorMessagesVisible(true)
		}
	}

	useEffect(() => {
		getMessages()
	}, [])

	return (
		<View style={styles.container}>
			<ModalStatusMessage isVisible={isErrorMessagesVisible} setIsVisible={setErrorMessagesVisible} status="Помилка!" message="Помилка завантаження чатів"/>
			<FlatList
				data={messages}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => <Card.Message {...item} />}
				ListHeaderComponent={
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							// justifyContent: "space-between",
						}}
					>
						<View style={styles.messagesTop}>
							<ICONS.ChatIcon width={20} height={20} />
							<Text
								style={{
									color: "#81818D",
									fontSize: 20,
									fontWeight: 500,
								}}
							>
								Повідомлення
							</Text>
						</View>
					</View>
				}
				// contentContainerStyle={{ paddingBottom: 80 }}
			/>
		</View>
	);
}
