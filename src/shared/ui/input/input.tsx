import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import { IInputProps } from "./input.types";
import { styles } from "./input.styles";
import { ICONS } from "../icons";
import { useEffect, useRef, useState } from "react";

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

function Code(props: Omit<IInputProps, "iconLeft" | "iconRight">) {
	const { label, errorMessage, onChangeText } = props;

	const [numbers, setNumbers] = useState(["", "", "", "", "", ""]);
	const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
	const inputsRef = useRef<Array<TextInput | null>>([]);

	useEffect(() => {
		onChangeText?.(numbers.join(""));
	}, [numbers]);

	const handleChange = (text: string, index: number) => {
		if (!/^\d?$/.test(text)) return;

		const updated = [...numbers];
		updated[index] = text;
		setNumbers(updated);

		if (text && index < 5) {
			inputsRef.current[index + 1]?.focus();
		}
	};

	const handleKeyPress = (event: any, index: number) => {
		if (
			event.nativeEvent.key === "Backspace" &&
			numbers[index] === "" &&
			index > 0
		) {
			inputsRef.current[index - 1]?.focus();
		}
	};

	return (
		<View>
			{label && <Text style={styles.labelEmailCode}>{label}</Text>}
			<View style={styles.codeContainer}>
				{numbers.map((number, index) => (
					<View key={index} style={styles.inputEmailCodeBox}>
						<TextInput
							ref={(ref) => {
								inputsRef.current[index] = ref;
							}}
							style={styles.inputEmailCode}
							value={number}
							maxLength={1}
							keyboardType="number-pad"
							onChangeText={(text) => handleChange(text, index)}
							onKeyPress={(event) => handleKeyPress(event, index)}
							onFocus={() => setFocusedIndex(index)}
							onBlur={() => setFocusedIndex(null)}
						/>
						{!number && focusedIndex !== index && (
							<View style={styles.underlineContainer}>
								<View style={styles.underline} />
							</View>
						)}
					</View>
				))}
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
Input.Code = Code;

export { Input };
