import { View } from "react-native";
import { PublicatedPost } from "../post";
import { ModalPublicationPost } from "../modal-publication-post";
import { ModalEditPost } from "../modal-edit-post";
import { useModal } from "../../../../modules/auth/context";
import { useFetchPosts } from "../../hooks/useFetchPosts";
import { useState, useEffect } from "react";
import { ModalFirstLogin } from "../modal-first-login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkFirstLoginFlag } from "../../utils/firstLoginStorage";

export function MainPage() {
	const { isCreateVisible, closeCreateModal, openEditModal, closeEditModal } = useModal();
	const { posts, fetchPosts } = useFetchPosts();

	const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

	const [modalVisible, setModalVisible] = useState<boolean | null>(null);

	const [email, setEmail] = useState<string>("");

	useEffect(() => {
		async function init() {
			try {
				const storedEmail = await AsyncStorage.getItem("userEmail");

				const alreadyShown = await checkFirstLoginFlag(storedEmail || "");

				setEmail(storedEmail || "");
				setModalVisible(!alreadyShown);
			} catch (error) {
				console.error(
					"Ошибка при инициализации главной страницы:",
					error
				);
			}
		}

		init();
	}, []);

	return (
		<View>
			{modalVisible !== null && (
				<ModalFirstLogin
					isVisible={modalVisible}
					setIsVisible={setModalVisible}
					email={email}
					onRefresh={fetchPosts}
				/>
			)}

			<ModalPublicationPost onRefresh={fetchPosts} />

			<ModalEditPost postId={selectedPostId} onRefresh={fetchPosts} />

			<View>
				{posts.map((post) => (
					<PublicatedPost
						key={post.id}
						id={post.id}
						name={post.name}
						text={post.description}
						hashtags={[...post.defaultTags, ...post.customTags]}
						photo={post.image}
						user={post.user}
						likes={post.likes ?? 0}
						views={post.views ?? 0}
						onRefresh={fetchPosts}
					/>
				))}

				<PublicatedPost
					name="Theme"
					text="Інколи найкращі ідеї народжуються в тиші. Природа, книга і спокій — усе, що потрібно, аби перезавантажитись."
					hashtags={["відпочинок", "натхнення"]}
					photo={[]}
					likes={140}
					views={10}
					user={{ id: 20000, email: "anton@gmail.com" }}
				/>

				<PublicatedPost
					name="Theme"
					text="Природа, книга і спокій — усе, що потрібно, аби перезавантажитись. Інколи найкращі ідеї народжуються в тиші."
					hashtags={["натхнення"]}
					photo={[]}
					likes={5}
					views={8}
					user={{ id: 20001, email: "rinat@gmail.com" }}
				/>

				<PublicatedPost
					name="Theme"
					text="Буває такий настрій: просто лежиш і існуєш. Чай в одній руці, телефон в іншій, думки десь у космосі. І знаєте шо? Норм."
					hashtags={[]}
					photo={[]}
					likes={4}
					views={10}
					user={{ id: 20003, email: "ilia@gmail.com" }}
				/>

				<PublicatedPost
					name="Theme"
					text="Чай в одній руці, телефон в іншій, думки десь у космосі. І знаєте шо? Норм. Буває такий настрій: просто лежиш і існуєш."
					hashtags={["вайб"]}
					photo={[]}
					likes={9}
					views={15}
					user={{ id: 20004, email: "oleksandr@gmail.com" }}
				/>
			</View>
		</View>
	);
}
