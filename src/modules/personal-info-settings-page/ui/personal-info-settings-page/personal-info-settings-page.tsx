import { TouchableOpacity, View, Text, Image, ScrollView } from "react-native";
import { Input } from "../../../../shared/ui/input";
import { styles } from "./personal-info-settings-page.styles";
import { ICONS } from "../../../../shared/ui/icons";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthContext } from "../../../auth/context";
import { HeaderNavigationSettingsPages } from "../header-navigation-settings-pages";

interface IPersonalInfoFormData {
	name: string;
	surname: string;
	username: string;
	email: string;
	password: string;
	birthDate: string;
}

const inputs = [
	{
		label: "Ім'я",
		name: "name",
		placeholder: "Your name",
	},
	{
		label: "Прізвище",
		name: "surname",
		placeholder: "Your surname",
	},
	{
		label: "Дата народження",
		name: "birthDate",
		placeholder: "дд.мм.рррр",
	},
	{
		label: "Електрона адреса",
		name: "email",
		placeholder: "you@example.com",
	},
	{
		label: "Пароль",
		name: "password",
		placeholder: "Password here",
		isPassword: true,
	},
	{
		label: "Username",
		name: "username",
		placeholder: "@",
	},
];

export function PersonalInfoSettingsPage() {
	const router = useRouter();
	const { user, token, getData } = useAuthContext();

	const { control, handleSubmit, setValue, getValues } =
		useForm<IPersonalInfoFormData>({
			defaultValues: {
				name: "",
				surname: "",
				birthDate: "",
				email: "",
				password: "",
				username: "",
			},
		});

	useEffect(() => {
		if (!user && token && getData) {
			getData(token);
		}
	}, [user, token]);

	useEffect(() => {
		if (user) {
			setValue("name", user.name || "");
			setValue("surname", user.surname || "");
			setValue("birthDate", user.birthDate ? String(user.birthDate) : "");
			setValue("email", user.email || "");
			setValue("username", user.username || "");
		}
		console.log("us on sett", user)
	}, [user]);

	function onSubmit(data: IPersonalInfoFormData) {
		async function updateUser() {
			const body: Partial<IPersonalInfoFormData> = {};
			(Object.keys(data) as (keyof IPersonalInfoFormData)[]).forEach(
				(key) => {
					const value = data[key];
					if (
						key === "password"
							? value
							: value &&
							  value !== user?.[key as keyof typeof user]
					) {
						body[key] = value;
					}
				}
			);

			if (Object.keys(body).length === 0) {
				console.log("haven't edits for send");
				return;
			}

			await fetch("http://192.168.1.10:3011/user/update", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(body),
			});

			router.replace("/main");
		}

		updateUser();
	}

	return (
		<ScrollView style={styles.personalInfoSettings}>
			<HeaderNavigationSettingsPages />
			<View>
				<View style={styles.profileCard}>
					<View style={styles.profileCardTop}>
						<Text
							style={{
								fontWeight: "700",
								fontFamily: "GTWalsheimPro-Regular",
							}}
						>
							Картка профілю
						</Text>
					</View>

					<View style={styles.profileCardBottom}>
						{user?.image ? (
							<Image
								style={{ height: 100, width: 100 }}
								source={{ uri: user.image }}
							/>
						) : (
							<ICONS.AnonymousLogoIcon width={150} height={150} />
						)}
					</View>
				</View>

				<View style={styles.personalInfo}>
					<View style={styles.personalInfoTop}>
						<Text
							style={{
								fontWeight: "700",
								fontFamily: "GTWalsheimPro-Regular",
							}}
						>
							Особиста інформація
						</Text>
						<TouchableOpacity
							style={{
								borderWidth: 1,
								borderColor: "#543C52",
								borderRadius: 50,
								padding: 10,
							}}
							onPress={handleSubmit(onSubmit)}
						>
							<ICONS.PencilIcon width={15} height={15} />
						</TouchableOpacity>
					</View>

					{inputs.map((field) => (
						<View key={field.name}>
							<Text style={styles.inputText}>{field.label}</Text>
							<Controller
								name={field.name as keyof IPersonalInfoFormData}
								control={control}
								render={({ field: controllerField }) => {
									const InputComponent = field.isPassword
										? Input.Password
										: Input;
									return (
										<InputComponent
											showLeftIcon={false}
											placeholder={field.placeholder}
											autoCorrect={false}
											value={controllerField.value}
											onChangeText={
												controllerField.onChange
											}
										/>
									);
								}}
							/>
						</View>
					))}
				</View>
			</View>
		</ScrollView>
	);
}
