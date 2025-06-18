import { Modal, TouchableOpacity, View, Text } from "react-native";
import { ICONS } from "../../../../../../shared/ui/icons";
import { styles } from "./admin-modal.styles";

export function AdminModal({
	visible,
	onNext,
	onClose,
}: {
	visible: boolean;
	onNext: () => void;
	onClose: () => void;
}) {
	return (
		<Modal visible={visible} transparent={true}>
			<View style={styles.container}>
				<TouchableOpacity
					onPress={onClose}
					style={{ alignSelf: "flex-end" }}
				>
					<ICONS.DotsIcon width={20} height={20} />
				</TouchableOpacity>
				<TouchableOpacity style={{ flexDirection: "row", gap: 10 }}>
					<ICONS.ImageIcon width={20} height={20}></ICONS.ImageIcon>
					<Text>Медіа</Text>
				</TouchableOpacity>
				<TouchableOpacity style={{ flexDirection: "row", gap: 10 }}  onPress={onNext}>
					<ICONS.PencilIcon width={20} height={20}></ICONS.PencilIcon>
					<Text>Редагувати групу</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						borderTopWidth: 1,
						borderColor: "#CDCED2",
						paddingTop: 16,
						flexDirection: "row",
						gap: 10,
					}}
				>
					<ICONS.TrashCanIcon
						width={20}
						height={20}
					></ICONS.TrashCanIcon>
					<Text>Видалити чат</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
}
