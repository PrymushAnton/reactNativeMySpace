import { View, Text } from "react-native";
import { Input } from "../../../../shared/ui/input";
import { ICONS } from "../../../../shared/ui/icons";
import { Button } from "../../../../shared/ui/button";
import { useForm, Controller } from "react-hook-form";
import { IRegisterStepTwo } from "../../types";
import { styles } from "./register-step-two.styles";
import { Link, useLocalSearchParams, useRouter } from "expo-router";

export function RegisterStepTwo() {
    const router = useRouter();

    const params = useLocalSearchParams<{
        email: string
        phoneNumber: string
        password: string
        confirmPassword: string
    }>();

    const { handleSubmit, control } = useForm<IRegisterStepTwo>({
        defaultValues: {
            name: "",
            surname: "",
            date: "",
            username: "",
        },
    });
    function onSubmit(data: IRegisterStepTwo) {
        // const {confirmPassword, ...otherData} = data
        // router.navigate({pathname: "/register/step-two", params: otherData});
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
                Реєстрація
            </Text>

            <View style={styles.form}>
                <Controller
                    control={control}
                    name="name"
                    rules={{
                        required: {
                            value: true,
                            message: "Це поле обов'язкове",
                        },
                    }}
                    render={({ field, fieldState }) => {
                        return (
                            <Input
                                iconLeft={
                                    <ICONS.UserIcon width={30} height={30} />
                                }
                                onChange={field.onChange}
                                onChangeText={field.onChange}
                                value={field.value}
                                label="Ім'я"
                                autoCorrect={false}
                                errorMessage={fieldState.error?.message}
                            />
                        );
                    }}
                />
                <Controller
                    control={control}
                    name="surname"
                    rules={{
                        required: {
                            value: true,
                            message: "Це поле обов'язкове",
                        },
                    }}
                    render={({ field, fieldState }) => {
                        return (
                            <Input
                                iconLeft={
                                    <ICONS.PhoneNumberIcon width={30} height={30} />
                                }
                                onChange={field.onChange}
                                onChangeText={field.onChange}
                                value={field.value}
                                label="Прізвище"
                                autoCorrect={false}
                                errorMessage={fieldState.error?.message}
                            />
                        );
                    }}
                />
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Це поле обов'язкове",
                        },
                    }}
                    name="date"
                    render={({ field, fieldState }) => {
                        return (
                            <Input
                                onChange={field.onChange}
                                onChangeText={field.onChange}
                                value={field.value}
                                label="Дата народження"
                                autoCorrect={false}
                                errorMessage={fieldState.error?.message}
                                iconLeft={<ICONS.DateIcon width={30} height={30}/>}
                            />
                        );
                    }}
                />
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Це поле обов'язкове",
                        },
                    }}
                    name="username"
                    render={({ field, fieldState }) => {
                        return (
                            <Input
                                onChange={field.onChange}
                                onChangeText={field.onChange}
                                value={field.value}
                                label="Нікнейм"
                                autoCorrect={false}
                                errorMessage={fieldState.error?.message}
                                iconLeft={<ICONS.NicknameIcon width={30} height={30}/>}
                            />
                        );
                    }}
                />
            </View>
            <View style={styles.buttonBlock}>
                <Button text="Зареєструватись" onPress={handleSubmit(onSubmit)} />
                <View>
                    <Text style={{color: "white"}}>
                        Вже маєте акаунт?{" "} 
                        <Link href={"/login"} style={{color: "white", textDecorationLine: "underline"}}>
                            Увійти
                        </Link>
                    </Text>
			    </View>
            </View>
        </View>
    );
}