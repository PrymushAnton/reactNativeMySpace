import { View } from "react-native";
import { PublicatedPost } from "../post";
import { useModal } from "../../../../modules/auth/context";
import { IUserPost } from "../../../../modules/auth/types";
import { useEffect, useState } from "react";
import { ModalPublicationPost } from "../modal-publication-post";
import { usePost } from "../../hooks/usePost";
import { IBackendPost } from "../../types/post-info";
import { IUserPostWithUser } from "../../types/post";
import { ModalEditPost } from "../modal-edit-post";

export function MainPage() {
	const { isCreateVisible, closeCreateModal } = useModal();

	const [images, setImages] = useState<string[]>([]);
	const [globalError, setGlobalError] = useState<string>("");

	const [posts, setPosts] = useState<IUserPostWithUser[]>([]);

	const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
	const { openEditModal, closeEditModal } = useModal();

	const {
		createPost,
		updatePost,
		deletePost,
		getAllPosts,
		getPostsByUserId,
		getAllTags,
	} = usePost();

	function adaptPost(post: IBackendPost): IUserPostWithUser {
		return {
			id: post.id,
			name: post.title ?? "",
			description: post.text ?? "",
			defaultTags: Array.isArray(post.tags) ? post.tags : [],
			customTags: [],
			image: Array.isArray(post.images) ? post.images.join(",") : "",
			// avatar: post.user.image ?? "",
			likes: post.likes ?? 0,
			views: post.views ?? 0,
			link: post.link ?? "",
			userId: post.userId,
			user: post.user,
		};
	}

	async function fetchPosts() {
		const allPosts = await getAllPosts();
		setPosts(allPosts.data.map(adaptPost));
		if (allPosts.success && allPosts.data) {
			const newPost = adaptPost(allPosts.data);
			setPosts((prev) => [newPost, ...prev]);
		}
	}

	useEffect(() => {
		fetchPosts();
	}, []);

	// useEffect(() => {
	// 	console.log("posts", posts);
	// }, [posts]);

	return (
		<View>
			<ModalPublicationPost />
			<ModalEditPost postId={selectedPostId} />
			<View>
				<View>
					{posts.map((post, idx) => (
						<PublicatedPost
							id={post.id}
							key={idx}
							name={post.name}
							text={post.description}
							hashtags={[...post.defaultTags, ...post.customTags]}
							photo={post.image ? post.image.split(",") : []}
							// avatar={post.avatar ?? ""}
							user={post.user}
							likes={post.likes ?? 0}
							views={post.views ?? 0}
							onRefresh={fetchPosts}
						/>
					))}
				</View>
				<PublicatedPost
					name="anton"
					// avatar="a"
					text="Інколи найкращі ідеї народжуються в тиші  Природа, книга і спокій — усе, що потрібно, аби перезавантажитись"
					hashtags={["відпочинок", "натхнення"]}
					photo={[]}
					likes={140}
					views={10}
					user={{
						id: 20000,
						email: "anton@gmail.com",
					}}
				></PublicatedPost>
				<PublicatedPost
					name="rinat"
					// avatar="a"
					text="Природа, книга і спокій — усе, що потрібно, аби перезавантажитись Інколи найкращі ідеї народжуються в тиші  "
					hashtags={["натхнення"]}
					photo={[]}
					likes={5}
					views={8}
					user={{
						id: 20001,
						email: "rinat@gmail.com",
					}}
				></PublicatedPost>
				<PublicatedPost
					name="ilia"
					// avatar="a"
					text="буває такий настрій: просто лежиш і існуєш  чай в одній руці, телефон в іншій, думки десь у космосі  і знаєте шо? норм"
					hashtags={[]}
					photo={[]}
					likes={4}
					views={10}
					user={{
						id: 20003,
						email: "ilia@gmail.com",
					}}
				></PublicatedPost>
				<PublicatedPost
					name="oleksandr"
					// avatar="a"
					text="чай в одній руці, телефон в іншій, думки десь у космосі  і знаєте шо? норм буває такий настрій: просто лежиш і існуєш "
					hashtags={["вайб"]}
					photo={[]}
					likes={9}
					views={15}
					user={{
						id: 20004,
						email: "oleksandr@gmail.com",
					}}
				></PublicatedPost>
			</View>
		</View>
	);
}
