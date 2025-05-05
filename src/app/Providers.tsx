import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ReactNode } from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, View } from "react-native";
import { AuthContextProvider } from "../modules/auth/context";

export function Providers({children}: {children: ReactNode}) {
    return (
        <SafeAreaProvider>
            <AuthContextProvider>
                <StatusBar style="auto"/>
                <SafeAreaView style={{flex: 1, backgroundColor: "#141414"}}>
                    {children}
                </SafeAreaView>
            </AuthContextProvider>
            
        </SafeAreaProvider>
    )
}