import { View,Text } from "react-native";
import { HeaderNavigationSettingsPages } from "../header-navigation-settings-pages"

export function AlbumsSettingsPage(){
    return(
        <View>
            <HeaderNavigationSettingsPages/>
            <Text>Це сторінка альбомів?</Text>
        </View>
    )
}