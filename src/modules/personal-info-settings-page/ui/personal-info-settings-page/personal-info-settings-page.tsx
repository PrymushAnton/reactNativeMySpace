import { TouchableOpacity, View, Text, Image, ScrollView } from "react-native";
import { Input } from "../../../../shared/ui/input";
import { styles } from "./personal-info-settings-page.styles";
import { ICONS } from "../../../../shared/ui/icons";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuthContext } from "../../../auth/context";

interface IPersonalInfoFormData {
	name: string
	surname: string
	birthDate: string
}

export function PersonalInfoSettingsPage() {
	const { control, handleSubmit } = useForm<IPersonalInfoFormData>({
		defaultValues: {
			name: "",
			surname: "",
			birthDate: "",
			// email: "",
			// password: "",
		},
	});
	const [isFullNameChecked, setIsFullNameChecked] = useState(true);
	const [isWritingChecked, setIsWritingChecked] = useState(false);
	const router = useRouter();
	const {user, token} = useAuthContext()

	function onSubmit(data: IPersonalInfoFormData) {
		async function updateUser() {
			const response = await fetch("http://192.168.1.10:3011/user/update", {
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
			})
		}
		updateUser()
		router.replace("/main");
	}

	return (
		<View
			style={{
				marginVertical: 10,
			}}
		>
			<ScrollView style={styles.personalInfoSettings}>
				{/* Особиста інформація / Альбоми */}
				<View style={styles.personalInfoSettingsTop}>
					<TouchableOpacity style={styles.personalInfoSettingsTopEl}>
						<Text
							style={{
								fontWeight: 700,
								borderBottomWidth: 2,
							}}
						>
							Особиста інформація
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.personalInfoSettingsTopEl} onPress={()=>{
						router.replace("/albums")
					}}>
						<Text>Альбоми</Text>
					</TouchableOpacity>
				</View>

				<View>
					{/* Картка профілю */}
					<View style={styles.profileCard}>
						<View style={styles.profileCardTop}>
							<Text style={{ fontWeight: 500 }}>
								Картка профілю
							</Text>
							<TouchableOpacity
								style={{
									borderWidth: 1,
									borderColor: "#543C52",
									borderRadius: "50%",
									padding: 10,
								}}
							>
								<ICONS.PencilIcon width={15} height={15} />
							</TouchableOpacity>
						</View>

						<View style={styles.profileCardBottom}>
							{
								user?.image
								? <Image
									style={{
										height: 100,
										width: 100,
									}}
									source={{uri: user.image}}
								/>
								: <ICONS.EyeIcon width={100} height={100}/>
							}
							
							<Text
								style={{
									fontWeight: 700,
									fontSize: 24,
								}}
							>
								{	
									user?.name && user?.surname
									&& user.name + " " + user.surname
								}
							</Text>
							<Text
								style={{
									fontWeight: 500,
								}}
							>
								{
									user?.username
									? user.username
									: user?.email
										&& "@" + user.email.split("@")[0]

								}
							</Text>
						</View>
					</View>

					{/* Особиста інформація */}
					<View style={styles.personalInfo}>
						<View style={styles.personalInfoTop}>
							<Text style={{ fontWeight: 500 }}>
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
											placeholder="Lina"
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
											placeholder="Li"
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
							{/* <Controller
								name="email"
								control={control}
								render={({ field }) => {
									return ( */}
										<Input
											placeholder="you@example.com"
											autoCorrect={false}
											// value={field.value}
											// onChangeText={field.onChange}
										/>
									{/* );
								}}
							/> */}

							<Text style={styles.inputText}>Пароль</Text>
							{/* <Controller
								name="password"
								control={control}
								render={({ field }) => {
									return ( */}
										<Input.Password
											showLeftIcon={false}
											placeholder="*****"
											autoCorrect={false}
											// value={field.value}
											// onChangeText={field.onChange}
										/>
									{/* );
								}}
							/> */}
						</View>
					</View>

					{/* Варіанти підпису */}
					<View style={styles.writingVariants}>
						<View style={styles.writingVariantsTop}>
							<Text style={{ fontWeight: 500 }}>
								Варіанти підпису
							</Text>
							<TouchableOpacity
								style={{
									borderWidth: 1,
									borderColor: "#543C52",
									borderRadius: "50%",
									padding: 10,
								}}
							>
								<ICONS.PencilIcon width={15} height={15} />
							</TouchableOpacity>
						</View>

						<View>
							<View>
								<TouchableOpacity
									style={styles.writingVariantsCheckbox}
									onPress={() =>
										setIsFullNameChecked(!isFullNameChecked)
									}
								>
									{isFullNameChecked ? (
										<ICONS.CheckedCheckbox
											width={15}
											height={15}
										/>
									) : (
										<ICONS.UncheckedCheckbox
											width={15}
											height={15}
										/>
									)}
									<Text style={{ color: "#AA9EA9" }}>
										Ім'я та прізвище
									</Text>
								</TouchableOpacity>
								<Text>Lina Li</Text>
							</View>
							<View>
								<TouchableOpacity
									style={styles.writingVariantsCheckbox}
									onPress={() =>
										setIsWritingChecked(!isWritingChecked)
									}
								>
									{isWritingChecked ? (
										<ICONS.CheckedCheckbox
											width={15}
											height={15}
										/>
									) : (
										<ICONS.UncheckedCheckbox
											width={15}
											height={15}
										/>
									)}
									<Text style={{ color: "#AA9EA9" }}>
										Мій електроний підпис
									</Text>
								</TouchableOpacity>
								<Image
									source={require("./2.png")}
									style={{ alignSelf: "center" }}
								></Image>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}
