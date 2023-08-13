import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView
} from "react-native";
import { FButton } from '@components/FButton';

export default function EasypaisaDemo({navigation}) {
  return (
    <ScrollView>
      <View style={styles.card}>
        <Text style={styles.title}>{`1.登录【EasyPaisa 账号】`}</Text>
        <Image
          source={require("@assets/repay/repayment_pic_easypaisa_step1.png")}
          style={styles.image}
        />
      
      </View>
     
      <View style={styles.card}>
        <Text style={styles.title}>{`2.点击 【search】输入【AlphaCash】，选择【AlphaCash】`}</Text>
        <Image
          source={require("@assets/repay/repayment_pic_easypaisa_step2.png")}
          style={styles.image}
        />
        <View style={styles.downCard}>
          <Image
              source={require("@assets/repay/repayment_ic_arrow.png")}
              style={styles.down}
            />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>{`3.输入【Consumer ID】，点击【Next】，
再点击【PAY NOW】`}</Text>
        <Image
          source={require("@assets/repay/repayment_pic_easypaisa_step3.png")}
          style={styles.image}
        />
          <View style={styles.downCard}>
          <Image
              source={require("@assets/repay/repayment_ic_arrow.png")}
              style={styles.down}
            />
        </View>
      </View>

      <FButton
        style={{
          marginTop: 20
        }}
        onPress={() => {navigation.goBack()}}
        title='I Know'
      />
    </ScrollView>
  )
} 

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  card: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 4,
    marginBottom: 10,
    position: 'relative',
    zIndex: 1,
  },
  title: {
    color: '#4F5E6F',
    fontSize: 14
  },
  image: {
    marginTop: 20,
    width: '100%',
    height: 260
  },
  down: {
    height: 30,
    width: 30,
    zIndex: 100000,
    position: 'absolute',
    top: -354
  },
  downCard: {
    width: '100%', 
    textAlign: 'center', 
    alignItems:'center', 
    zIndex: 100000,
    position: 'relative',
}
});
