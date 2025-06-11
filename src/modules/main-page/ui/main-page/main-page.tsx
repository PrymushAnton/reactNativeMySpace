import { View } from "react-native";
import { PublicatedPost } from "../post";
import { ModalPublicationPost } from "../modal-publication-post";
import { ModalEditPost } from "../modal-edit-post";
import { useAuthContext, useModal } from "../../../../modules/auth/context";
import { useFetchPosts } from "../../hooks/useFetchPosts";
import { useState, useEffect } from "react";
import { ModalFirstLogin } from "../modal-first-login";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { checkFirstLoginFlag } from "../../utils/firstLoginStorage";

export function MainPage() {
	const { isCreateVisible, closeCreateModal, openEditModal, closeEditModal } =
		useModal();
	const { posts, fetchPosts } = useFetchPosts();

	const {justRegistered, setJustRegistered} = useAuthContext()

	const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

	// const [modalVisible, setModalVisible] = useState<boolean>(false);

	// const [userId, setUserId] = useState<number | null>(null);

	// useEffect(() => {
	// 	setModalVisible(justRegistered)
	// }, [justRegistered]);

	return (
		<View>
			{justRegistered && (
				<ModalFirstLogin
					isVisible={justRegistered}
					// setIsVisible={setModalVisible}
					setJustRegistered={setJustRegistered}
					// userId={userId}
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
			</View>
		</View>
	);
}
