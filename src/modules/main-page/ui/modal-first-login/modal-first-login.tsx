import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { ModalTool } from "../../../../shared/modal";
import { styles } from "./modal-first-login.styles";
import { useEffect, useState } from "react";
import {
	saveFirstLoginFlag,
	checkFirstLoginFlag,
} from "../../utils/firstLoginStorage";

interface ModalFirstLogin {
	isVisible: boolean;
	setIsVisible: (visible: boolean) => void;
	onRefresh?: () => void;
	email: string;
}

export function ModalFirstLogin({
	isVisible,
	setIsVisible,
	email,
	onRefresh,
}: ModalFirstLogin) {
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [username, setUsername] = useState("");

	useEffect(() => {
	checkFirstLoginFlag(email).then((alreadyShown) => {
		if (alreadyShown) setIsVisible(false);
	});
}, [email]);


	const handleSubmit = async () => {
		try {
			const res = await fetch("http://192.168.1.10:3011/user/update", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					data: { name, surname, username },
				}),
			});

			if (!res.ok) throw new Error("Не вдалося оновити дані");

			await saveFirstLoginFlag(email);
			setIsVisible(false);
			onRefresh?.();
		} catch (error) {
			console.log("Помилка при оновленні:", error);
		}
	};

	return (
		<View>
			<ModalTool
				isVisible={isVisible}
				onClose={() => setIsVisible(false)}
				animationIn="fadeIn"
				animationOut="fadeOut"
			>
				<View style={styles.container}>
					<Text style={styles.title}>Додай деталі про себе</Text>

					<View style={styles.inputWrapper}>
						<TextInput
							style={styles.input}
							placeholder="Введіть Ваше ім’я"
							value={name}
							onChangeText={setName}
						/>
					</View>

					<View style={styles.inputWrapper}>
						<TextInput
							style={styles.input}
							placeholder="Введіть Ваше прізвище"
							value={surname}
							onChangeText={setSurname}
						/>
					</View>

					<View style={styles.inputWrapper}>
						<TextInput
							style={styles.input}
							placeholder="@"
							value={username}
							onChangeText={setUsername}
						/>
					</View>

					<Text style={styles.suggestion}>
						Або оберіть:{" "}
						<Text style={{ color: "green" }}>
							(Запропоновані варіанти відповідно до Ім’я та
							Прізвища)
						</Text>
					</Text>

					<TouchableOpacity
						style={styles.button}
						onPress={handleSubmit}
					>
						<Text style={styles.buttonText}>Продовжити</Text>
					</TouchableOpacity>
				</View>
			</ModalTool>
		</View>
	);
}
