import { Button } from "../../../../shared/ui/button";
import { Text, View } from "react-native";
import { Input } from "../../../../shared/ui/input";
import { ICONS } from "../../../../shared/ui/icons";
import { IEmailCode } from "../../types";
import { Controller, useForm } from "react-hook-form";
import { styles } from "./register-email-form.styles";
import { useAuthContext } from "../../context";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";

export function RegisterEmailForm() {

	const params = useLocalSearchParams<{username: string, email: string, password: string}>()

	const schema = yup.object().shape({
		code: yup.string().required(),
	});

	const { handleSubmit, control, setValue, setError } = useForm<IEmailCode>({
		resolver: yupResolver(schema),
		defaultValues: {
			code: "",
		},
	});

	const [globalError, setGlobalError] = useState<string>("");
	const { registerEmail } = useAuthContext();

	function onSubmit(data: IEmailCode) {
		async function request() {
			const response = await registerEmail(params.email, params.username, params.password, Number(data.code));
			if (typeof response === "string") {
				setGlobalError(response);
			}
		}
		request();
	}

	return (
		<View style={styles.container}>
			<Text
				style={{
					fontSize: 36,
					textAlign: "center",
					color: "white",
				}}
			>
				Реєстрація
			</Text>

			<View style={styles.form}>
				<Controller
						control={control}
						name="code"
						render={({ field, fieldState }) => {
							return (
								<Input
									iconLeft={
										<ICONS.EmailIcon width={30} height={30} />
									}
									onChange={field.onChange}
									onChangeText={field.onChange}
									value={field.value}
									label="Код з пошти"
									autoCorrect={false}
									errorMessage={fieldState.error?.message}
								/>
							);
						}}
					/>
			</View>

			{!(globalError === "") && (
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<ICONS.ErrorIcon width={30} height={30} />
					<Text style={{ display: "flex", color: "red" }}>
						{globalError}
					</Text>
				</View>
			)}

			<View style={styles.buttonBlock}>
				<Button
					text="Зареєструватись"
					onPress={handleSubmit(onSubmit)}
				/>
			</View>
		</View>
	);
}
