import { TouchableOpacity, View, Text, Image } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { ModalTool } from "../../../../shared/modal";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../../shared/ui/input";
import { TagsCustomInput } from "../tags-custom-input";
import { ICONS } from "../../../../shared/ui/icons";
import {
	launchImageLibraryAsync,
	requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { useEffect, useState } from "react";
import { usePost } from "../../hooks/usePost";
import { useModal } from "../../../../modules/auth/context";
import { IUserPost } from "../../../../modules/auth/types";
import { styles } from "./modal-edit-post.styles";
import { TagsMultiSelect } from "../tags-multi-select";
import { COLORS } from "../../../../shared/constants";
import { useAuthContext } from "../../../auth/context";

interface Props {
	postId: number | null;
}

export function ModalEditPost({ postId }: Props) {
	const { isEditVisible, closeEditModal, editPostId } = useModal();

	const { getPostById, updatePost } = usePost();

	const [images, setImages] = useState<string[]>([]);
	const [postData, setPostData] = useState<IUserPost | null>(null);

	const { user } = useAuthContext();

	const { handleSubmit, control, setValue } = useForm<IUserPost>({
		defaultValues: {
			name: "",
			description: "",
			image: "",
			defaultTags: [],
			customTags: [],
			link: "",
		},
	});

	useEffect(() => {
		if (!isEditVisible || editPostId === null) return;

		async function fetchData() {
			if (!user) return;
			if (editPostId == null) return;

			const targetPost = await getPostById(editPostId);
			if (typeof targetPost === "string") return;
			if (targetPost) {
				setPostData(targetPost);

				setValue("name", targetPost.name || "");
				setValue("description", targetPost.description || "");
				setValue("defaultTags", targetPost.defaultTags ?? []);
				setValue("customTags", targetPost.customTags ?? []);
				setValue("link", targetPost.link ?? "");
				setValue("image", targetPost.image ?? "");

				const baseImages =
					targetPost.image?.split(",").filter(Boolean) ?? [];
				setImages(baseImages);
			}
		}

		fetchData();
	}, [isEditVisible, editPostId]);

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
				base64: true,
			});

			if (selected.assets) {
				const bases64 = selected.assets
					.map((asset) => asset.base64)
					.filter(
						(base64): base64 is string => typeof base64 === "string"
					);

				if (bases64.length === 0) return;

				setImages(bases64);
				setValue("image", bases64.join(","));
			}
		}
	}

	async function onSubmit(data: IUserPost) {
		if (editPostId == null) return;

		await updatePost(editPostId, {
			...data,
			image: images.join(","),
		});
		closeEditModal();
	}

	return (
		<View>
			<ModalTool isVisible={isEditVisible} onClose={closeEditModal}>
				<ScrollView style={styles.mainModalWindow}>
					<View style={styles.closeModalButton}>
						<TouchableOpacity onPress={closeEditModal}>
							<ICONS.CloseIcon width={15} height={15} />
						</TouchableOpacity>
					</View>
					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontSize: 24,
						}}
					>
						Редагувати публікацію
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
								render={({ field, fieldState }) => (
									<Input
										placeholder="Напишіть тему публікації"
										value={field.value}
										onChangeText={field.onChange}
										autoCorrect={false}
										errorMessage={fieldState.error?.message}
									/>
								)}
							/>
							<Controller
								control={control}
								name="description"
								render={({ field, fieldState }) => (
									<Input
										height={140}
										placeholder="Напишіть опис до публікації"
										value={field.value}
										onChangeText={field.onChange}
										autoCorrect={false}
										multiline={true}
										isTextArea={true}
										errorMessage={fieldState.error?.message}
									/>
								)}
							/>
						</View>

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
							render={({ field, fieldState }) => (
								<Input
									placeholder="Напишіть посилання"
									value={field.value}
									onChangeText={field.onChange}
									autoCorrect={false}
									errorMessage={fieldState.error?.message}
								/>
							)}
						/>
					</View>

					{images.length > 0 && (
						<View
							style={{
								flexDirection: "row",
								flexWrap: "wrap",
								gap: 16,
								marginVertical: 15,
							}}
						>
							{images.map((uri, index) => (
								<View
									key={index}
									style={{
										position: "relative",
										alignItems: "flex-end",
									}}
								>
									<Image
										source={{
											uri:
												"data:image/jpeg;base64," + uri,
										}}
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
										<ICONS.TrashCanIcon
											width={20}
											height={20}
											color={"#543C52"}
										/>
									</TouchableOpacity>
								</View>
							))}
						</View>
					)}

					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-end",
							gap: 10,
							width: 343,
							height: 40,
							marginTop: images.length >= 2 ? 0 : 20,
							marginBottom: 40,
						}}
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
									Редагувати
								</Text>
								<ICONS.SendPostIcon width={16} height={18} />
							</View>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</ModalTool>
		</View>
	);
}
