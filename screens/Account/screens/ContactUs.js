import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import FList from "@components/FList";
import * as Linking from "expo-linking"
import { A } from "@expo/html-elements";

const Item = (item) => {
  return (
    <View style={styles.item}>
      <Image
        source={item.leftIcon}
        contentFit="cover"
        transition={1000}
        style={{
          width: 25,
          height: 25,
          marginRight: 12,
        }}
      />
        <Text style={{
          fontSize: 16
        }}>{item.title}</Text>
    </View>
  );
};

const data = [
  {
    title: "在线客服",
    leftIcon: require("@assets/images/mine_ic_online_service.png"),
    leftItem: (item) => {
      return (
        <>
          <A
            href="https://google.com"
            style={{
              color: "#0825B8",
              textDecorationLine: "none",
              fontWeight: "bold",
            }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems:'center'
            }}>
              <Image
                source={item.leftIcon}
                contentFit="cover"
                transition={1000}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 12,
                }}
              />
              <Text style={{color: '#0A233E'}}>{item.title}</Text>
              <Text style={{
                color: '#8899AC',
                marginLeft: 5
              }}>Recommend</Text>
            </View>
          </A>
        </>
      );
    },
  },
  {
    title: "联系邮箱： xxxx@gmail.com",
    leftIcon: require("@assets/images/mine_ic_email.png"),
    leftItem: Item,
  },
  {
    title: "联系电话： xxxxx",
    tel: 'xxxx',
    leftIcon: require("@assets/images/mine_ic_contact_number.png"),
    displayIcon: false,
    leftItem: (item) => {
      return (
        <>
          <View style={{
            flexDirection: 'row',
            alignItems:'center'
          }}>
            <Image
              source={item.leftIcon}
              contentFit="cover"
              transition={1000}
              style={{
                width: 25,
                height: 25,
                marginRight: 12,
              }}
            />
            <Text>{item.title}</Text>
          </View>
          <Pressable onPress={() => {
              //TODO: +区号
              Linking.openURL(`tel: ${item.tel}`)
            }}>
              <Text style={{
                color: '#0825B8',
                fontSize: 16
              }}>拨打</Text>
          </Pressable>
        </>
      );
    },
  },
];

export default function ContactUs() {
  return (
    <View style={{
      backgroundColor: 'white',
      height: '100%'
    }}>
      <View style={styles.container}>
        <FList data={data} itemStyle={styles.FList}/>
        <Text style={{
          color: '#8899AC',
          fontSize: 12,
          lineHeight: 18
        }}>
          Key Executive For Loan Handling officer Name: xxxxxxx Contact
          Email:XXXXXX@com
        </Text>
      </View>
    </View>
   
  );
}
const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
  },
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  itemsContainer: {
    margin: 15,
    transform: [{ translateY: -50 }],
  },
  item: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  FList: {
    height: 60,
    borderWidth: 1,
    borderColor: '#C0C4D6',
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 4,
  },
  text: {
    color: "white",
  },
});