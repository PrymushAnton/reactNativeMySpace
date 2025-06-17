import { Modal } from "react-native";

export function AdminModal({
	visible,
	onNext,
}: {
	visible: boolean;
	onNext: () => void;
}){
    return(
        <Modal visible={visible} transparent={true}>

        </Modal>
    )
}