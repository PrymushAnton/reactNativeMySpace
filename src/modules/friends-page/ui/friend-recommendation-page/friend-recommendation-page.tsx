import { View } from "react-native";
import { HeaderNavigationFriendPages } from "../header-navigation-friends-page";
import { FriendRequest } from "../friend-component/friend-request-component";

export function FriendRecommendationPage() {
	return (
		<View style={{alignItems: "center"}}>
			<HeaderNavigationFriendPages />
			<FriendRequest.FriendSendRequest
				image=""
				name="abobus"
				surname="gogus"
				username="agogus"
			/>
		</View>
	);
}
