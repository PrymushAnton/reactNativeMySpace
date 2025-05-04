import { LoginForm } from "../../modules/auth/ui";
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Login() {
	return (
		<View style={{flex: 1}}>
			<LoginForm />
			<View style={{flex: 0.4, alignItems: "center", justifyContent: "flex-start"}}>
				<Text style={{color: "white"}}>
					Ще не маєте акаунту?
				</Text>
				<Link href={"/register/step-one"} style={{color: "white", textDecorationLine: "underline"}}>
					Зареєструватись
				</Link>
			</View>
			
		</View>
	);
}