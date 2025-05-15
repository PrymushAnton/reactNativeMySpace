import { Header } from "../../../../shared/Header/Header";
import { Footer } from "../../../../shared/Footer/Footer";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Post } from "../post/Post";
import { useModal } from "../../../../modules/auth/context";
import { ICONS } from "../../../../shared/ui/icons";
import { useState } from "react";
import { ModalTool } from "../../../../shared/modal";
import { styles } from "./main-page.styles";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUserPost } from "../../../../modules/auth/types";
import { Input } from "../../../../shared/ui/input";
import MultiSelect from "react-native-multiple-select";

const defaultTags = [
	{ id: "1", name: "Відпочинок" },
	{ id: "2", name: "Натхнення" },
	{ id: "3", name: "Життя" },
	{ id: "4", name: "Природа" },
	{ id: "5", name: "Читання" },
	{ id: "6", name: "Спокій" },
	{ id: "7", name: "Гармонія" },
	{ id: "8", name: "Музика" },
	{ id: "9", name: "Фільми" },
	{ id: "10", name: "Подорожі" },
];

export function MainPage() {
	const { isVisible, closeModal } = useModal();

	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	const onSelectedItemsChange = (selected: string[]) => {
		setSelectedItems(selected);
	};

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
							<View>
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
							</View>
							<View>
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
								<MultiSelect
									items={defaultTags}
									uniqueKey="id"
									onSelectedItemsChange={
										onSelectedItemsChange
									}
									selectedItems={selectedItems}
									selectText="Оберіть теги"
									searchInputPlaceholderText="Пошук"
									tagRemoveIconColor="#F43F5E"
									tagBorderColor="#CDCED2"
									tagTextColor="#070A1C"
									selectedItemTextColor="#CDCED2"
									selectedItemIconColor="#CDCED2"
									itemTextColor="#070A1C"
									displayKey="name"
									searchInputStyle={{ color: "#CCC" }}
									submitButtonColor="#543C52"
									submitButtonText="Підтвердити"
									styleDropdownMenuSubsection={{
										borderRadius: 8,
										paddingHorizontal: 12,
										paddingVertical: 10,
									}}
									styleDropdownMenu={{
										borderWidth: 1,
										borderRadius: 10,
										borderColor: "#ccc",
										alignItems: "center",
										justifyContent: "center"
									}}
									styleInputGroup={{
										// paddingBottom: 10,
									}}
									styleMainWrapper={{
										// marginTop: 10,
									}}
									styleListContainer={{
										borderWidth: 1,
										borderColor: "#CDCED2",
										borderRadius: 10,
										backgroundColor: "#fff",
										marginTop: 5,
										maxHeight: 250,
									}}
									altFontFamily="GTWalsheimPro-Regular"
									fontFamily="GTWalsheimPro-Regular"
									itemFontFamily="GTWalsheimPro-Regular"
								/>
							</View>
						</View>
					</View>
				</View>
			</ModalTool>
			<View>
				<Post
					name="anton"
					avatar="..../shared/ui/icons/person.png"
					text="Інколи найкращі ідеї народжуються в тиші  Природа, книга і спокій — усе, що потрібно, аби перезавантажитись"
					hashtags={["відпочинок", "натхнення"]}
					photo={[]}
					likes={140}
					views={10}
				></Post>
				<Post
					name="rinat"
					avatar="..../shared/ui/icons/person.png"
					text="Природа, книга і спокій — усе, що потрібно, аби перезавантажитись Інколи найкращі ідеї народжуються в тиші  "
					hashtags={["натхнення"]}
					photo={[]}
					likes={5}
					views={8}
				></Post>
				<Post
					name="ilia"
					avatar="..../shared/ui/icons/person.png"
					text="буває такий настрій: просто лежиш і існуєш  чай в одній руці, телефон в іншій, думки десь у космосі  і знаєте шо? норм"
					hashtags={[]}
					photo={[]}
					likes={4}
					views={10}
				></Post>
				<Post
					name="oleksandr"
					avatar="..../shared/ui/icons/person.png"
					text="чай в одній руці, телефон в іншій, думки десь у космосі  і знаєте шо? норм буває такий настрій: просто лежиш і існуєш "
					hashtags={["вайб"]}
					photo={[]}
					likes={9}
					views={15}
				></Post>
			</View>
			<Footer />
		</View>
	);
}
