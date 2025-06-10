import { View, Text, TouchableOpacity } from "react-native";
import { HeaderNavigationSettingsPages } from "../header-navigation-settings-pages";
import { ICONS } from "../../../../shared/ui/icons";
import { AlbumImage } from "../album-image";
import { styles } from "./albums-settings-page.styles";

export function AlbumsSettingsPage() {
	return (
		<View style = {{width: "100%"}}>
			<HeaderNavigationSettingsPages />
			<View style={styles.container}>
				<View style = {styles.myPhotoTop}>
					<Text>Мої фото</Text>
					<TouchableOpacity style={styles.addPhotoButt}>
						<ICONS.ImageIcon />
						<Text>Додати фото</Text>
					</TouchableOpacity>
				</View>
				<View>
					<AlbumImage />
				</View>
			</View>
		</View>
	);
}
