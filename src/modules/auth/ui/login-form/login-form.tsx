import { Button } from "../../../../shared/ui/button";
import { Text, View } from "react-native";
import { Input } from "../../../../shared/ui/input";
import { ICONS } from "../../../../shared/ui/icons";
import { ILogin } from "../../types";
import { Controller, useForm } from "react-hook-form";
import { styles } from "./login-form.styles";
import { useAuthContext } from "../../context";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "expo-router";
import { useEffect, useState } from "react";

export function LoginForm() {
	const schema = yup.object().shape({
		email: yup
			.string()
			.email("Некоректна пошта")
			.required("Це поле обов'язкове")
			.trim("Видаліть пробіли на початку і в кінці"),
		password: yup
			.string()
			.required("Це поле обов'язкове")
			.trim("Видаліть пробіли на початку і в кінці")
	});

	const { handleSubmit, control, setValue, setError } = useForm<ILogin>({
		defaultValues: { email: "", password: "" },
		resolver: yupResolver(schema),
	});

	const [globalError, setGlobalError] = useState<string>("")
	const { login } = useAuthContext();

	function onSubmit(data: ILogin) {
		async function request(){
			const response = await login(
				data.email,
				data.password
			);
			setValue("email", "")
			setValue("password", "")

			if (typeof(response) === "string") {
				setGlobalError(response)
			} else {
				response.forEach((obj) => {
					setError(obj.path as keyof ILogin, {message: obj.message});
				})
			}
		}
		request()
	}

	return (
		<View style={styles.container}>
			<Text
				style={{
					fontSize: 36,
					textAlign: "center",
					color: "white",
				}}
			>
				Авторизація
			</Text>

			<View style={styles.form}>
				<Controller
					control={control}
					name="email"
					render={({ field, fieldState }) => {
						return (
							<Input
								label="Пошта"
								onChange={field.onChange}
								onChangeText={field.onChange}
								value={field.value}
								autoCorrect={false}
								errorMessage={fieldState.error?.message}
								iconLeft={
									<ICONS.EmailIcon width={30} height={30} />
								}
							/>
						);
					}}
				/>

				<Controller
					control={control}
					name="password"
					render={({ field, fieldState }) => {
						return (
							<Input.Password
								label="Пароль"
								onChange={field.onChange}
								onChangeText={field.onChange}
								value={field.value}
								autoCorrect={false}
								errorMessage={fieldState.error?.message}
							/>
						);
					}}
				/>
			</View>

			{
				!(globalError === "")
				&& <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
					<ICONS.ErrorIcon width={30} height={30}/>
					<Text style={{display:"flex", color: "red"}}>{globalError}</Text>
				</View>
			}

			<View style={styles.buttonBlock}>
				<Button
					text="Авторизуватись"
					onPress={handleSubmit(onSubmit)}
				/>
				<View style={{alignItems: "center", justifyContent: "center"}}>
					<Text style={{ color: "white" }}>Ще не маєте акаунту?</Text>
					<Link
						href={"/register"}
						style={{
							color: "white",
							textDecorationLine: "underline"
						}}
						replace={true}
					>
						Зареєструватись
					</Link>
				</View>
			</View>
		</View>
	);
}
