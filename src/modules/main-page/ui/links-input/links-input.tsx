import { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { styles } from "./links-input.styles";
import { ICONS } from "../../../../shared/ui/icons";
import { ModalStatusMessage } from "../../../../shared/ui/modal-status-message";

interface Props {
	value: string[];
	onChange: (links: string[]) => void;
}

export function LinksInput({ value, onChange }: Props) {
	const [link, setLink] = useState("");

	const [isLimitVisible, setLimitVisible] = useState(false)

	const handleAddLink = () => {
		if (!link.trim()) return;

		if (value.length >= 10) {
			setLimitVisible(true)
			return;
		}

		if (value.includes(link.trim())) return;

		onChange([...value, link.trim()]);
		setLink("");
	};

	const handleRemoveLink = (index: number) => {
		const updated = value.filter((_, i) => i !== index);
		onChange(updated);
	};

	function truncateText(text: string, maxLength: number = 15) {
		return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
	}

	return (
		<View>
			<ModalStatusMessage isVisible={isLimitVisible} setIsVisible={setLimitVisible} status="Обмеження!" message="Можна додати не більше 10 посилань"/>
			<View style={styles.inputRow}>
				<TextInput
					placeholder="Введіть посилання"
					value={link}
					onChangeText={setLink}
					style={styles.input}
					placeholderTextColor="#81818D"
				/>
				<TouchableOpacity style={styles.addButton} onPress={handleAddLink}>
					<Text style={{ color: "#fff", fontSize: 18 }}>+</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.linksView}>
				{value.map((link, index) => (
					<View key={index} style={styles.linkTag}>
						<Text numberOfLines={1} style={styles.linkText}>
							{truncateText(link)}
						</Text>
						<TouchableOpacity
							onPress={() => handleRemoveLink(index)}
							style={{ marginLeft: 13 }}
						>
							<View style={styles.closeIconView}>
								<ICONS.CloseIcon color={"#FFFFFF"} width={10} height={10} />
							</View>
						</TouchableOpacity>
					</View>
				))}
			</View>
		</View>
	);
}
