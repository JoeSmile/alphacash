import { View, Text, StyleSheet, Image } from "react-native";

export default function ImageCard({
  containerStyle = {},
  imageStyle = {},
  imgSource,
  title,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        style={[styles.image, imageStyle]}
        source={imgSource}
        contentFit="cover"
        transition={1000}
      />
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100px",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "100%",
    width: "100px",
  },
});
