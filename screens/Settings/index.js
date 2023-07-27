import { StyleSheet, Text, Pressable, View, Image } from "react-native";
import { RepayRemind } from "./RepayRemind";
import FList from "@components/FList";
import { useI18n, LocaleTypes } from "@hooks/useI18n";
import { useMemo } from 'react';
import { useSystemStore } from "@store/useSystemStore";

const Item = (item) => {
  return (
    <View style={styles.item}>
      <Image
        source={item.leftIcon}
        contentFit="cover"
        transition={1000}
        style={{
          width: 24,
          height: 24,
          marginRight: 12,
        }}
      />
      <Text style={{color: '#0A233E', fontSize: 16}}>{item.title}</Text>
    </View>
  );
};

const getListData = ({locale, isLogin, setToken}) => {
  console.log('locale--', locale);
  const baseList = [
    {
      id: "1",
      title: "还款提醒",
      leftItem: RepayRemind,
      displayIcon: false,
      leftIcon: require("@assets/images/mine_ic_repayment_reminder.png"),
    },
    {
      id: "2",
      title: "语言设置",
      screen: "Language",
      leftIcon: require("@assets/images/mine_ic_language_settings.png"),
      leftItem: (item) => {
        return (
          <View style={{
            flexDirection: "row",
            flex: 1,
            alignItems:'center'
          }}>
            <Image
              source={item.leftIcon}
              contentFit="cover"
              transition={1000}
              style={{
                width: 24,
                height: 24,
                marginRight: 12,
              }}
            />
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1
              }}>
              <Text style={{color: '#0A233E', fontSize: 16}}>{item.title}</Text>
              <Text style={{color: '#0A233E', fontSize: 16}}>{locale == LocaleTypes.urdu ? 'اردو' : 'English'}</Text>
            </View>
          </View>
        )
      },
    },
    {
      id: "3",
      title: "隐私协议",
      screen: "PrivatePolicy",
      leftItem: Item,
      leftIcon: require("@assets/images/mine_ic_privacy_agreement.png"),
    },
    {
      id: "4",
      title: "当前版本",
      displayIcon: false,
      leftIcon: require("@assets/images/mine_ic_current_version.png"),
      leftItem: (item) => {
        return (
          <View style={{
            flexDirection: "row",
            width: '100%',
            alignItems:'center'
          }}>
            <Image
              source={item.leftIcon}
              contentFit="cover"
              transition={1000}
              style={{
                width: 24,
                height: 24,
                marginRight: 12,
              }}
            />
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1
              }}>
              <Text style={{color: '#0A233E', fontSize: 16}}>{item.title}</Text>
              <Text style={{color: '#0A233E', fontSize: 16}}>1.0.0</Text>
            </View>
          </View>
        )
      },
    },
  ];
  if (isLogin) {
    baseList.push( {
      id: "5",
      title: "Logout",
      displayIcon: false,
      leftItem: () => {
        return (
          <Pressable style={{
            alignItems: 'center',
            width: '100%'
          }}
          onPress={() => setToken('')}
          >
            <View><Text>Log Out</Text></View>
          </Pressable>
        )
      },
    },)
  }
  return baseList;
}
const Settings = () => {
  const { locale } = useI18n()
  const [isLogin, setToken] = useSystemStore((s) => [!!s.token, s.setToken]);
  console.log('lSettingsSettingsSettingsSettingsocale--', locale);

  const listData = useMemo(() => {
    return getListData({locale, isLogin, setToken});
  }, [locale, isLogin, setToken]);

  return (
    <View style={{
      padding: 20,
      backgroundColor: 'white',
      height: '100%'
    }}>
      <FList data={listData} itemStyle={styles.FList}/>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
  },
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
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
    boxShadow:
      "1px 1px 3px 0 rgba(0, 0, 0, 0.1),1px 1px 2px 0 rgba(0, 0, 0, 0.06)",
  },
  text: {
    color: "white",
  },
});


export default Settings;
