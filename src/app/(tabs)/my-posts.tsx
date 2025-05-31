import { ScrollView, Text } from "react-native";
import { MyPostsPage } from "../../modules/my-posts-component/ui"


export default function MyPosts() {
    return (
        <ScrollView style={{ backgroundColor: "#FAF8FF" }}>
            <MyPostsPage></MyPostsPage>
        </ScrollView>
    );
}
