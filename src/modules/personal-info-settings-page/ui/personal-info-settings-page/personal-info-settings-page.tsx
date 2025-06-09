import {
	TouchableOpacity,
	View,
	Text,
	Image,
	ScrollView,
	FlatList,
} from "react-native";
import { Input } from "../../../../shared/ui/input";
import { styles } from "./personal-info-settings-page.styles";
import { ICONS } from "../../../../shared/ui/icons";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAuthContext } from "../../../auth/context";
import { HeaderNavigationSettingsPages } from "../header-navigation-settings-pages";
import { ProfileCard } from "../../../../shared/ui/profileCard";
import { IUser } from "../../../auth/context/context.types";
import { Avatar } from "../avatar";
import { Response } from "../../../../shared/types";

interface IPersonalInfoFormData {
	name: string;
	surname: string;
	username: string;
	email: string;
	phoneNumber: string;
	birthDate: string;
}

export function PersonalInfoSettingsPage() {
	const router = useRouter();
	const { user, token } = useAuthContext();

	const [editable, setEditable] = useState<boolean>(false);

	if (!user) {
		throw Error("Ви не авторизовані!");
	}

	const { control, handleSubmit, setValue, getValues } =
		useForm<IPersonalInfoFormData>({
			defaultValues: {
				name: "",
				surname: "",
				birthDate: "",
				email: "",
				phoneNumber: "",
				username: "",
			},
		});

	useEffect(() => {
		if (user) {
			setValue("name", user.name ? user.name : "");
			setValue("surname", user.surname ? user.surname : "");
			setValue(
				"birthDate",
				user.birthDate
					? String(user.birthDate)
					: ""
			);
			setValue("email", user.email ? user.email : "");
			setValue("username", user.username ? user.username : "");
			setValue("phoneNumber", user.phoneNumber ? user.phoneNumber : "");
		}
	}, [user]);

	function onSubmit(data: IPersonalInfoFormData) {
		console.log(data);
		async function sendRequest() {
			try {
				const res = await fetch(
					"http://192.168.3.11:3011/user/update",
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
				console.log(result);
			} catch (error) {
				console.log((error as Error).message);
			}
		}
		sendRequest();
	}

	return (
		<ScrollView style={styles.personalInfoSettings} overScrollMode="never">
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
					<Avatar image={user.image} />
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
							onPress={() => {
								if (editable) {
									handleSubmit(onSubmit)();
								}
								setEditable(!editable);
							}}
						>
							<ICONS.PencilIcon width={15} height={15} />
						</TouchableOpacity>
					</View>

					<Controller
						control={control}
						name="name"
						render={({ field, fieldState }) => (
							<ProfileCard
								placeholder={
									user.name ? undefined : "Не вказано :("
								}
								bottomText="Ім'я"
								type="text"
								defaultValue={user.name}
								editable={editable}
								value={field.value}
								onChangeText={field.onChange}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="surname"
						render={({ field, fieldState }) => (
							<ProfileCard
								placeholder={
									user.surname ? undefined : "Не вказано :("
								}
								bottomText="Прізвище"
								type="text"
								editable={editable}
								defaultValue={user.surname}
								value={field.value}
								onChangeText={field.onChange}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="username"
						render={({ field, fieldState }) => (
							<ProfileCard
								placeholder={
									user.username ? undefined : "Не вказано :("
								}
								bottomText="Нікнейм"
								type="text"
								editable={editable}
								defaultValue={user.username}
								value={field.value}
								onChangeText={field.onChange}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="birthDate"
						render={({ field, fieldState }) => (
							<ProfileCard
								placeholder={
									user.birthDate ? undefined : "Не вказано :("
								}
								bottomText="Дата народження"
								type="date"
								editable={editable}
								defaultValue={
									user.birthDate
										? String(user.birthDate)
										: undefined
								}
								value={field.value}
								onChangeText={field.onChange}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="email"
						render={({ field, fieldState }) => (
							<ProfileCard
								placeholder={
									user.email ? undefined : "Не вказано :("
								}
								bottomText="Електронна пошта"
								type="email"
								editable={editable}
								defaultValue={user.email}
								value={field.value}
								onChangeText={field.onChange}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="phoneNumber"
						render={({ field, fieldState }) => (
							<ProfileCard
								placeholder={
									user.phoneNumber
										? undefined
										: "Не вказано :("
								}
								bottomText="Мобільний"
								type="tel"
								editable={editable}
								defaultValue={user.phoneNumber}
								value={field.value}
								onChangeText={field.onChange}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>
				</View>
			</View>
		</ScrollView>
	);
}
