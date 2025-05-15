import { ReactNode } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";

type ModalToolProps = {
	children?: ReactNode;
	isVisible: boolean;
	onClose: () => void;
};

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
