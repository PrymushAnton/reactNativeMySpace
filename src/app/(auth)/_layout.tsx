import { Stack } from "expo-router";
import { HeaderAuth } from "../../modules/auth/ui/header";

export default function RootLayout() {
    return (
        <Stack screenOptions={{
            headerShown: true,
            contentStyle: { backgroundColor: "#E9E5EE" },
            header: (props) => <HeaderAuth {...props} />,
        }}>

        </Stack>
                
    );
}