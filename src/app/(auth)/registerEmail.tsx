import { RegisterEmailForm } from "../../modules/auth/ui";
import { Text, View } from "react-native";

export default function Register() {
    return (
        <View style={{flex: 1}}>
            <RegisterEmailForm />
        </View>
    );
}