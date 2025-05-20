import { ReactNode } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";

type ModalToolProps = {
	children?: ReactNode;
	isVisible: boolean;
	onClose: () => void;
	position?: { top: number; left: number }; // если передано — модалка будет около кнопки
};

export function ModalTool({ children, isVisible, onClose, position }: ModalToolProps) {
	return (
		<Modal
			isVisible={isVisible}
			onBackdropPress={onClose}
			backdropTransitionOutTiming={1}
			hideModalContentWhileAnimating={true}
			useNativeDriver={true}
			style={{ margin: 0 }}
		>
			{position ? (
				<View
					style={{
						position: "absolute",
						top: position.top,
						left: position.left,
						zIndex: 999,
					}}
				>
					{children}
				</View>
			) : (
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						height: "100%",
						paddingHorizontal: 16,
					}}
				>
					<View
						style={{
							backgroundColor: "white",
							borderRadius: 20,
							overflow: "hidden",
							maxHeight: "90%", // чтобы ScrollView не уходил за экран
							width: "100%",
							alignSelf: "center",
						}}
					>
						{children}
					</View>
				</View>
			)}
		</Modal>
	);
}
