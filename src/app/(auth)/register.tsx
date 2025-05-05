import { RegisterForm } from "../../modules/auth/ui";
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Register() {
    return (
        <View style={{flex: 1}}>
            <RegisterForm />
        </View>
    );
}