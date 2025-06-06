import { Stack } from "expo-router";
import { Providers } from "./Providers";
import { Header } from "../shared/Header/Header";

export default function RootLayout() {
	return (
		<Providers>
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: "#E9E5EE" },
					// header: (props) => <Header {...props} />,
				}}
			>
			</Stack>
		</Providers>
	);
}
