import ImageCard from "@components/ImageCard";
import { View, StyleSheet } from "react-native";
import { useSystemStore } from "@store/useSystemStore";

export default function Avatar({ title, style = {}, alwayCompany = false }) {
  const [isLogin, phone] = useSystemStore((s) => [!!s.token, s.phone]);
  const isCompanyLogo = !isLogin || alwayCompany;

  return (
    <View style={[styles.container, style]}>
      <ImageCard
        title={isLogin ? phone : title}
        imageStyle={{
          borderRadius: isCompanyLogo ? 0 : 50,
        }}
        imgSource={
          isCompanyLogo
            ? require("@assets/images/mine_logo.png")
            : require("@assets/images/mine_avatar.png")
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
