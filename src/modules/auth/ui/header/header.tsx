import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { ICONS } from "../../../../shared/ui/icons";
import { View, StyleSheet } from "react-native";

export function HeaderAuth(props: NativeStackHeaderProps) {

    return (
        <View style={styles.header}>
            <ICONS.LogoIcon width={145} height={18} />
        </View>       
    )
}

const styles = StyleSheet.create({
    header: {
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    }
});
