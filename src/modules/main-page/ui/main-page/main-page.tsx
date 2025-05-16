import { Header } from "../../../../shared/Header/Header";
import { Footer } from "../../../../shared/Footer/Footer";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { PublicatedPost } from "../post";
import { useModal } from "../../../../modules/auth/context";
import { ICONS } from "../../../../shared/ui/icons";
import { ModalTool } from "../../../../shared/modal";
import { styles } from "./main-page.styles";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUserPost } from "../../../../modules/auth/types";
import { Input } from "../../../../shared/ui/input";
import { COLORS } from "../../../../shared/constants";
import { TagsMultiSelect } from "../tags-multi-select";
import { TagsCustomInput } from "../tags-custom-input";
import { pickImage } from "../../../../shared/tools";
import { useState } from "react";
import {
	ImagePickerOptions,
	launchImageLibraryAsync,
	requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";

export function MainPage() {
	const { isVisible, closeModal } = useModal();

	const [image, setImage] = useState<string>("");

	const schema = yup.object().shape({
		name: yup.string().required("Це поле обов'язкове"),
		description: yup.string().required("Це поле обов'язкове"),
		image: yup.string().required("Це поле обов'язкове"),
	});

	const { handleSubmit, control, formState, setValue, setError } =
		useForm<IUserPost>({
			defaultValues: {
				name: "",
				description: "",
				image: "",
			},
			resolver: yupResolver(schema),
		});

	async function onSearch() {
		const result = await requestMediaLibraryPermissionsAsync();

		if (result.status === "granted") {
			const images = await launchImageLibraryAsync({
				mediaTypes: "images",
				allowsMultipleSelection: true,
				selectionLimit: 10,
				base64: true,
			});

			if (images.assets) {
				setImage(images.assets[0].uri);
			}
		}
	}

	return (
		<View>
			<Header />
			<ModalTool isVisible={isVisible} onClose={() => closeModal()}>
				<View style={styles.mainModalWindow}>
					<View style={styles.closeModalButton}>
						<TouchableOpacity onPress={() => closeModal()}>
							<ICONS.CloseIcon width={15} height={15} />
						</TouchableOpacity>
					</View>
					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontSize: 24,
						}}
					>
						Створення публікації
					</Text>
					<View style={styles.mainModalInputsFrame}>
						<View style={styles.themeModalInputFrame}>
							<Text
								style={{
									fontFamily: "GTWalsheimPro-Regular",
									fontSize: 16,
								}}
							>
								Тема публікації
							</Text>
							<Controller
								control={control}
								name="name"
								render={({ field, fieldState }) => {
									return (
										<Input
											placeholder="Напишіть тему публікації"
											onChange={field.onChange}
											onChangeText={field.onChange}
											value={field.value}
											autoCorrect={false}
											errorMessage={
												fieldState.error?.message
											}
										/>
									);
								}}
							/>
							<Controller
								control={control}
								name="description"
								render={({ field, fieldState }) => {
									return (
										<Input
											height={140}
											placeholder="Напишіть опис до публікації"
											onChange={field.onChange}
											onChangeText={field.onChange}
											value={field.value}
											autoCorrect={false}
											errorMessage={
												fieldState.error?.message
											}
										/>
									);
								}}
							/>
						</View>
						<View>
							<View>
								<TagsMultiSelect></TagsMultiSelect>
							</View>
							<View>
								<TagsCustomInput></TagsCustomInput>
							</View>
						</View>
					</View>
					<View>
						<Image
							source={image ? { uri: image } : 0}
							style={{
								width: 100,
								height: 100,
								borderRadius: 25,
							}}
							resizeMode="cover"
						/>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-end",
							gap: 10,
						}}
					>
						<TouchableOpacity onPress={() => onSearch()}>
							<ICONS.PlusIcon />
						</TouchableOpacity>
						<TouchableOpacity>
							<ICONS.SettingsIcon />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => closeModal()}>
							<View style={styles.sendPostModalButton}>
								<Text
									style={{
										fontFamily: "GTWalsheimPro-Regular",
										fontSize: 14,
										color: COLORS.WHITE,
									}}
								>
									Публікація
								</Text>
								<ICONS.SendPostIcon width={16} height={18} />
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</ModalTool>
			<View>
				{/* это всё должно браться из бд:) */}
				<PublicatedPost
					name="anton"
					avatar="..../shared/ui/icons/person.png"
					text="Інколи найкращі ідеї народжуються в тиші  Природа, книга і спокій — усе, що потрібно, аби перезавантажитись"
					hashtags={["відпочинок", "натхнення"]}
					photo={[]}
					likes={140}
					views={10}
				></PublicatedPost>
				<PublicatedPost
					name="rinat"
					avatar="..../shared/ui/icons/person.png"
					text="Природа, книга і спокій — усе, що потрібно, аби перезавантажитись Інколи найкращі ідеї народжуються в тиші  "
					hashtags={["натхнення"]}
					photo={[]}
					likes={5}
					views={8}
				></PublicatedPost>
				<PublicatedPost
					name="ilia"
					avatar="..../shared/ui/icons/person.png"
					text="буває такий настрій: просто лежиш і існуєш  чай в одній руці, телефон в іншій, думки десь у космосі  і знаєте шо? норм"
					hashtags={[]}
					photo={[]}
					likes={4}
					views={10}
				></PublicatedPost>
				<PublicatedPost
					name="oleksandr"
					avatar="..../shared/ui/icons/person.png"
					text="чай в одній руці, телефон в іншій, думки десь у космосі  і знаєте шо? норм буває такий настрій: просто лежиш і існуєш "
					hashtags={["вайб"]}
					photo={[]}
					likes={9}
					views={15}
				></PublicatedPost>
			</View>
			<Footer />
		</View>
	);
}
