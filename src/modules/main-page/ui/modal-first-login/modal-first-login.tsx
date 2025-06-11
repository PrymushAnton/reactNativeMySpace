import { View, Text, TouchableOpacity } from "react-native";
import { ModalTool } from "../../../../shared/modal";
import { styles } from "./modal-first-login.styles";
import { useEffect } from "react";
// import {
// 	saveFirstLoginFlag,
// 	checkFirstLoginFlag,
// } from "../../utils/firstLoginStorage";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../../shared/ui/input";
import { IUserAdditionalInfo } from "../../types/post";
import { ICONS } from "../../../../shared/ui/icons";
import { useAuthContext } from "../../../auth/context";
import { Response } from "../../../../shared/types";

interface ModalFirstLoginProps {
	isVisible: boolean;
	// setIsVisible: (visible: boolean) => void;
	onRefresh?: () => void;
	setJustRegistered: (value: boolean) => void;
	// userId: number;
}

export function ModalFirstLogin({
	isVisible,
	// setIsVisible,
	// userId,
	onRefresh,
	setJustRegistered,
}: ModalFirstLoginProps) {
	const {
		handleSubmit,
		control,
		formState,
		setValue,
	} = useForm<IUserAdditionalInfo>({
		defaultValues: {
			name: "",
			surname: "",
			username: "",
		},
	});

	const { token, getData } = useAuthContext();

	// useEffect(() => {
	// 	checkFirstLoginFlag(userId).then((alreadyShown) => {
	// 		if (alreadyShown) setIsVisible(false);
	// 	});
	// }, [userId]);

	function onSubmit(data: IUserAdditionalInfo) {
		async function sendRequest() {
			try {
				if (!token) return
				const res = await fetch(
					"http://192.168.1.10:3011/user/update",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify(data),
					}
				);
				const result: Response<string> = await res.json();
				console.log(result)
				if (result.status === "error") return
				// throw new Error("Не вдалося оновити дані");
				// await saveFirstLoginFlag(userId);
				// setIsVisible(false);
				setJustRegistered(false);
				getData(token)
				onRefresh?.();
			} catch (error) {
				console.log("Помилка при оновленні:", (error as Error).message);
			}
		}
		sendRequest()
	}

	return (
		<View>
			<ModalTool
				isVisible={isVisible}
				onClose={() => {
					// setIsVisible(false)
					setJustRegistered(false);
				}}
				animationIn="fadeIn"
				animationOut="fadeOut"
			>
				<View style={styles.containerMainView}>
					<View style={{ alignSelf: "flex-end" }}>
						<TouchableOpacity
							onPress={() => {
								// setIsVisible(false)
								setJustRegistered(false);
							}}
						>
							<ICONS.CloseIcon width={15} height={15} />
						</TouchableOpacity>
					</View>
					<View style={{ alignSelf: "center" }}>
						<Text style={styles.titleDetailsMainText}>
							Додай деталі про себе
						</Text>
					</View>
					<View style={{ width: "100%" }}>
						<View style={{ paddingBottom: 16, paddingTop: 24 }}>
							<Text style={styles.inputLabelText}>Ім’я</Text>
							<Controller
								control={control}
								name="name"
								render={({ field, fieldState }) => (
									<Input
										placeholder="Введіть Ваше ім’я"
										value={field.value ?? ""}
										onChange={field.onChange}
										onChangeText={field.onChange}
										errorMessage={fieldState.error?.message}
									/>
								)}
							/>
						</View>
						<View style={{ paddingBottom: 16 }}>
							<Text style={styles.inputLabelText}>Прізвище</Text>
							<Controller
								control={control}
								name="surname"
								render={({ field, fieldState }) => (
									<Input
										placeholder="Введіть Ваше прізвище"
										value={field.value ?? ""}
										onChange={field.onChange}
										onChangeText={field.onChange}
										errorMessage={fieldState.error?.message}
									/>
								)}
							/>
						</View>
						<View style={{ paddingBottom: 16 }}>
							<Text style={styles.inputLabelText}>
								Нікнейм користувача
							</Text>
							<Controller
								control={control}
								name="username"
								render={({ field, fieldState }) => (
									<Input
										placeholder="Введіть Ваш нікнейм"
										value={field.value ?? ""}
										onChange={field.onChange}
										onChangeText={field.onChange}
										errorMessage={fieldState.error?.message}
									/>
								)}
							/>
						</View>
					</View>
					<TouchableOpacity
						style={styles.buttonNext}
						onPress={handleSubmit(onSubmit)}
					>
						<Text style={styles.buttonNextText}>Продовжити</Text>
					</TouchableOpacity>
				</View>
			</ModalTool>
		</View>
	);
}
