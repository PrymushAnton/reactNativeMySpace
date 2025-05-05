import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import { IInputProps } from "./input.types";
import { styles } from "./input.styles";
import { ICONS } from "../icons";
import { useState } from "react";

function Input(props: IInputProps) {
	const { label, iconLeft, iconRight, errorMessage, ...otherProps } = props;

	return (
		<View>
			{label && <Text style={styles.label}>{label}</Text>}
			<View style={styles.inputBox}>
				{iconLeft && <View style={{ marginRight: 2 }}>{iconLeft}</View>}
				<TextInput
					style={styles.input}
					autoFocus={false}
					placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
					{...otherProps}
				/>
				{iconRight && (
					<View style={{ marginLeft: "auto" }}>{iconRight}</View>
				)}
			</View>
			{errorMessage && (
				<View style={styles.errorBox}>
					<ICONS.ErrorIcon width={16} height={16} />
					<Text style={styles.errorMessage}>{errorMessage}</Text>
				</View>
			)}
		</View>
	);
}

function Password(props: Omit<IInputProps, "iconLeft" | "iconRight">) {
	const { label, errorMessage, ...otherProps } = props;
	const [isHidden, setIsHidden] = useState(true);

	return (
		<View>
			{label && <Text style={styles.label}>{label}</Text>}
			<View style={styles.inputBox}>
				<View style={{ marginRight: 2 }}>
					<ICONS.PasswordIcon width={30} height={30} />
				</View>
				<TextInput
					secureTextEntry={isHidden}
					style={styles.input}
					placeholderTextColor={"white"}
					{...otherProps}
				/>
				<View style={{ marginLeft: "auto" }}>
					<TouchableWithoutFeedback
						onPress={() => {
							setIsHidden(!isHidden);
						}}
					>
						{isHidden ? (
							<ICONS.EyeCrossedIcon width={30} height={30} />
						) : (
							<ICONS.EyeIcon width={30} height={30} />
						)}
					</TouchableWithoutFeedback>
				</View>
			</View>
			{errorMessage && (
				<View style={styles.errorBox}>
					<ICONS.ErrorIcon width={16} height={16} />
					<Text style={styles.errorMessage}>{errorMessage}</Text>
				</View>
			)}
		</View>
	);
}

Input.Password = Password;

export { Input };
