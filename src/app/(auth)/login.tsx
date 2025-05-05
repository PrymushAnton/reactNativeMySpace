import { LoginForm } from "../../modules/auth/ui";
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Login() {
	return (
		<View style={{flex: 1}}>
			<LoginForm />			
		</View>
	);
}