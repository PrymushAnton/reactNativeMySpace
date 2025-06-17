import { View, Image, Text, TouchableOpacity } from "react-native";
import { IContactCard } from "../../types/chat-info";
import { styles } from "./card.styles";
import { useRouter } from "expo-router";
import { ICONS } from "../../../../shared/ui/icons";

const router = useRouter();

function Card({ image, name, surname }: IContactCard) {
	return (
		<TouchableOpacity style={styles.card1}>
			<Image source={{ uri: image }} style={styles.contactImage}></Image>
			<Text style={styles.contactName}>
				{name} {surname}
			</Text>
		</TouchableOpacity>
	);
}

function Contact({ image, name, surname }: IContactCard) {
	return (
		<TouchableOpacity style={styles.card1}>
			<Image source={{ uri: image }} style={styles.contactImage}></Image>
			<Text style={styles.contactName}>
				{name} {surname}
			</Text>
		</TouchableOpacity>
	);
}

function Message({ image, name, surname, text, date }: IContactCard) {
	return (
		<TouchableOpacity
			style={styles.card2}
			onPress={() => {
				router.replace("personal-chat");
			}}
		>
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
					{/* тут треба дата, хз як її зробити */}
					<Text>9:41</Text>
				</View>
				<Text>{text}</Text>
			</View>
		</TouchableOpacity>
	);
}

function Group({ image, name, surname, text, date }: IContactCard) {
	return (
		<TouchableOpacity
			style={styles.card2}
			onPress={() => {
				router.replace("group-chat");
			}}
		>
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
					{/* тут треба дата, хз як її зробити */}
					<Text>9:41</Text>
				</View>
				<Text>{text}</Text>
			</View>
		</TouchableOpacity>
	);
}

function GroupAdd({ image, name, surname }: IContactCard) {
	return (
		<View style={styles.card3}>
			<View style={styles.groupAddInfo}>
				<Image
					source={{ uri: image }}
					style={styles.contactImage}
				></Image>
				<Text style={styles.contactName}>
					{name} {surname}
				</Text>
			</View>
			<TouchableOpacity>
				<ICONS.UncheckedCheckbox
					width={20}
					height={20}
				></ICONS.UncheckedCheckbox>
			</TouchableOpacity>
		</View>
	);
}

function GroupDelete({ image, name, surname }: IContactCard) {
	return (
		<View style={styles.card3}>
			<View style={styles.groupAddInfo}>
				<Image
					source={{ uri: image }}
					style={styles.contactImage}
				></Image>
				<Text style={styles.contactName}>
					{name} {surname}
				</Text>
			</View>
			<TouchableOpacity>
				<ICONS.TrashCanIcon width={20} height={20}></ICONS.TrashCanIcon>
			</TouchableOpacity>
		</View>
	);
}

Card.Contact = Contact;
Card.Message = Message;
Card.Group = Group;
Card.GroupAdd = GroupAdd;
Card.GroupDelete = GroupDelete;

export { Card };
