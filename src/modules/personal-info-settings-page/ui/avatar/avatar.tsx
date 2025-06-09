import { View, Image, TouchableOpacity } from "react-native";
import { ICONS } from "../../../../shared/ui/icons";
import { IAvatarProps } from "./avatar.types";
import { styles } from "./avatar.styles";
import { pickImage } from "../../../../shared/tools";
import { useState } from "react";
import { useAuthContext } from "../../../auth/context";

export function Avatar({ image }: IAvatarProps) {
    
    const [avatar, setAvatar] = useState(image);
    const {token, getData, login} = useAuthContext()

	function onPress() {
		async function func() {
			const image = await pickImage({
				allowsMultipleSelection: false,
				base64: true,
			});
            if (!image) return
            if (!image[0].base64) return
            setAvatar(image[0].base64)

            try {
                console.log('Sending request...')
				const res = await fetch(
					"http://192.168.3.11:3011/user/update",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ image: avatar }),
					}
				);
                if (!token) return
                getData(token)
            } catch (error) {
				console.log("Помилка при оновленні:", (error as Error).message);
			}
		}
        func()
	}


	return (
		<View style={styles.avatar}>
			<View style={styles.view}>
				{avatar ? (
					<Image
						style={{ height: 150, width: 150, borderRadius: 150 }}
						source={{ uri: "data:image/jpeg;base64," + avatar }}
					/>
				) : (
					<ICONS.AnonymousLogoIcon width={160} height={160} />
				)}
				<TouchableOpacity style={styles.buttonPlus} onPress={() => {onPress()}}>
					<ICONS.PlusAvatarIcon width={35} height={35} />
				</TouchableOpacity>
			</View>
		</View>
	);
}
