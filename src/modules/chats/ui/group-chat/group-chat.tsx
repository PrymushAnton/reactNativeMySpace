import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { ICONS } from "../../../../shared/ui/icons";
import { styles } from "./group-chat.styles";
import { MyMessage } from "../my-message/my-message";

export function GroupChatPage() {
	return (
		<View style={styles.container}>
			<View>
				<TouchableOpacity>
					<ICONS.ReturnIcon width={15} height={15}></ICONS.ReturnIcon>
				</TouchableOpacity>
				{/* <Image></Image> */}
				<View>
					<Text>New Group</Text>
					<Text>3 учасники, 1 в мережі</Text>
				</View> 
			</View>
			<ScrollView>
				<MyMessage
					text="dsafdasfdasf"
					date={new Date()}
					wasWatched={true}
				></MyMessage>
			</ScrollView>
		</View>
	);
}
