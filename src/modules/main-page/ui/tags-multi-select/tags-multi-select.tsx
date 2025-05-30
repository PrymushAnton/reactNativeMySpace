import { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { ICONS } from "../../../../shared/ui/icons";

type Tag = {
	id: string;
	name: string;
};

type Props = {
	selectedTags: string[];
	onChange: (value: string[]) => void;
};

export function TagsMultiSelect({ selectedTags, onChange }: Props) {
	const BASE_URL = "192.168.1.10:3011";

	const [tags, setTags] = useState<Tag[]>([]);
	const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
	const [inputVisible, setInputVisible] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [tempSelected, setTempSelected] = useState<string[]>([]);

	useEffect(() => {
		const fetchTags = async () => {
			try {
				const response = await fetch(
					`http://${BASE_URL}/post/find-all-tags`
				);
				if (!response.ok)
					throw new Error(`HTTP error! status: ${response.status}`);

				const json = await response.json();
				const formattedTags: Tag[] = json.data.map((tag: any) => ({
					id: String(tag.id),
					name: tag.name,
				}));

				setTags(formattedTags);
				setFilteredTags(formattedTags);
			} catch (error) {
				console.error("Помилка при завантаженні тегів:", error);
			}
		};

		fetchTags();
	}, []);

	useEffect(() => {
		setFilteredTags(
			tags.filter((tag) =>
				tag.name.toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
	}, [searchTerm, tags]);

	const handleSelect = (id: string) => {
		setTempSelected((prev) =>
			prev.includes(id)
				? prev.filter((tagId) => tagId !== id)
				: [...prev, id]
		);
	};

	const handleConfirm = () => {
		onChange(tempSelected);
		setInputVisible(false);
	};

	const handleRemove = (id: string) => {
		onChange(selectedTags.filter((tagId) => tagId !== id));
		setTempSelected((prev) => prev.filter((tagId) => tagId !== id));
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			<View style={{ marginBottom: 10, position: "relative" }}>
				<TouchableOpacity
					onPress={() => {
						setTempSelected(selectedTags);
						setInputVisible((prev) => !prev);
					}}
					style={{
						borderColor: "#D1D5DB",
						borderWidth: 1,
						borderRadius: 12,
						paddingVertical: 10,
						paddingHorizontal: 14,
						backgroundColor: "#fff",
					}}
				>
					<Text style={{ color: "#9A9A9A", fontSize: 16 }}>
						Оберіть теги
					</Text>
				</TouchableOpacity>

				{inputVisible && (
					<View
						style={{
							position: "absolute",
							top: 50, 
							left: 0,
							right: 0,
							borderRadius: 12,
							backgroundColor: "#fff",
							borderColor: "#D1D5DB",
							borderWidth: 1,
							maxHeight: 250,
							overflow: "hidden",
							zIndex: 9999, 
							elevation: 10, // для дроида
						}}
					>
						<TextInput
							value={searchTerm}
							onChangeText={setSearchTerm}
							placeholder="Пошук"
							style={{
								height: 40,
								borderBottomWidth: 1,
								borderColor: "#ccc",
								margin: 10,
								paddingHorizontal: 10,
								borderRadius: 10,
								backgroundColor: "#fff",
							}}
						/>

						<ScrollView
							showsVerticalScrollIndicator={true}
							style={{ maxHeight: 150, paddingHorizontal: 10 }}
							keyboardShouldPersistTaps="handled"
							nestedScrollEnabled={true}
						>
							{filteredTags.map((tag) => (
								<TouchableOpacity
									key={tag.id}
									onPress={() => handleSelect(tag.id)}
									style={{
										padding: 10,
										marginBottom: 6,
										borderRadius: 8,
										backgroundColor: tempSelected.includes(
											tag.id
										)
											? "#E4E4E4"
											: "#F5F5F5",
									}}
								>
									<Text style={{ color: "#070A1C" }}>
										{tag.name}
									</Text>
								</TouchableOpacity>
							))}
						</ScrollView>

						<TouchableOpacity
							onPress={handleConfirm}
							style={{
								backgroundColor: "#543C52",
								padding: 12,
								borderTopWidth: 1,
								borderTopColor: "#D1D5DB",
							}}
						>
							<Text
								style={{ color: "#fff", textAlign: "center" }}
							>
								Підтвердити
							</Text>
						</TouchableOpacity>
					</View>
				)}

				<View
					style={{
						flexDirection: "row",
						flexWrap: "wrap",
						marginTop: 10,
					}}
				>
					{selectedTags.map((tagId) => {
						const tag = tags.find((t) => t.id === tagId);
						if (!tag) return null;
						return (
							<View
								key={tag.id}
								style={{
									flexDirection: "row",
									alignItems: "center",
									borderColor: "#CDCED2",
									borderWidth: 1,
									borderRadius: 50,
									paddingVertical: 4,
									paddingHorizontal: 10,
									marginRight: 8,
									marginBottom: 8,
									backgroundColor: "#fff",
								}}
							>
								<Text
									style={{
										marginRight: 6,
										fontSize: 14,
										color: "#000",
									}}
								>
									{tag.name}
								</Text>
								<TouchableOpacity
									onPress={() => handleRemove(tag.id)}
									style={{
										backgroundColor: "#CDCED2",
										borderRadius: 999,
										padding: 4,
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<ICONS.CloseIcon
										color={"#000"}
										width={10}
										height={10}
									/>
								</TouchableOpacity>
							</View>
						);
					})}
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}
