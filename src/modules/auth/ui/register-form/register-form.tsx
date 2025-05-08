import {
	Keyboard,
	View,
	Text,
	KeyboardAvoidingView,
	ScrollView,
	TouchableWithoutFeedback,
} from "react-native";
import { Input } from "../../../../shared/ui/input";
import { ICONS } from "../../../../shared/ui/icons";
import { Button } from "../../../../shared/ui/button";
import { useForm, Controller } from "react-hook-form";
import { IRegistration } from "../../types";
import { styles } from "./register-form.styles";
import { useRouter } from "expo-router";
import { useAuthContext } from "../../context";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "expo-router";
import { useState } from "react";

export function RegisterForm() {
	const schema = yup.object().shape({
		username: yup
			.string()
			.required("Це поле обов'язкове")
			.min(3, "Довжина повинна бути 3 або більше")
			.max(32, "Довжина повинна бути менше або 32")
			.trim("Видаліть пробіли на початку і в кінці"),
		email: yup
			.string()
			.email("Некоректна пошта")
			.required("Це поле обов'язкове")
			.min(3, "Довжина повинна бути 3 або більше")
			.max(64, "Довжина повинна бути менше або 32")
			.trim("Видаліть пробіли на початку і в кінці"),
		password: yup
			.string()
			.required("Це поле обов'язкове")
			.min(8, "Довжина повинна бути 8 або більше")
			.max(32, "Довжина повинна бути менше або 32")
			.trim("Видаліть пробіли на початку і в кінці")
			.test("uppercase", "Має бути хоча б одна велика літера", (v) =>
				/[A-Z]/.test(v || "")
			)
			.test("lowercase", "Має бути хоча б одна маленька літера", (v) =>
				/[a-z]/.test(v || "")
			)
			.test("digit", "Має бути хоча б одна цифра", (v) =>
				/\d/.test(v || "")
			)
			.test("special", "Має бути хоча б один спеціальний символ", (v) =>
				/[!@#$%^&*(),.?":{}|<>]/.test(v || "")
			),
		confirmPassword: yup
			.string()
			.required("Це поле обов'язкове")
			.oneOf([yup.ref("password")], "Паролі не співпадають"),
	});

	const router = useRouter();
	const { register } = useAuthContext();
	const [globalError, setGlobalError] = useState<string>("")
	

	const { handleSubmit, control, formState, setValue, setError } =
		useForm<IRegistration>({
			defaultValues: {
				username: "",
				email: "",
				password: "",
				confirmPassword: "",
			},
			resolver: yupResolver(schema),
		});
	function onSubmit(data: IRegistration) {
		async function request(){
			const response = await register(
				data.username,
				data.email,
				data.password,
				data.confirmPassword
			);
			if (typeof(response) === "string") {
				setGlobalError(response)
			} else {
				response.forEach((obj) => {
					setError(obj.path as keyof IRegistration, {message: obj.message});
				})
			}
		}
		request()		
	}

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<Text
				style={{
					fontSize: 36,
					textAlign: "center",
					color: "white",
				}}
			>
				Реєстрація
			</Text>
			<View
				style={styles.formContent}
			>
				<Controller
					control={control}
					name="email"
					render={({ field, fieldState }) => {
						return (
							<Input
								iconLeft={
									<ICONS.EmailIcon width={30} height={30} />
								}
								onChange={field.onChange}
								onChangeText={field.onChange}
								value={field.value}
								label="Пошта"
								autoCorrect={false}
								errorMessage={fieldState.error?.message}
							/>
						);
					}}
				/>
				<Controller
					control={control}
					name="username"
					render={({ field, fieldState }) => {
						return (
							<Input
								onChange={field.onChange}
								onChangeText={field.onChange}
								value={field.value}
								label="Нікнейм"
								autoCorrect={false}
								errorMessage={fieldState.error?.message}
								iconLeft={
									<ICONS.NicknameIcon
										width={30}
										height={30}
									/>
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
								onChange={field.onChange}
								onChangeText={field.onChange}
								value={field.value}
								label="Пароль"
								autoCorrect={false}
								errorMessage={fieldState.error?.message}
							/>
						);
					}}
				/>
				<Controller
					control={control}
					name="confirmPassword"
					render={({ field, fieldState }) => {
						return (
							<Input.Password
								onChange={field.onChange}
								onChangeText={field.onChange}
								value={field.value}
								label="Повторіть пароль"
								autoCorrect={false}
								errorMessage={fieldState.error?.message}
							/>
						);
					}}
				/>
				{
					!(globalError === "")
					&& <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
						<ICONS.ErrorIcon width={30} height={30}/>
						<Text style={{display:"flex", color: "red"}}>{globalError}</Text>
					</View>
				}
			</View>
			<View style={styles.buttonBlock}>
				<Button text="Продовжити" onPress={handleSubmit(onSubmit)} />
				<View style={{alignItems: "center", justifyContent: "center"}}>
					<Text style={{ color: "white" }}>
						Вже маєте акаунт?{" "}
						<Link
							href={"/login"}
							style={{
								color: "white",
								textDecorationLine: "underline",
							}}
						>
							Увійти
						</Link>
					</Text>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}
