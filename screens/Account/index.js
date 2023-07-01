import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React from 'react';
import { useUserInfo } from "@store/useUserInfo";
import FList from "@components/FList";
import UserLayout from '@components/UserLayout';

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
    title: "账单",
    screen: "Bills",
    leftIcon: require('@assets/images/mine_ic_bill.svg'),
    leftItem: Item,
  },
  {
    title: "认证信息",
    screen: "Credentials",
    leftIcon: require('@assets/images/mine_ic_certification_info.svg'),
    leftItem: Item,
  },
  {
    title: "收款账号",
    screen: "MyCards",
    leftIcon: require('@assets/images/mine_ic_contact_us.svg'),
    leftItem: Item,
  },
  {
    title: "联系我们",
    screen: "ContactUs",
    leftIcon: require('@assets/images/mine_ic_contact_us.svg'),
    leftItem: Item,
  },
  {
    title: "设置",
    screen: "Settings",
    leftIcon: require('@assets/images/mine_ic_settings.svg'),
    leftItem: Item,
  },
];

const image = {uri: require('@assets/images/bg.png')};

const Account = ({ navigation }) => {
  const [isLogin, login] = useUserInfo((s) => [s.isLogin, s.login]);
  console.log('isLogin', isLogin)
  return (
    <UserLayout> 
      <View
        style={styles.itemsContainer}
      >
        <FList data={data} itemStyle={styles.FList}/>
      </View>

      <View style={{
         transform: 'translateY(-50px)',
         alignItems: "center"
      }}>
        {!isLogin && (
          <Pressable
            style={{
              width: "75%",

              backgroundColor: "#2196F3",
            }}
            onPress={() => {
              navigation.push("Login");
            }}
          >
            <Text
              style={{
                textAlign: "center",
                height: "30px",
                lineHeight: "30px",
              }}
            >
              登录
            </Text>
          </Pressable>
        )}
      </View>
    </UserLayout>
  );
};

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
    transform: 'translateY(-50px)',
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

export default Account;
