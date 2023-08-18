import { Text, FlatList, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useI18n } from "@hooks/useI18n";
import { doTrack } from "@utils/dataTrack";
import { useSystemStore } from "@store/useSystemStore";
import { getRevertImage } from '@styles';

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
    clickItem
  } = props;
  const navigation = useNavigation();
  const { i18n, locale } = useI18n();
  const [isLogin, phone] = useSystemStore((s) => [!!s.token, s.phone]);

  return (
    <Pressable
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
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
              screen && navigation.push(screen, { ...parameters });
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
          source={
            rightIcon ? rightIcon : require("@assets/images/com_ic_right.png")
          }
          contentFit="cover"
          transition={200}
          style={[{ width: 15, height: 15 }, getRevertImage(locale)]}
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
          <Item {...item} itemStyle={itemStyle} clickItem={clickItem}/>
        )
      }
      keyExtractor={(item) => item.id || item.title}
      {...restProps}
    />
  );
};

export default FList;
