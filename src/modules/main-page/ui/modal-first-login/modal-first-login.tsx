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

interface ModalFirstLoginProps {
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
}: ModalFirstLoginProps) {
	const {
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm<IUserAdditionalInfo>({
		defaultValues: {
			email: email,
			name: "",
			surname: "",
			username: "",
		},
	});

	useEffect(() => {
		checkFirstLoginFlag(email).then((alreadyShown) => {
			if (alreadyShown) setIsVisible(false);
		});
	}, [email]);

	const onSubmit = async (data: IUserAdditionalInfo) => {
		try {
			const res = await fetch("http://192.168.1.10:3011/user/update", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					data,
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
				<View style={styles.containerMainView}>
					<View style={{alignSelf: "center"}}>
						<Text style={styles.titleDetailsMainText}>
							Додай деталі про себе
						</Text>
					</View>
                    
					<Controller
						control={control}
						name="name"
						render={({ field, fieldState }) => (
							<Input
								label="Ім’я"
								placeholder="Введіть Ваше ім’я"
								value={field.value ?? ""}
								onChange={field.onChange}
								onChangeText={field.onChange}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>
                    
					<Controller
						control={control}
						name="surname"
						render={({ field, fieldState }) => (
							<Input
								label="Прізвище"
								placeholder="Введіть Ваше прізвище"
								value={field.value ?? ""}
								onChange={field.onChange}
								onChangeText={field.onChange}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="username"
						render={({ field, fieldState }) => (
							<Input
								label="Ім’я користувача"
								placeholder="@"
								value={field.value ?? ""}
								onChange={field.onChange}
								onChangeText={field.onChange}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>

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
