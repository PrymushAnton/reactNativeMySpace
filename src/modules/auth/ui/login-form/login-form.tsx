import { Button } from "../../../../shared/ui/button";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Input } from "../../../../shared/ui/input";
import { ICONS } from "../../../../shared/ui/icons";
import { ILogin } from "../../types";
import { Controller, useForm } from "react-hook-form";
import { styles } from "./login-form.styles";
import { useEffect, useState } from "react";

export function LoginForm() {

    const [isEmail, setIsEmail] = useState<boolean>(true)

	const { handleSubmit, control, setValue } = useForm<ILogin>({
		defaultValues: { email: "", password: "" },
	});

    useEffect(() => {
        setValue("password", "")
        isEmail ? setValue("email", "") : setValue("phoneNumber", "")
    }, [isEmail])

	function onSubmit(data: ILogin) {
		console.log(data);
	}

	return (
		<View style={styles.container}>
			<Text
				style={{
					fontSize: 36,
					textAlign: "center",
                    color: "white"
				}}
			>
				Авторизація
			</Text>

			<View style={styles.form}>

                <View style={styles.inputContainer}>
                    <Controller
                        
                        control={control}
                        name={isEmail ? "email" : "phoneNumber"}
                        rules={{
                            required: {
                                value: true,
                                message: "Це поле обов'язкове",
                            },
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <Input
                                    label={isEmail ? "Пошта" : "Номер телефона"}
                                    onChange={field.onChange}
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    autoCorrect={false}
                                    errorMessage={fieldState.error?.message}
                                    iconLeft={
                                        isEmail ? (
                                            <ICONS.EmailIcon width={30} height={30} />
                                        ) : (
                                            <ICONS.PhoneNumberIcon width={30} height={30} />
                                        )
                                        
                                    }
                                />
                            );
                        }}
                    />
                    <Text style={{color: "white"}}>Авторизуватись за&nbsp;
                        <TouchableWithoutFeedback onPress={() => {setIsEmail(!isEmail)}}>
                            <Text style={{textDecorationLine: "underline", color: "white"}}>
                                {isEmail ? "номером телефону" : "поштою"}
                            </Text>
                        </TouchableWithoutFeedback>
                    </Text>
                </View>
				

                <Controller
					control={control}
					name="email"
					rules={{
						required: {
							value: true,
							message: "Це обов'язкове поле",
						},
					}}
					render={({ field, fieldState }) => {
						return (
                            <Input.Password
                                label="Пароль"
                                onChange={field.onChange}
								onChangeText={field.onChange}
								value={field.value}
								autoCorrect={false}
								errorMessage={fieldState.error?.message}
                            />
						);
					}}
				></Controller>
				
			</View>
            
            <View style={styles.buttonBlock}>
			    <Button text="Авторизуватись" onPress={handleSubmit(onSubmit)}/>
            </View>
		</View>
	);
}
