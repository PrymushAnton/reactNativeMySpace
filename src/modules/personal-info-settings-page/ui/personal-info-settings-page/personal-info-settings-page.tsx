import {
	TouchableOpacity,
	View,
	Text,
	Image,
	ScrollView,
	FlatList,
	Platform,
	Pressable,
} from "react-native";
// import { Input } from "../../../../shared/ui/input";
import { styles } from "./personal-info-settings-page.styles";
import { ICONS } from "../../../../shared/ui/icons";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAuthContext } from "../../../auth/context";
import { HeaderNavigationSettingsPages } from "../header-navigation-settings-pages";
import { ProfileCard } from "../../../../shared/ui/profileCard";
// import { IUser } from "../../../auth/context/context.types";
import { Avatar } from "../avatar";
import { Response } from "../../../../shared/types";
import parsePhoneNumberFromString, {
	isValidPhoneNumber,
} from "libphonenumber-js";
import { format } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";

interface IPersonalInfoFormData {
	name: string;
	surname: string;
	username: string;
	email: string;
	phoneNumber: string;
	birthDate: Date;
}

export function PersonalInfoSettingsPage() {
	const router = useRouter();
	const { user, token, getData } = useAuthContext();

	const [editable, setEditable] = useState<boolean>(false);

	const [show, setShow] = useState(false);
	function showDatepicker() {
		setShow(true);
	}

	if (!user) {
		throw Error("Ви не авторизовані!");
	}

	const { control, handleSubmit, setValue, getValues } =
		useForm<IPersonalInfoFormData>({
			defaultValues: {
				name: "",
				surname: "",
				birthDate: new Date(),
				email: "",
				phoneNumber: "",
				username: "",
			},
		});

	useEffect(() => {
		if (user) {
			setValue("name", user.name ? user.name : "");
			setValue("surname", user.surname ? user.surname : "");
			// setValue(
			// 	"birthDate",
			// 	user.birthDate
			// 		? format(new Date(user.birthDate), "dd.MM.yyyy")
			// 		: ""
			// );
			setValue("email", user.email ? user.email : "");
			setValue("username", user.username ? user.username : "");
			setValue(
				"phoneNumber",
				user.phoneNumber
					? parsePhoneNumberFromString(
							user.phoneNumber
					  )!.formatInternational()
					: ""
			);
		}
	}, [user]);

	function onSubmit(data: IPersonalInfoFormData) {
		console.log("1", data);
		const filteredData = Object.entries(data).filter(([key, value]) => {
			return value !== "";
		});
		const obj: Partial<IPersonalInfoFormData> =
			Object.fromEntries(filteredData);

		console.log("1.1", obj);
		async function sendRequest() {
			try {
				if (!token) {
					console.log("lolo")
					return
				};
				const res = await fetch(
					"http://192.168.1.10:3011/user/update",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify(obj),
					}
				);
				const result: Response<string> = await res.json();
				getData(token);
				console.log("4", result);
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
								// defaultValue={user.name}
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
								// defaultValue={user.surname}
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
								// defaultValue={user.username}
								value={field.value}
								onChangeText={field.onChange}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>
					{/* 
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
								// defaultValue={
								// 	user.birthDate
								// 		? String(user.birthDate)
								// 		: undefined
								// }
								value={field.value}
								onChangeText={field.onChange}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/> */}

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
								// defaultValue={user.email}
								value={field.value}
								onChangeText={field.onChange}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="phoneNumber"
						rules={{
							validate: (value) => {
								if (value === "") return true;
								if (!isValidPhoneNumber(value))
									return "Невалідний номер телефона";
								return true;
							},
						}}
						render={({ field, fieldState }) => (
							<ProfileCard
								placeholder={
									user.phoneNumber
										? undefined
										: "Не вказано :("
								}
								bottomText="Мобільний (з кодом країни)"
								type="tel"
								editable={editable}
								// defaultValue={
								// 	user.phoneNumber?.slice(0, 4) +
								// 	" " +
								// 	user.phoneNumber?.slice(4, 6) +
								// 	" " +
								// 	user.phoneNumber?.slice(6, 9) +
								// 	" " +
								// 	user.phoneNumber?.slice(9, 11) +
								// 	" " +
								// 	user.phoneNumber?.slice(11, 13)
								// }
								value={field.value}
								onChangeText={field.onChange}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="birthDate"
						render={({ field }) => {
							return (
								<>
									<Pressable
										onPress={
											editable
												? showDatepicker
												: undefined
										}
									>
										<ProfileCard
											bottomText="Дата народження"
											value={field.value?.toLocaleDateString()}
											editable={false}
											type="date"
											// pointerEvents="none"
										/>
									</Pressable>
									{show && (
										<DateTimePicker
											value={field.value}
											mode="date"
											display={
												Platform.OS === "ios"
													? "spinner"
													: "default"
											}
											onChange={(event, selectedDate) => {
												setShow(Platform.OS === "ios");
												if (!selectedDate) return;
												field.onChange(selectedDate);
											}}
											maximumDate={new Date()}
											minimumDate={new Date(1900, 0, 1)}
										/>
									)}
								</>
							);
						}}
					/>
				</View>
			</View>
		</ScrollView>
	);
}
