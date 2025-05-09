import { Stack } from "expo-router";
import { Providers } from "./Providers";

export default function RootLayout() {
	return (
		<Providers>
			<Stack screenOptions={{headerShown: false, contentStyle: {backgroundColor: "#141414"}}}>
				
			</Stack>
			
		</Providers>
	);
}