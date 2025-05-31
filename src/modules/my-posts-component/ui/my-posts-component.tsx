import { View, Text } from "react-native";
import { PublicatedPost } from "../../main-page/ui/post";
import { useEffect, useState } from "react";
import { usePost } from "../../main-page/hooks/usePost";
import { IBackendPost } from "../../main-page/types/post-info";
import { IUserPostWithUser } from "../../main-page/types/post";
import { useAuthContext } from "../../../modules/auth/context";
import { styles } from "./my-posts-component.styles";

export function MyPostsPage() {
	const [posts, setPosts] = useState<IUserPostWithUser[]>([]);
	const { user } = useAuthContext();
	const { getPostsByUserId } = usePost();

	function adaptPost(post: IBackendPost): IUserPostWithUser {
		return {
			id: post.id,
			name: post.title ?? "",
			description: post.text ?? "",
			defaultTags: Array.isArray(post.tags) ? post.tags : [],
			customTags: [],
			image: Array.isArray(post.images) ? post.images : [],
			likes: post.likes ?? 0,
			views: post.views ?? 0,
			link: post.link ?? "",
			userId: post.userId,
			user: post.user,
		};
	}

	async function fetchPosts() {
		if (!user?.id) return;
		const response = await getPostsByUserId(user.id);

		if (response.status === "success" && Array.isArray(response.data)) {
			const adaptedPosts = response.data.map(adaptPost);
			setPosts(adaptedPosts);
		} else {
			console.error("error load user posts", response);
		}
	}

	useEffect(() => {
		if (!user?.id) return;
		fetchPosts();
	}, [user?.id]);

	return (
		<View>
			{posts.length === 0 ? (
				<View>
					<Text style={styles.noOnePostText}>
						У вас немає публікацій.
					</Text>
				</View>
			) : (
				posts.map((post) => (
					<PublicatedPost
						id={post.id}
						key={post.id}
						name={post.name}
						text={post.description}
						hashtags={[...post.defaultTags, ...post.customTags]}
						photo={post.image}
						user={post.user}
						likes={post.likes ?? 0}
						views={post.views ?? 0}
						onRefresh={fetchPosts}
					/>
				))
			)}
		</View>
	);
}
