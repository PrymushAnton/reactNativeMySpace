import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthContext } from "../../../auth/context";
import { useFetchPosts } from "../../../main-page/hooks/useFetchPosts";
import { PublicatedPost } from "../../../main-page/ui/post";
import { ICONS } from "../../../../shared/ui/icons";
import { styles } from "./random-user-profile-page.styles";
import { HOST, PORT } from "../../../../shared/base-url";
import { FriendCard } from "../../../friends-page/types/friend-info";

export function AnotherUserProfilePage() {
	const { user } = useAuthContext();
	const { posts, fetchPosts } = useFetchPosts(user?.id);

	if (!user) return null;

	const sendRequest = async () => {
		// const token = await AsyncStorage.getItem("token");
		// try {
		// 	const res = await fetch(
		// 		`http://${HOST}/friend/send-friend-request`,
		// 		{
		// 			method: "POST",
		// 			headers: {
		// 				"Content-Type": "application/json",
		// 				Authorization: `Bearer ${token}`,
		// 			},
		// 			body: JSON.stringify({ toUser: Number(id) }),
		// 		}
		// 	);
		// 	if (res.ok) alert("Request send");
		// 	else alert("Request send error");
		// } catch {
		// 	alert("Network error");
		// }
	};

	return (
		<ScrollView contentContainerStyle={styles.container} overScrollMode="never">
			<View style={styles.header}>
				<View style={styles.profileImageWrapper}>
					{user.profile.avatars ? (
						<Image
							// source={{ uri: user.profile.avatars }}
							style={{ width: 96, height: 96, borderRadius: 20 }}
						/>
					) : (
						<ICONS.AnonymousLogoIcon width={96} height={96} />
					)}
				</View>
				<Text style={styles.name}>
					{user.first_name} {user.last_name}
				</Text>
				<Text style={styles.username}>@{user.username}</Text>

				<View style={styles.statsContainer}>
					<View style={styles.statBlock}>
						<Text style={styles.statNumber}>30</Text>
						<Text style={styles.statLabel}>Дописи</Text>
					</View>
					<View style={styles.statBlock}>
						<Text style={styles.statNumber}>17.7K</Text>
						<Text style={styles.statLabel}>Читачі</Text>
					</View>
					<View style={styles.statBlock}>
						<Text style={styles.statNumber}>2</Text>
						<Text style={styles.statLabel}>Друзі</Text>
					</View>
				</View>

				<View style={styles.actions}>
					<TouchableOpacity style={styles.confirmBtn}>
						<Text
							style={{
								color: "#FFFFFF",
								fontFamily: "GTWalsheimPro-Regular",
							}}
						>
							Додати
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.deleteBtn}
						onPress={sendRequest}
					>
						<Text style={styles.actionText}>Видалити</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.albumsWrapper}>
				<View style={styles.albumHeader}>
					<Text style={styles.albumTitle}>Альбоми</Text>
					<TouchableOpacity>
						<Text style={styles.viewAll}>Дивитись всі</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.albumCard}>
					<Text style={styles.albumName}>Настрій</Text>
					<Text style={styles.albumSubtitle}>Природа · 2025 рік</Text>
					<View style={styles.albumImagePlaceholder}></View>
				</View>
			</View>

			<View style={styles.postsContainer}>
				{posts.map((post) => (
					<PublicatedPost
						key={post.id}
						id={post.id}
						name={post.title}
						text={post.text}
						hashtags={[...post.defaultTags, ...post.customTags]}
						photo={post.images}
						user={post.user}
						likes={post.likes ?? 0}
						views={post.views ?? 0}
						onRefresh={fetchPosts}
					/>
				))}
			</View>
		</ScrollView>
	);
}
