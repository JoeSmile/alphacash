import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from "react-native";
import EasypaisaDemo from './EasypaisaDemo';


export default function RepayDemo({navigation, route}) {
  const [type, setType] = useState('');
  useEffect(() => {
    const type = route.params ? route.params.type : '';
    setType(type);
    navigation.setOptions({ headerTitle: `${type}还款操作说明` });
  }, [navigation, route]);

  console.log('type----', type);
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={{color: '#0A233E', fontSize: 16, fontWeight: 600, marginBottom: 10}}>操作步骤说明：</Text>
        <Text style={{color: '#4F5E6F', fontSize: 14}}>{`登录 【${type} 账号】>>点击搜索输入`}</Text>
        <Text style={{color: '#4F5E6F', fontSize: 14}}>{`【AlphaCash】>>再输入【Consumer ID】`}</Text>
      </View>
      
      <View style={{marginTop: 20}}>
        <Text style={{color: '#0A233E', fontSize: 16, fontWeight: 600, marginBottom: 10}}>如下图示例：</Text>
        {
          type.toLowerCase() == 'easypaisa' && <EasypaisaDemo />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    padding: 15
  },
});
