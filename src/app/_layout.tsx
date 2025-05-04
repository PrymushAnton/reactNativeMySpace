import { Stack } from "expo-router";
import { Providers } from "./Providers";
import { View } from "react-native";

export default function RootLayout() {
	return (
		<Providers>
			<Stack screenOptions={{ headerShown: false}}>
				<Stack.Screen name="index"/>
			</Stack>
			
		</Providers>
	);
}