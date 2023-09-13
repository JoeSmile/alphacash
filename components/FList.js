import { Text, FlatList, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useI18n } from "@hooks/useI18n";
import { doTrack } from "@utils/dataTrack";
import { useSystemStore } from "@store/useSystemStore";
import { getRevertImage } from '@styles';
import { useGetUserFormStatus } from "@apis";
import { useEffect, useState } from "react";
import { Toast } from "@ant-design/react-native";
import { getWritingDirectionStyle, getMarginRightOrLeft, getRTLView } from '@styles';

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
    iconKeepDirection
  } = props;
  const navigation = useNavigation();
  const { i18n, locale } = useI18n();
  const [isLogin, phone] = useSystemStore((s) => [!!s.token, s.phone]);
  const { mutate: getUserFormStatus, data: formData, isLoading: isGetFormStatusLoading } = useGetUserFormStatus();

  useEffect(() => {
    if (formData?.data?.error_code == 1) {
      const status = formData.data.data;
      if(status.isCompletedPersonal && status.isCompletedWork && status.isCompletedContact && status.isCompletedIdentity){
        navigation.push("MyCards", { ...parameters })
      } else {
        Toast.info({
          content: i18n.t("Please fill in the authentication information first"),
          duration: 3,
        });
        navigation.push("Credentials");
      }
    }
  }, [formData]);

  return (
    <Pressable
      style={[
        {
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        },
        itemStyle,
        getRTLView(locale)
      ]}
      onPress={() => {
        trackName && doTrack(trackName, 1);

        if (requireLogin) {
          if (isLogin) {
            if (clickItem) {
              clickItem(props);
            } else {
              if( screen && screen == "MyCards"){
                getUserFormStatus();
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
            rightIcon ? [{ width: 20, height: 20 }, getRevertImage(locale, iconKeepDirection)] : [{ width: 16, height: 16 }, getRevertImage(locale, iconKeepDirection)]
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
