import ImageCard from "@components/ImageCard";
import { View, StyleSheet } from "react-native";
import { useSystemStore } from "@store/useSystemStore";

export default function Avatar({ title, style = {} }) {
	const [isLogin, phone] = useSystemStore(s => [!!s.token, s.phone]);

	return (
		<View style={[styles.container, style]}>
			<ImageCard
				title={isLogin ? phone : title}
				imageStyle={{
					borderRadius: 50
				}}
				imgSource={
					isLogin
						? require("@assets/images/2.png")
						: require("@assets/images/1.png")
				} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 15
	},
});
