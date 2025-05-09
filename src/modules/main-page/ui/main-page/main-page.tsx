import { Header } from "../../../../shared/Header/Header";
import { Footer } from "../../../../shared/Footer/Footer";
import { View, StyleSheet } from "react-native";
import { Post } from "../post/Post";

export function MainPage() {
	return (
		<View>
			<Header />
			<View >
				<Post
					name="anton"
					avatar="..../shared/ui/icons/person.png"
					text="Інколи найкращі ідеї народжуються в тиші  Природа, книга і спокій — усе, що потрібно, аби перезавантажитись"
					hashtags={["відпочинок", "натхнення"]}
					photo={[]}
					likes={140}
					views={10}
				></Post>
				<Post
					name="rinat"
					avatar="..../shared/ui/icons/person.png"
					text="Природа, книга і спокій — усе, що потрібно, аби перезавантажитись Інколи найкращі ідеї народжуються в тиші  "
					hashtags={["натхнення"]}
					photo={[]}
					likes={5}
					views={8}
				></Post>
				<Post
					name="ilia"
					avatar="..../shared/ui/icons/person.png"
					text="буває такий настрій: просто лежиш і існуєш  чай в одній руці, телефон в іншій, думки десь у космосі  і знаєте шо? норм"
					hashtags={[]}
					photo={[]}
					likes={4}
					views={10}
				></Post>
				<Post
					name="oleksandr"
					avatar="..../shared/ui/icons/person.png"
					text="чай в одній руці, телефон в іншій, думки десь у космосі  і знаєте шо? норм буває такий настрій: просто лежиш і існуєш "
					hashtags={["вайб"]}
					photo={[]}
					likes={9}
					views={15}
				></Post>
			</View>
			<Footer />
		</View>
	);
}

const styles = StyleSheet.create({
	
})