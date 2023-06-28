import ImageCard from "@components/ImageCard";
import { View, StyleSheet } from "react-native";
import { useUserInfo } from '@store/useUserInfo';

export default function Avatar ({title}) {
  const isLogin = useUserInfo((s) => s.isLogin);

	return (
		<View style={styles.container}>
			<ImageCard
				title={title}

				imageStyle={{
					borderRadius:'50%'
				}}
				imgSource={
					isLogin
					? require("@assets/images/mac.png")
					: require("@assets/images/logo.jpeg")
			}/>
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0825B8',
    color: 'white',
    padding: '15px'
  },
});