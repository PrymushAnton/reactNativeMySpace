import { ScrollView, View } from "react-native";
import { MainPage } from "../modules/main-page/ui/main-page/main-page";
import { ICONS } from "../shared/ui/icons";
import { Post } from "../modules/main-page/ui/post/post";
import { Header } from "../shared/Header/Header";
import { Footer } from "../shared/Footer/Footer";

export default function Main() {
	return (
		<ScrollView
			style={{
				backgroundColor: "#FAF8FF",
			}}
		>
			<View style={{}}>
				<MainPage></MainPage>
			</View>
		</ScrollView>
	);
}
