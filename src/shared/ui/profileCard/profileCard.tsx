import { View, Text, TextInput } from "react-native";
import { IProfileCardProps } from "./profileCard.types";
import { styles } from "./profileCard.styles";

export function ProfileCard(props: IProfileCardProps) {
	const { onChangeText, placeholder, bottomText, editable, type, value, errorMessage } =
		props;


	return (
		<View style={styles.card}>
			<TextInput
				keyboardType={type === "tel" ? "phone-pad": "default"}
				style={styles.input}
				editable={editable}
				placeholder={placeholder}
				// defaultValue={defaultValue}
				value={value}
				onChangeText={onChangeText}
				// placeholderTextColor={"black"}
			/>
			<View>
				<Text style={styles.bottomText}>{bottomText}</Text>
				<Text style={styles.bottomText}>{errorMessage}</Text>
			</View>
		</View>
	);
}
