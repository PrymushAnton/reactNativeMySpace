import { View, Text } from "react-native";
import { IContactCard } from "../../types/chat-info";
import { ICONS } from "../../../../shared/ui/icons";
import { styles } from "./my-message.styles";

export function MyMessage({ text, date, wasWatched }: IContactCard) {
	return (
		<View style={styles.container}>
			<Text style={styles.messageText}>{text}</Text>
			<View>
				<Text>9:41</Text>
				{wasWatched ? (
					<ICONS.WatchedIcon></ICONS.WatchedIcon>
				) : (
					<ICONS.NotWatchedIcon></ICONS.NotWatchedIcon>
				)}
			</View>
		</View>
	);
}
