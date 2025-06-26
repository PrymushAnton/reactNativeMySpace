import { useState } from "react";
import { ModalTool } from "../../modal";
import { View, Text, TouchableOpacity } from "react-native";
import { ICONS } from "../icons";
import { styles } from "./modal-status-message.styles";

interface ModalStatusMessageProps {
	isVisible: boolean;
	setIsVisible: (visible: boolean) => void;
	status: string;
	message: string;
}

export function ModalStatusMessage({
	isVisible,
	setIsVisible,
	status,
	message,
}: ModalStatusMessageProps) {
	return (
		<ModalTool
			isVisible={isVisible}
			onClose={() => setIsVisible(false)}
			animationIn="fadeIn"
			animationOut="fadeOut"
		>
			<View style={styles.mainModalView}>
				<View style={styles.closeModalButton}>
					<TouchableOpacity onPress={() => setIsVisible(false)}>
						<ICONS.CloseIcon width={15} height={15} />
					</TouchableOpacity>
				</View>
				<View>
					<Text style={styles.statusText}>{status}</Text>
				</View>
				<View style={styles.messageView}>
					<Text style={styles.messageText}>{message}</Text>
				</View>
				<View>
					<TouchableOpacity
						style={styles.button}
						onPress={() => setIsVisible(false)}
					>
						<Text
							style={{
								color: "white",
								fontFamily: "GTWalsheimPro-Regular",
								fontSize: 14,
							}}
						>
							Ок
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ModalTool>
	);
}
