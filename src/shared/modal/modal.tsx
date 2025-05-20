import { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import Modal from "react-native-modal";

type ModalToolProps = {
	children?: ReactNode;
	isVisible: boolean;
	onClose: () => void;
};

// чтобы юзать, нужно создавать новое состояние для isVisible в каждом файле, иначе будут вызываться сразу несколько модалок
// потом решу(возможно)

export function ModalTool({ children, isVisible, onClose }: ModalToolProps) {
	return (
		<Modal
			isVisible={isVisible}
			onBackdropPress={onClose}
			backdropTransitionOutTiming={1}
			hideModalContentWhileAnimating={true}
			useNativeDriver={true}
		>
			<View>{children}</View>
		</Modal>
	);
}
