import { View, Text, TextInput } from "react-native";
import { IProfileCardProps } from "./profileCard.types";
import { styles } from "./profileCard.styles";

export function ProfileCard(props: IProfileCardProps) {
	const { onChangeText,placeholder, bottomText, editable, type, value } = props;

	return (
		<View style={styles.card}>

			<TextInput
				style={styles.input}
				editable={editable}
                
				placeholder={placeholder}
                defaultValue={value}
                value={value}
                onChangeText={onChangeText}
				// placeholderTextColor={"black"}
			/>
			<Text style={styles.bottomText}>{bottomText}</Text>
		</View>
	);
}
