import { Text, FlatList, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useI18n } from "@hooks/useI18n";
import { doTrack } from "@utils/dataTrack";
import { useSystemStore } from "@store/useSystemStore";
import { getRevertImage } from '@styles';
import { useGetUserFormStatus } from "@apis";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Toast } from "@ant-design/react-native";



const Item = (props) => {
  const {
    title,
    trackName,
    screen,
    leftItem,
    displayIcon = true,
    itemStyle = {},
    rightIcon = "",
    parameters = {},
    requireLogin = false,
    clickItem,
  } = props;
  const navigation = useNavigation();
  const { i18n, locale } = useI18n();
  const [isLogin, phone] = useSystemStore((s) => [!!s.token, s.phone]);
  const { mutate: getUserFormStatus, data, isLoading } = useGetUserFormStatus();
  const isFocused = useIsFocused();
  const [formStatus,setFormStatus] = useState(false)

  useEffect(() => {
    getUserFormStatus();
  }, [isFocused]);

  useEffect(() => {
    if (data?.data?.error_code == 1) {
      const status = data.data.data;
      if(status.setFormStatus && status.isCompletedWork && status.isCompletedContact && status.isCompletedIdentity){
        setFormStatus(true)
      }
    }
  }, []);

  return (
    <Pressable
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        },
        itemStyle,
      ]}
      onPress={() => {
        trackName && doTrack(trackName, 1);

        if (requireLogin) {
          if (isLogin) {
            if (clickItem) {
              clickItem(props);
            } else {
              if( screen && screen == "MyCards" && !formStatus){
                Toast.info({
                  content: i18n.t("Please fill in the authentication information first"),
                  duration: 3,
                });
                navigation.push("Credentials");
              } else {
                screen && navigation.push(screen, { ...parameters });
              }
            }
          } else {
            // goto login
            navigation.push("Login", {
              targetScreen: screen ?? "",
              ...parameters,
            });
          }
        } else {
          if (clickItem) {
            clickItem(props);
          } else {
            screen && navigation.push(screen, { ...parameters });
          }
        }
      }}
    >
      {!!leftItem ? (
        leftItem(props)
      ) : (
        <Text style={{ fontSize: 16 }}>{i18n.t(title)}</Text>
      )}
      {displayIcon && (
        <Image
          source={rightIcon || require("@assets/images/com_ic_right.png")}
          contentFit="cover"
          transition={200}
          style={
            rightIcon ? [{ width: 20, height: 20 }, getRevertImage(locale)] : [{ width: 16, height: 16 }, getRevertImage(locale)]
          }
        />
      )}
    </Pressable>
  );
};

const FList = ({ data, itemStyle, clickItem, ...restProps }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) =>
        item.render ? (
          item.render(item)
        ) : (
          <Item {...item} itemStyle={itemStyle} clickItem={clickItem} />
        )
      }
      keyExtractor={(item) => item.id || item.title}
      {...restProps}
    />
  );
};

export default FList;
