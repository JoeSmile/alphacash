import { StyleSheet, Text, Pressable, View, Image } from "react-native";
import { RepayRemind } from "./RepayRemind";
import FList from "@components/FList";
import { useState } from "react";
import { useI18n, LocaleTypes } from "@hooks/useI18n";
import { useMemo } from "react";
import { useSystemStore } from "@store/useSystemStore";
import { useUserQuota } from "@store/useUserQuota";
import { useNavigation } from "@react-navigation/native";
import FModal from "@components/FModal";
import { doTrack } from "@utils/dataTrack";

const Item = (item) => {
  const { i18n } = useI18n();
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
      <Text style={{ color: "#0A233E", fontSize: 16 }}>
        {i18n.t(item.title)}
      </Text>
    </View>
  );
};

const getListData = ({ locale, isLogin, i18n, setModalVisible }) => {
  const baseList = [
    {
      id: "1",
      title: "Repayment Tips",
      leftItem: RepayRemind,
      displayIcon: false,
      leftIcon: require("@assets/images/mine_ic_repayment_reminder.png"),
    },
    {
      id: "2",
      title: "Language",
      screen: "Language",
      leftIcon: require("@assets/images/mine_ic_language_settings.png"),
      leftItem: (item) => {
        return (
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
            }}
          >
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <Text style={{ color: "#0A233E", fontSize: 16 }}>
                {i18n.t(item.title)}
              </Text>
              <Text style={{ color: "#0A233E", fontSize: 16 }}>
                {locale == LocaleTypes.urdu ? "اردو" : "English"}
              </Text>
            </View>
          </View>
        );
      },
    },
    {
      id: "3",
      title: "Privacy Policy",
      trackName: "pk4",
      screen: "PrivatePolicy",
      leftItem: Item,
      leftIcon: require("@assets/images/mine_ic_privacy_agreement.png"),
    },
    {
      id: "4",
      title: "Version",
      displayIcon: false,
      leftIcon: require("@assets/images/mine_ic_current_version.png"),
      leftItem: (item) => {
        return (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <Text style={{ color: "#0A233E", fontSize: 16 }}>
                {i18n.t(item.title)}
              </Text>
              <Text style={{ color: "#0A233E", fontSize: 16 }}>1.0.0</Text>
            </View>
          </View>
        );
      },
    },
  ];
  if (isLogin) {
    baseList.push({
      id: "5",
      title: "Log Out",
      displayIcon: false,
      leftItem: () => {
        return (
          <Pressable
            style={{
              alignItems: "center",
              width: "100%",
            }}
            onPress={() => {
              doTrack("pk15", 1);
              setModalVisible(true);
            }}
          >
            <View>
              <Text>{i18n.t("Log Out")}</Text>
            </View>
          </Pressable>
        );
      },
    });
  }
  return baseList;
};
const Settings = () => {
  const { locale, i18n } = useI18n();
  const navigation = useNavigation();
  const [isLogin, setToken, cleanCardInfo] = useSystemStore((s) => [
    !!s.token,
    s.setToken,
    s.cleanCardInfo,
  ]);
  const userStore = useUserQuota();
  const [modalVisible, setModalVisible] = useState(false);

  const clickLogOut = () => {
    setToken("");
    //退出登录清空缓存数据
    cleanCardInfo();
    userStore.setFaceData({});
    setModalVisible(false);
    navigation.push("Homepage");
  };

  const listData = useMemo(() => {
    return getListData({
      locale,
      isLogin,
      i18n,
      setModalVisible,
    });
  }, [locale, isLogin, i18n]);

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <FList data={listData} itemStyle={styles.FList} />
      <FModal
        isOpen={modalVisible}
        displayClose={false}
        header={null}
        body={
          <Text style={styles.tip}>{i18n.t("Are you sure to log out?")}</Text>
        }
        footer={
          <>
            <Pressable
              style={[styles.button, styles.buttonRefuse]}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.btnText}>{i18n.t("Cancel")}</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={clickLogOut}
            >
              <Text style={styles.btnText}>{i18n.t("Confirm")}</Text>
            </Pressable>
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  item: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  FList: {
    height: 60,
    borderWidth: 1,
    borderColor: "#C0C4D6",
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 4,
  },
  tip: {
    fontSize: 16,
    lineHeight: 23,
    color: "#0A233E",
    textAlign: "center",
  },
  button: {
    borderRadius: 3,
    padding: 12,
    elevation: 2,
    flex: 1,
  },
  buttonOpen: {
    backgroundColor: "#0825B8",
  },
  buttonRefuse: {
    backgroundColor: "#C0C4D6",
  },
  btnText: {
    fontSize: 16,
    lineHeight: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Settings;
