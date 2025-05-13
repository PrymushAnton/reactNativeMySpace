import { StyleSheet } from "react-native";
import {COLORS} from "../../../../shared/constants/colors";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		gap: 30,
	},
	form: {
		minHeight: 200,
		alignItems: "center",
		justifyContent: "center",
		gap: 20,
	},
	buttonBlock: {
		width: 311,
		height: 52,
        backgroundColor: "#543C52",
		alignItems: "center",
		justifyContent: "center",
        borderRadius: 30,
	},
});