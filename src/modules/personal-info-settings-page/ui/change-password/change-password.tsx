import { View, Image, Text, TouchableOpacity } from "react-native";
import { ICONS } from "../../../../shared/ui/icons";
import { IChangePasswordForm, IAvatarProps } from "./change-password.types";
import { styles } from "./change-password.styles";
import { pickImage } from "../../../../shared/tools";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../auth/context";
import { Response } from "../../../../shared/types";
import { ProfileCard } from "../../../../shared/ui/profileCard";
import { ButtonEdit } from "../buttonEdit";
import { Controller, useForm } from "react-hook-form";
import { HOST, PORT } from "../../../../shared/base-url";

export function ChangePassword() {
	const [avatar, setAvatar] = useState<string>("");

	const { token, getData, user } = useAuthContext();

	const [editable, setEditable] = useState<boolean>(false);

	const { control, handleSubmit, setValue, getValues } = useForm<IChangePasswordForm>(
		{
			defaultValues: {
				password: "",
				repeatPassword: "",
			},
		}
	);

	if (!user) {
		throw Error("Ви не авторизовані");
	}


	function onSubmit(data: IChangePasswordForm) {
		// async function func() {
		// 	try {
		// 		if (!token) return;

		// 		const res = await fetch(`http://${HOST}/user/update-avatar`, {
		// 			method: "POST",
		// 			headers: {
		// 				"Content-Type": "application/json",
		// 				Authorization: `Bearer ${token}`,
		// 			},
		// 			body: JSON.stringify(data),
		// 		});
		// 		const result: Response<string> = await res.json();
		// 		getData(token);
		// 	} catch (error) {
		// 		console.log("Помилка при оновленні:", (error as Error).message);
		// 	}
		// }
		// func();
	}

	return (
		<View style={styles.profileCard}>
			<View style={styles.profileCardTop}>
				<Text
					style={{
						fontWeight: "700",
						fontFamily: "GTWalsheimPro-Regular",
					}}
				>
					Зміна паролю
				</Text>

				<ButtonEdit
					editable={editable}
					onPress={() => {
						if (editable) {
							handleSubmit(onSubmit)();
						}
						setEditable(!editable);
					}}
				/>
			</View>

			<View style={styles.view}>
				<Controller
					control={control}
					name="password"
					render={({ field, fieldState }) => (
						<ProfileCard
							label="Новий пароль"
							type="password"
							editable={editable}
							value={field.value}
							onChangeText={field.onChange}
							errorMessage={fieldState.error?.message}
							placeholder="********"
						/>
					)}
				/>

				<Controller
					control={control}
					name="repeatPassword"
					render={({ field, fieldState }) => (
						<ProfileCard
							label="Підтвердіть новий пароль"
							type="password"
							editable={editable}
							value={field.value}
							onChangeText={field.onChange}
							errorMessage={fieldState.error?.message}
							placeholder="********"
						/>
					)}
				/>
			</View>
		</View>
	);
}
