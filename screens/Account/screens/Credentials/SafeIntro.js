import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from 'expo-image';

export default function SafeIntro({ safeText }) {
  return (
    <View style={styles.safeTextContainer}>
      <View >
        <Image
          source={require('@assets/images/mine_info_ic_safe.svg')}
          contentFit="cover"
          transition={1000}
          style={{
            width: 22,
            height: 22,
          }} />
      </View>
      <Text style={styles.safeText}>
        {safeText}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  safeTextContainer: {
    borderRadius: 4,
    backgroundColor: '#F6F9FD',
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row'
  },
  safeText: {
    marginLeft: 10,
    fontSize: 12,
    color: '#4F5E6F'
  },
});