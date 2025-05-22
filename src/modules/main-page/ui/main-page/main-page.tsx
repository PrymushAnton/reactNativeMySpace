import { View } from "react-native";
import { PublicatedPost } from "../post";
import { useModal } from "../../../../modules/auth/context";
import { IUserPost } from "../../../../modules/auth/types";
import { useEffect, useState } from "react";
import { ModalPublicationPost } from "../modal-publication-post";
import { usePost } from "../../hooks/usePost";

export function MainPage() {
	const { isVisible, closeModal } = useModal();

	const [images, setImages] = useState<string[]>([]);
	const [globalError, setGlobalError] = useState<string>("");

	const [posts, setPosts] = useState<IUserPost[]>([]);

	const {
		createPost,
		updatePost,
		deletePost,
		getAllPosts,
		getPostsByUserId,
		getAllTags,
	} = usePost();

	function adaptPost(post: any): IUserPost {
		return {
			id: post.id,
			name: post.title ?? "",
			description: post.text ?? "",
			defaultTags: Array.isArray(post.tags) ? post.tags : [],
			customTags: [],
			image: Array.isArray(post.images) ? post.images.join(",") : "",
			avatar: post.avatar ?? "",
			likes: post.likes ?? 0,
			views: post.views ?? 0,
			link: post.link ?? "",
			userId: post.userId,
		};
	}

	useEffect(() => {
		async function fetchPosts() {
			const allPosts = await getAllPosts();
			setPosts(allPosts.data.map(adaptPost));
			if (allPosts.success && allPosts.data) {
				const newPost = adaptPost(allPosts.data);
				setPosts((prev) => [newPost, ...prev]); 
			}
		}
		fetchPosts();
	}, []);

	return (
		<View>
			<ModalPublicationPost />
			<View>
				<View>
					{posts.map((post, idx) => (
						<PublicatedPost
							key={idx}
							name={post.name}
							text={post.description}
							hashtags={[...post.defaultTags, ...post.customTags]}
							photo={post.image ? post.image.split(",") : []}
							avatar={post.avatar ?? ""}
							likes={post.likes ?? 0}
							views={post.views ?? 0}
						/>
					))}
				</View>
				<PublicatedPost
					name="anton"
					avatar=""
					text="Інколи найкращі ідеї народжуються в тиші  Природа, книга і спокій — усе, що потрібно, аби перезавантажитись"
					hashtags={["відпочинок", "натхнення"]}
					photo={[]}
					likes={140}
					views={10}
				></PublicatedPost>
				<PublicatedPost
					name="rinat"
					avatar=""
					text="Природа, книга і спокій — усе, що потрібно, аби перезавантажитись Інколи найкращі ідеї народжуються в тиші  "
					hashtags={["натхнення"]}
					photo={[]}
					likes={5}
					views={8}
				></PublicatedPost>
				<PublicatedPost
					name="ilia"
					avatar=""
					text="буває такий настрій: просто лежиш і існуєш  чай в одній руці, телефон в іншій, думки десь у космосі  і знаєте шо? норм"
					hashtags={[]}
					photo={[]}
					likes={4}
					views={10}
				></PublicatedPost>
				<PublicatedPost
					name="oleksandr"
					avatar=""
					text="чай в одній руці, телефон в іншій, думки десь у космосі  і знаєте шо? норм буває такий настрій: просто лежиш і існуєш "
					hashtags={["вайб"]}
					photo={[]}
					likes={9}
					views={15}
				></PublicatedPost>
			</View>
		</View>
	);
}
