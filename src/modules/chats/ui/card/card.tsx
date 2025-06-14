import { View, Image, Text } from "react-native";
import { IContactCard } from "../../types/chat-info";
import { styles } from "./card.styles";

function Card({ image, name, surname }: IContactCard) {
	return (
		<View style={styles.card1}>
			<Image source={{ uri: image }} style={styles.contactImage}></Image>
			<Text style={styles.contactName}>
				{name} {surname}
			</Text>
		</View>
	);
}

function Contact({ image, name, surname }: IContactCard) {
	return (
		<View style={styles.card1}>
			<Image source={{ uri: image }} style={styles.contactImage}></Image>
			<Text style={styles.contactName}>
				{name} {surname}
			</Text>
		</View>
	);
}

function Message({ image, name, surname, text, date }: IContactCard) {
	return (
		<View style={styles.card2}>
			<Image source={{ uri: image }} style={styles.contactImage}></Image>
			<View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						width: "85%",
					}}
				>
					<Text style={styles.contactName}>
						{name} {surname}
					</Text>
					<Text>9:41</Text>
				</View>
				<Text>{text}</Text>
			</View>
		</View>
	);
}

Card.Contact = Contact;
Card.Message = Message;

export { Card };
