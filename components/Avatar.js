import ImageCard from "@components/ImageCard";
import { View, StyleSheet } from "react-native";
import { useUserInfo } from '@store/useUserInfo';

export default function Avatar({ title, style = {} }) {
	const isLogin = useUserInfo((s) => s.isLogin);

	return (
		<View style={[styles.container, style]}>
			<ImageCard
				title={title}

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
		color: 'white',
		padding: 15
	},
});
