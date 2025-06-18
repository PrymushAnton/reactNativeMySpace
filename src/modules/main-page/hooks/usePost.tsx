import AsyncStorage from "@react-native-async-storage/async-storage";
import { IPostFromBackend, IUserPost } from "../types/post";
import { Response } from "../../../shared/types";
import { HOST, PORT } from "../../../shared/base-url";

interface PostPayload {
	title: string;
	text: string;
	existingTags: string[];
	newTags: string[];
	images: string[];
	link: string[];
}

interface UpdatePayload extends PostPayload {
	id: number;
}

export function usePost() {
	async function getToken() {
		return await AsyncStorage.getItem("token");
	}

	function transformToPayload(post: IUserPost): PostPayload {
		return {
			title: post.title,
			text: post.text,
			existingTags: post.defaultTags,
			newTags: post.customTags,
			images: post.images,
			link: post.link,
		};
	}

	async function createPost(post: IUserPost) {
		const token = await getToken();
		if (!token) return "";

		const payload = transformToPayload(post);

		try {
			const res = await fetch(`http://${HOST}:${PORT}/post/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			});
			const result = await res.json();
			return result;
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	async function updatePost(id: number, post: IUserPost) {
		const token = await getToken();
		if (!token) return "";

		const payload: UpdatePayload = {
			...transformToPayload(post),
			id,
		};

		try {
			const res = await fetch(`http://${HOST}:${PORT}/post/update`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			});

			return await res.json();
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	async function deletePost(id: number) {
		const token = await getToken();
		if (!token) return "";

		try {
			const res = await fetch(`http://${HOST}:${PORT}/post/delete`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ id }),
			});

			return await res.json();
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	async function getAllPosts() {
		try {
			const res = await fetch(`http://${HOST}:${PORT}/post/find-all-posts`);
			return await res.json();
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	async function getPostsByUserId(userId: number) {
		try {
			const res = await fetch(
				`http://${HOST}:${PORT}/post/find-posts-by-user-id/${userId}`
			);
			return await res.json();
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	async function getAllTags() {
		try {
			const res = await fetch(`http://${HOST}:${PORT}/post/find-all-tags`);
			return await res.json();
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	async function getPostById(postId: number): Promise<Response<IPostFromBackend>> {
		try {
			const res = await fetch(
				`http://${HOST}:${PORT}/post/find-post-by-id/${postId}`,
				{ method: "GET" }
			);
			const data = await res.json();
			return data;
		} catch (error) {
			console.error(error);
			return { status: "error", message: "" };
		}
	}

	return {
		createPost,
		updatePost,
		deletePost,
		getAllPosts,
		getPostsByUserId,
		getAllTags,
		getPostById,
	};
}
