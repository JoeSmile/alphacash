import {
  View,
  Text,
  StyleSheet
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export function Process () {
  return (
    <View style={{
      position: 'absolute',
      bottom: 10,
      width: '100%'
    }}>
      <View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[ 'white', '#00B295', '#00B295','#00B295', '#00B295', 'white']}
          style={{width: '100%', height: 2, opacity: 0.4}}
        />
        <View style={{
          flexDirection: 'row',
          width: '100%',
          transform: 'translateY(-10px)'
        }}>
          <View style={styles.textContainer}>
            <Text style={styles.number}>1</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.number}>2</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.number}>3</Text>
           </View>
        </View>
        <View style={{
          flexDirection: 'row',
          transform: 'translateY(-5px)'
        }}>
          <Text style={styles.text}> register </Text>
          <Text style={styles.text}> complete information </Text>
          <Text style={styles.text}> Disburse Amount  </Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'center',
    alignItems:'center',
    flex: 1,
  },
  number: {
    borderWidth: 1,
    width: 18,
    textAlign: 'center',
    borderRadius: 50,
    color: '#00B295',
    borderColor: '#00B295',
    backgroundColor: 'white'
  },
  text: {
    fontSize: 12,
    color: '#8899AC',
    textAlign: 'center',
    flex: 1
  }
});
