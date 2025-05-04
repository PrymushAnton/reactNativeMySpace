import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ReactNode } from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, View } from "react-native";

export function Providers({children}: {children: ReactNode}) {
    return (
        <SafeAreaProvider>
            <StatusBar style="auto"/>
            <SafeAreaView style={{flex: 1, backgroundColor: "#141414"}}>
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}