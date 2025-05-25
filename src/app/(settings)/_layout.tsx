import { Stack } from "expo-router";
import { Header } from "../../shared/Header/Header";


export default function RootLayout() {
    return (
        <Stack screenOptions={{
            headerShown: true,
            contentStyle: { backgroundColor: "#E9E5EE" },
            header: () => <Header isOnSettings={true} />,
        }}>

        </Stack>
                
    );
}