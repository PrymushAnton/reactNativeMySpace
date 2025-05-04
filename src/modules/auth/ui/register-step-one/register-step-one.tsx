import { View, Text, KeyboardAvoidingView, TextInput } from "react-native";
import { Input } from "../../../../shared/ui/input";
import { ICONS } from "../../../../shared/ui/icons";
import { Button } from "../../../../shared/ui/button";
import { useForm, Controller } from "react-hook-form";
import { IRegisterStepOne } from "../../types";
import { styles } from "./register-step-one.styles";
import { Link, useRouter } from "expo-router";

export function RegisterStepOne() {
	const router = useRouter();
	const { handleSubmit, control } = useForm<IRegisterStepOne>({
		defaultValues: {
			email: "",
			phoneNumber: "",
			password: "",
			confirmPassword: "",
		},
	});
	function onSubmit(data: IRegisterStepOne) {
        const {...otherData} = data
		router.navigate({pathname: "/register/step-two", params: otherData});
		console.log(data);
	}

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>

			<Text
				style={{
					fontSize: 36,
					textAlign: "center",
					color: "white"
				}}
			>
				Реєстрація
			</Text>
			<View style={styles.form}>
					<Controller
						control={control}
						name="email"
						rules={{
							required: {
								value: true,
								message: "Це поле обов'язкове",
							},
						}}
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
						name="phoneNumber"
						rules={{
							required: {
								value: true,
								message: "Це поле обов'язкове",
							},
						}}
						render={({ field, fieldState }) => {
							return (
								<Input
									iconLeft={
										<ICONS.PhoneNumberIcon width={30} height={30} />
									}
									onChange={field.onChange}
									onChangeText={field.onChange}
									value={field.value}
									label="Номер телефона"
									autoCorrect={false}
									errorMessage={fieldState.error?.message}
								/>
							);
						}}
					/>
					<Controller
						control={control}
						rules={{
							required: {
								value: true,
								message: "Це поле обов'язкове",
							},
						}}
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
						rules={{
							required: {
								value: true,
								message: "Це поле обов'язкове",
							},
						}}
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
			</View>
			<View style={styles.buttonBlock}>
				<Button text="Продовжити" onPress={handleSubmit(onSubmit)} />
				<View>	
					<Text style={{color: "white"}}>
						Вже маєте акаунт?{" "} 
						<Link href={"/login"} style={{color: "white", textDecorationLine: "underline"}}>
							Увійти
						</Link>
					</Text>
					
				</View>
				
			</View>

		</KeyboardAvoidingView>
	);
}
