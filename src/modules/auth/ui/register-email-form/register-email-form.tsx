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
import { Link } from "expo-router";
import { useEffect, useState } from "react";

export function RegisterEmailForm() {
	const schema = yup.object().shape({
		email: yup.string().required(),
		code: yup.string().required(),
	});

	const { handleSubmit, control, setValue, setError } = useForm<IEmailCode>({
		resolver: yupResolver(schema),
		defaultValues: {
			email: "",
			code: "",
		},
	});

	const [globalError, setGlobalError] = useState<string>("");
	const { registerEmail } = useAuthContext();

	function onSubmit(data: IEmailCode) {
		async function request() {
			const response = await registerEmail(data.email, Number(data.code));
			if (typeof response === "string") {
				setGlobalError(response);
				// } else {
				// 	response.forEach((obj) => {
				// 		setError(obj.path as keyof IEmailCode, {
				// 			message: obj.message,
				// 		});
				// 	});
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
					render={({ field, fieldState }) => (
						<Input
							label="Код з пошти"
							keyboardType="numeric"
							onChange={(text) => field.onChange(text)}
							// value={field.value.toString()}
							autoCorrect={false}
							errorMessage={fieldState.error?.message}
							iconLeft={
								<ICONS.EmailIcon width={30} height={30} />
							}
						/>
					)}
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
