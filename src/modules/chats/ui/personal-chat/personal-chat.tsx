import {
	ScrollView,
	TouchableOpacity,
	View,
	Text,
	Image,
	FlatList,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
} from "react-native";
import { ICONS } from "../../../../shared/ui/icons";
import { styles } from "./personal-chat.styles";
import { MyMessage } from "../my-message/my-message";
import { AnotherUserMessage } from "../another-user-message/another-user-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NewMessages } from "../new-messages/new-messages";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { IMessage, IMessageData } from "../messages/messages.types";
import { HTTPS_HOST } from "../../../../shared/base-url/base-url";
import { useAuthContext } from "../../../auth/context";
import { Input } from "../../../../shared/ui/input";
import { useSocketContext } from "../../context/socket.context";
import { TypeMessage } from "../../../../shared/ui/input/input";
import { Controller, useForm } from "react-hook-form";

export function PersonalChatPage() {
	const params = useLocalSearchParams<{
		chatId: string;
		avatar: string;
		email: string;
		first_name: string;
		last_name: string;
		username: string;
		userId: string;
	}>();
	const { socket } = useSocketContext();
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const { user, token } = useAuthContext();
	const flatListRef = useRef<FlatList<IMessageData>>(null);

	const [messages, setMessages] = useState<IMessageData[] | null>(null);
	const [value, setValue] = useState<string>("");

	async function getMessages() {
		const response = await fetch(
			HTTPS_HOST + `/chat/all-messages/${params.chatId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const result = await response.json();

		if (result.status === "success") {
			setMessages(result.messages);
		} else {
			alert("Помилка при отримані повідомлень");
		}
	}

	// useEffect(() => {
	// 	console.log(params.chatId)
	// }, [params])

	useEffect(() => {
		socket?.on("newMessage", (data) => {
			// console.log(JSON.stringify(data, null, 4));
			setMessages((prevMessages) =>
				prevMessages ? [...prevMessages, data.message] : [data.message]
			);
		});

		socket?.emit("joinChat", { chatId: params.chatId }, () => {
			console.log("joined chat");
		});
		getMessages();
		return () => {
			socket?.emit("leaveChat", { chatId: Number(params.chatId) });
			socket?.off("newMessage");
		};
	}, []);

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={insets.top + 56}
		>
			<View style={styles.container}>
				<View style={styles.header}>
					<View
						style={{
							gap: 24,
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<TouchableOpacity
							onPress={() => {
								router.replace("/messages");
							}}
						>
							<ICONS.ReturnIcon
								width={15}
								height={15}
							></ICONS.ReturnIcon>
						</TouchableOpacity>
						<Image
							source={{
								uri: HTTPS_HOST + "/media/" + params.avatar,
							}}
							style={{
								width: 50,
								height: 50,
								borderRadius: 50,
							}}
						></Image>
						<View>
							<Text
								style={{
									fontWeight: 500,
									fontSize: 24,
								}}
							>
								{params.first_name} {params.last_name}
							</Text>
							<Text
								style={{
									fontSize: 14,
									color: "#81818D",
								}}
							>
								В мережі
							</Text>
						</View>
					</View>

					<TouchableOpacity>
						<ICONS.DotsIcon></ICONS.DotsIcon>
					</TouchableOpacity>
				</View>

				<View
					style={{
						justifyContent: "space-between",
						flex: 1,
					}}
				>
					<FlatList
						ref={flatListRef}
						onContentSizeChange={() =>
							flatListRef.current?.scrollToEnd({ animated: true })
						}
						onLayout={() =>
							flatListRef.current?.scrollToEnd({ animated: true })
						}
						data={messages}
						keyExtractor={(_, index) => index.toString()}
						renderItem={({ item }) => {
							return item.author.user.id === user?.id ? (
								<MyMessage
									text={item.content}
									date={item.sent_at}
									wasWatched={true}
								/>
							) : (
								<AnotherUserMessage
									image={item.author.avatars[0].image}
									name={item.author.user.first_name}
									surname={item.author.user.last_name}
									text={item.content}
									date={item.sent_at}
									wasWatched={true}
								/>
							);
						}}
					/>

					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							gap: 24,
							paddingTop: 16,
						}}
					>
						<TextInput
							placeholder="Повідомлення"
							onChangeText={(text) => {
								setValue(text);
							}}
							style={{
								borderWidth: 1,
								borderColor: "#CDCED2",
								borderRadius: 10,
								flex: 1,
								flexShrink: 1,
								padding: 10,
								paddingLeft: 16,
							}}
							value={value}
						/>

						<TouchableOpacity
							style={{
								borderWidth: 1,
								borderRadius: 50,
								padding: 10,
								borderColor: "#543C52",
							}}
						>
							<ICONS.ImageIcon />
						</TouchableOpacity>

						<TouchableOpacity
							style={{
								borderWidth: 1,
								borderRadius: 50,
								padding: 10,
								borderColor: "#543C52",
								backgroundColor: "#543C52",
							}}
							onPress={() => {
								socket?.emit("sendMessage", {
									message: value,
									chatId: Number(params.chatId),
								});
								setValue("");
								Keyboard.dismiss();
							}}
						>
							<ICONS.PaperPlaneIcon width={21} height={20} />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}
