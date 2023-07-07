import { View, Text, StyleSheet, Image } from "react-native";
//import { Image } from 'expo-image';

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
      <Text
        style={{
          fontSize: 20,
          marginTop: 8,
          color: "white",
        }}
      >
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 75,
    width: 75,
  },
});
