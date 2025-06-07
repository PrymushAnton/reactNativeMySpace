import { View, Text, TouchableOpacity } from "react-native";
import { ModalTool } from "../../../../shared/modal";
import { styles } from "./modal-first-login.styles";
import { useEffect } from "react";
import {
	saveFirstLoginFlag,
	checkFirstLoginFlag,
} from "../../utils/firstLoginStorage";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../../shared/ui/input";
import { IUserAdditionalInfo } from "../../types/post";
import { ICONS } from "../../../../shared/ui/icons";
import { useAuthContext } from "../../../auth/context";

interface ModalFirstLoginProps {
	isVisible: boolean;
	setIsVisible: (visible: boolean) => void;
	onRefresh?: () => void;
	userId: number;
}

export function ModalFirstLogin({
	isVisible,
	setIsVisible,
	userId,
	onRefresh,
}: ModalFirstLoginProps) {
	const {
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm<IUserAdditionalInfo>({
		defaultValues: {
			name: "",
			surname: "",
			username: "",
		},
	});

	const { token } = useAuthContext();

	useEffect(() => {
		checkFirstLoginFlag(userId).then((alreadyShown) => {
			if (alreadyShown) setIsVisible(false);
		});
	}, [userId]);

	const onSubmit = async (data: IUserAdditionalInfo) => {
		try {
			const res = await fetch("http://192.168.1.10:3011/user/update", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			});
			if (!res.ok) throw new Error("Не вдалося оновити дані");

			await saveFirstLoginFlag(userId);
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
				<View style={styles.containerMainView}>
					<View>
						<TouchableOpacity onPress={() => setIsVisible(false)}>
							<ICONS.CloseIcon width={15} height={15} />
						</TouchableOpacity>
					</View>
					<View style={{ alignSelf: "center" }}>
						<Text style={styles.titleDetailsMainText}>
							Додай деталі про себе
						</Text>
					</View>
					<View>
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
						<View>
							<Text style={styles.inputLabelText}>
								Ім’я користувача
							</Text>
							<Controller
								control={control}
								name="username"
								render={({ field, fieldState }) => (
									<Input
										placeholder="@"
										value={field.value ?? ""}
										onChange={field.onChange}
										onChangeText={field.onChange}
										errorMessage={fieldState.error?.message}
									/>
								)}
							/>
						</View>

						<Text style={styles.variantsOfNameAndSurnameText}>
							Або оберіть:{" "}
							<Text
								style={{
									color: "#22C55E",
									fontFamily: "GTWalsheimPro-Regular",
									fontSize: 12,
								}}
							>
								(Запропоновані варіанти відповідно до Ім’я та
								Прізвища)
							</Text>
						</Text>
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
