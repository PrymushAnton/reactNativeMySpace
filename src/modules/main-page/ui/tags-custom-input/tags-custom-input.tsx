import { useState } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	Alert,
	TextInput,
} from "react-native";
import { styles } from "./tags-custom-input.styles";

export function TagsCustomInput() {
	const [customTag, setCustomTag] = useState("");
	const [customTags, setCustomTags] = useState<string[]>([]);

	const handleAddTag = () => {
		if (!customTag.trim()) return;

		if (customTags.length >= 10) {
			Alert.alert("Обмеження", "Можна додати не більше 10 тегів");
			return;
		}

		if (customTags.includes(customTag.trim())) return;

		setCustomTags((prev) => [...prev, customTag.trim()]);
		setCustomTag("");
	};

	return (
		<View>
			<View style={styles.mainCustomTagsTextInputView}>
				<TextInput
					placeholder="Введіть свій тег"
					value={customTag}
					onChangeText={setCustomTag}
					style={styles.customTagsTextInput}
				/>
				<TouchableOpacity
					onPress={handleAddTag}
					style={styles.buttonAddCustomTag}
				>
					<Text
						style={{
							color: "#fff",
							fontFamily: "GTWalsheimPro-Regular",
						}}
					>
						Додати
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.mainTagsView}>
				{customTags.map((tag, index) => (
					<View key={index} style={styles.mappingTagsView}>
						<Text style={styles.textTags}> {tag} </Text>
						<TouchableOpacity
							onPress={() =>
								setCustomTags((prev) =>
									prev.filter((_, i) => i !== index)
								)
							}
							style={{ marginLeft: 6 }}
						>
							<Text style={{ color: "#F43F5E", fontSize: 16 }}>
								×
							</Text>
						</TouchableOpacity>
					</View>
				))}
			</View>
		</View>
	);
}
