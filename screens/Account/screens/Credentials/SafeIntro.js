import { SafeAreaView, View, Text, Pressable, StyleSheet, Image, TextInput, Button } from "react-native";

export default function SafeIntro ({safeText}) {
  return (
    <View style={styles.safeTextContainer}>
      <View >
        <Image 
          source={require('@assets/images/mine_info_ic_safe.svg')}
          contentFit="cover"
          transition={1000}
          style={{
            width: '22px',
            height: '22px',
          }}/>
      </View>
      <Text style={styles.safeText}>
      {safeText}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  safeTextContainer: {
    border: "1px solid #698EC7",
    borderRadius: '4px',
    backgroundColor: '#F6F9FD',
    paddingHorizontal: '15px',
    paddingVertical: '15px',
    flexDirection:'row'
  },  
  safeText: {
    marginLeft: '10px',
    fontSize: '12px',
    color:'#4F5E6F'
  },
});