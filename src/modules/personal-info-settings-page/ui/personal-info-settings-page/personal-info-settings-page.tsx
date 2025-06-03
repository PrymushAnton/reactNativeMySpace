import { TouchableOpacity, View, Text, Image, ScrollView } from "react-native";
import { Input } from "../../../../shared/ui/input";
import { styles } from "./personal-info-settings-page.styles";
import { ICONS } from "../../../../shared/ui/icons";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuthContext } from "../../../auth/context";
import { EmailIcon } from "../../../../shared/ui/icons/email-icon";

interface IPersonalInfoFormData {
	name: string;
	surname: string;
	username: string;
	email: string;
	password: string;
	birthDate: string;
}

export function PersonalInfoSettingsPage() {
	const { control, handleSubmit } = useForm<IPersonalInfoFormData>({
		defaultValues: {
			name: "",
			surname: "",
			birthDate: "",
			email: "",
			password: "",
			username: ""
		},
	});
	const [isFullNameChecked, setIsFullNameChecked] = useState(true);
	const [isWritingChecked, setIsWritingChecked] = useState(false);
	const router = useRouter();
	const { user, token } = useAuthContext();

	function onSubmit(data: IPersonalInfoFormData) {
		async function updateUser() {
			const response = await fetch(
				"http://192.168.1.10:3011/user/update",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						name: data.name,
						surname: data.surname,
						birthDate: data.birthDate,
					}),
				}
			);
		}
		updateUser();
		router.replace("/main");
	}

	return (
		<View
			style={{
				marginVertical: 10,
			}}
		>
			<ScrollView style={styles.personalInfoSettings}>
				<View style={styles.personalInfoSettingsTop}>
					<TouchableOpacity style={styles.personalInfoSettingsTopEl}>
						<Text
							style={{
								fontWeight: 700,
								borderBottomWidth: 2,
								fontFamily: "GTWalsheimPro-Regular",
							}}
						>
							Особиста інформація
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.personalInfoSettingsTopEl}
						onPress={() => {
							router.replace("/albums");
						}}
					>
						<Text style={{fontFamily: "GTWalsheimPro-Regular",}}>Альбоми</Text>
					</TouchableOpacity>
				</View>

				<View>
					<View style={styles.profileCard}>
						<View style={styles.profileCardTop}>
							<Text style={{ fontWeight: 700, fontFamily: "GTWalsheimPro-Regular", }}>
								Картка профілю
							</Text>
						</View>

						<View style={styles.profileCardBottom}>
							{user?.image ? (
								<Image
									style={{
										height: 100,
										width: 100,
									}}
									source={{ uri: user.image }}
								/>
							) : (
								<ICONS.AnonymousLogoIcon
									width={150}
									height={150}
								/>
							)}
						</View>
					</View>

					<View style={styles.personalInfo}>
						<View style={styles.personalInfoTop}>
							<Text style={{ fontWeight: 700, fontFamily: "GTWalsheimPro-Regular", }}>
								Особиста інформація
							</Text>
							<TouchableOpacity
								style={{
									borderWidth: 1,
									borderColor: "#543C52",
									borderRadius: "50%",
									padding: 10,
								}}
								onPress={handleSubmit(onSubmit)}
							>
								<ICONS.PencilIcon width={15} height={15} />
							</TouchableOpacity>
						</View>
						<View>
							<Text style={styles.inputText}>Ім'я</Text>
							<Controller
								name="name"
								control={control}
								render={({ field }) => {
									return (
										<Input
											placeholder="Your name"
											autoCorrect={false}
											value={field.value}
											onChangeText={field.onChange}
										/>
									);
								}}
							/>

							<Text style={styles.inputText}>Прізвище</Text>
							<Controller
								name="surname"
								control={control}
								render={({ field }) => {
									return (
										<Input
											placeholder="Your surname"
											autoCorrect={false}
											value={field.value}
											onChangeText={field.onChange}
										/>
									);
								}}
							/>

							<Text style={styles.inputText}>
								Дата народження
							</Text>
							<Controller
								name="birthDate"
								control={control}
								render={({ field }) => {
									return (
										<Input
											placeholder="дд.мм.рррр"
											autoCorrect={false}
											value={field.value}
											onChangeText={field.onChange}
										/>
									);
								}}
							/>

							<Text style={styles.inputText}>
								Електрона адреса
							</Text>
							<Controller
								name="email"
								control={control}
								render={({ field }) => {
									return (
										<Input
											placeholder="you@example.com"
											autoCorrect={false}
											value={field.value}
											onChangeText={field.onChange}
										/>
									);
								}}
							/>

							<Text style={styles.inputText}>Пароль</Text>
							<Controller
								name="password"
								control={control}
								render={({ field }) => {
									return (
										<Input.Password
											showLeftIcon={false}
											placeholder="*****"
											autoCorrect={false}
											value={field.value}
											onChangeText={field.onChange}
										/>
									);
								}}
							/>

							<Text style={styles.inputText}>Username</Text>
							<Controller
								name="username"
								control={control}
								render={({ field }) => {
									return (
										<Input
											placeholder="@"
											autoCorrect={false}
											value={field.value}
											onChangeText={field.onChange}
										/>
									);
								}}
							/>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}
