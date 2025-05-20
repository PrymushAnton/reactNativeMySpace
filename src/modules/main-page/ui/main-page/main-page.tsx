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
import {
	launchImageLibraryAsync,
	requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { useState } from "react";
import { usePost } from "../../hooks/usePost";
import { ScrollView } from "react-native-virtualized-view";

export function MainPage() {
	const { isVisible, closeModal } = useModal();

	const [images, setImages] = useState<string[]>([]);
	const [globalError, setGlobalError] = useState<string>("");

	const schema = yup.object().shape({
		name: yup.string().required("Це поле обов'язкове"),
		description: yup.string().required("Це поле обов'язкове"),
		image: yup.string().required("Додайте хоча б одне зображення"),
		defaultTags: yup.array().required("Додайте хоча б дефолтний один тег"),
		customTags: yup.array().required("Додайте хоча б кастомний один тег"),
		link: yup.string().default(""),
	});

	const { handleSubmit, control, formState, setValue, setError } =
		useForm<IUserPost>({
			defaultValues: {
				name: "",
				description: "",
				image: "",
				defaultTags: [],
				customTags: [],
				link: "",
			},
			resolver: yupResolver(schema),
		});

	const {
		createPost,
		updatePost,
		deletePost,
		getAllPosts,
		getPostsByUserId,
		getAllTags,
	} = usePost();

	async function closingModal() {
		closeModal();
		setValue("name", "");
		setValue("description", "");
		setImages([]);
		setValue("image", "");
		setValue("defaultTags", []);
		setValue("customTags", []);
		setValue("link", "");
	}

	function removeImage(index: number) {
		const updatedImages = images.filter((_, i) => i !== index);
		setImages(updatedImages);
		setValue("image", updatedImages.join(","));
	}

	async function onSearch() {
		const result = await requestMediaLibraryPermissionsAsync();

		if (result.status === "granted") {
			const selected = await launchImageLibraryAsync({
				mediaTypes: "images",
				allowsMultipleSelection: true,
				selectionLimit: 9,
				base64: false,
			});

			if (selected.assets) {
				const uris = selected.assets.map((asset) => asset.uri);
				setImages(uris);
				setValue("image", uris.join(","));
			}
		}
	}

	function onSubmit(data: IUserPost) {
		async function request() {
			const response = await createPost(data);
			console.log(response);
			closingModal();
		}
		request();
	}

	return (
		<View>
			<ModalTool isVisible={isVisible} onClose={closingModal}>
				<ScrollView style={styles.mainModalWindow}>
					<View style={styles.closeModalButton}>
						<TouchableOpacity onPress={closingModal}>
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
											multiline={true}
											isTextArea={true}
											errorMessage={
												fieldState.error?.message
											}
										/>
									);
								}}
							/>
						</View>
						<View>
							<Controller
								control={control}
								name="defaultTags"
								render={({ field }) => (
									<TagsMultiSelect
										selectedTags={field.value}
										onChange={field.onChange}
									/>
								)}
							/>

							<Controller
								control={control}
								name="customTags"
								render={({ field }) => (
									<TagsCustomInput
										value={field.value}
										onChange={field.onChange}
									/>
								)}
							/>
						</View>
					</View>

					<View style={styles.themeModalInputFrame}>
						<Text
							style={{
								fontFamily: "GTWalsheimPro-Regular",
								fontSize: 16,
							}}
						>
							Посилання
						</Text>
						<Controller
							control={control}
							name="link"
							render={({ field, fieldState }) => {
								return (
									<Input
										placeholder="Напишіть посилання"
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
					{images.length > 0 && (
						<View
							style={{
								flexDirection: "row",
								flexWrap: "wrap",
								gap: 16,
								marginBottom: 15,
								marginTop: 15,
							}}
						>
							{images.map((uri, index) => (
								<View
									key={index}
									style={{ position: "relative", alignItems: "flex-end" }}
								>
									<Image
										source={{ uri }}
										style={{
											width: 100,
											height: 100,
											borderRadius: 15,
										}}
										resizeMode="cover"
									/>
									<TouchableOpacity
										onPress={() => removeImage(index)}
										style={styles.imageDeleteButton}
									>
										<ICONS.TrashCanIcon width={20} height={20} color={"#543C52"}/>
									</TouchableOpacity>
								</View>
							))}
						</View>
					)}

					<View
						style={
							images && images.length >= 2
								? {
										flexDirection: "row",
										justifyContent: "flex-end",
										gap: 10,
										width: 343,
										height: 40,
										marginBottom: 40,
								  }
								: {
										flexDirection: "row",
										justifyContent: "flex-end",
										gap: 10,
										width: 343,
										height: 40,
										marginTop: 20,
								  }
						}
					>
						<TouchableOpacity onPress={onSearch}>
							<ICONS.ImageWithStylesIcon />
						</TouchableOpacity>
						<TouchableOpacity>
							<ICONS.EmojiWithStylesIcon />
						</TouchableOpacity>
						<TouchableOpacity onPress={handleSubmit(onSubmit)}>
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
				</ScrollView>
			</ModalTool>

			<View>
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
		</View>
	);
}
