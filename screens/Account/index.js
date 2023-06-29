import { View, Text, Pressable } from "react-native";
import ImageCard from "@components/ImageCard";
import { useUserInfo } from "@store/useUserInfo";
import FList from "@components/FList";

const data = [
  {
    title: "账单",
    screen: "Bills",
  },
  {
    title: "认证信息",
    screen: "Credentials",
  },
  {
    title: "收款账号",
    screen: "MyCards",
  },
  {
    title: "联系我们",
    screen: "ContactUs",
  },
  {
    title: "设置",
    screen: "Settings",
  },
];

const Account = ({ navigation }) => {
  const [isLogin, login] = useUserInfo((s) => [s.isLogin, s.login]);
  return (
    <View
      style={{
        paddingVertical: 20,
      }}
    >
      <View>
        <ImageCard
          title="产品名称"
          imgSource={
            isLogin
              ? require("@assets/images/2.png")
              : require("@assets/images/1.png")
          }
        />
      </View>
      <View
        style={{
          marginTop: "40px",
        }}
      >
        <FList data={data} />
      </View>

      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
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
    </View>
  );
};
export default Account;
