import { Stack } from "expo-router";
import { Providers } from "./Providers";

export default function RootLayout() {
	return (
		<Providers>
			<Stack screenOptions={{headerShown: false, contentStyle: {backgroundColor: "#E9E5EE"}}}>
				
			</Stack>
			
		</Providers>
	);
}