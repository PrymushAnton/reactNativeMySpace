import { TouchableOpacity, View, Text } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { styles } from "./header-navigation-friends-page.styles";

export function HeaderNavigationFriendPages() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <View>
            <View style={styles.personalInfoSettingsTop}>
                <TouchableOpacity
                    style={styles.personalInfoSettingsTopEl}
                    onPress={() => router.replace("/friend-request")}
                >
                    <Text
                        style={{
                            fontFamily: "GTWalsheimPro-Regular",
                            fontWeight: pathname === "/friend-request" ? "700" : "400",
                            borderBottomWidth: pathname === "/friend-request" ? 2 : 0,
                        }}
                    >
                        Запити
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.personalInfoSettingsTopEl}
                    onPress={() => router.replace("/friend-recommendation")}
                >
                    <Text
                        style={{
                            fontFamily: "GTWalsheimPro-Regular",
                            fontWeight: pathname === "/friend-recommendation" ? "700" : "400",
                            borderBottomWidth: pathname === "/friend-recommendation" ? 2 : 0,
                        }}
                    >
                        Рекомендації
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
