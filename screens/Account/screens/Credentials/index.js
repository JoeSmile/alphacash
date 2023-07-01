import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import FList from "@components/FList";

const Item = (item) => {
  return (
    <View style={styles.item}>
      <Image 
        source={item.leftIcon}
        contentFit="cover"
        transition={1000}
        style={{
          width: '32px',
          height: '32px',
          marginRight: '12px'
        }}/>
      <Text>{item.title}</Text>
    </View>
  );
}

const data = [
  {
    title: "个人信息",
    screen: "Personal",
    leftIcon: require('@assets/images/mine_ic_personal_info.svg'),
    leftItem: Item,
  },
  {
    title: "工作信息",
    screen: "Job",
    leftIcon: require('@assets/images/mine_ic_wok_info.svg'),
    leftItem: Item,
  },
  {
    title: "紧急联系人",
    screen: "Emergency",
    leftIcon: require('@assets/images/mine_ic_reference_contact.svg'),
    leftItem: Item,
  },
  {
    title: "Certificate",
    screen: "Certificate",
    leftIcon: require('@assets/images/mine_ic_identity_info.svg'),
    leftItem: Item,
  },
];

export default function Credentials() {
  return (
    <SafeAreaView
      style={styles.itemsContainer}
    >
    <FList data={data} itemStyle={styles.FList}/>
  </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  container: {
    color: 'white',
    paddingVertical:'30px',
    paddingHorizontal:'20px',
    backgroundColor: 'transparent'
  },
  itemsContainer: {
    margin: '15px',
  },
  item: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },  
  FList: {
    backgroundColor: 'white',
    paddingHorizontal: '12px',
    paddingVertical: '30px',
    borderRadius: '4px',
    boxShadow: '1px 1px 3px 0 rgba(0, 0, 0, 0.1),1px 1px 2px 0 rgba(0, 0, 0, 0.06)'
  },
  text: {
    color: 'white'
  }
});
