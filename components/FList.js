import { Text, FlatList, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useI18n } from "@hooks/useI18n";
import { doTrack } from "@utils/dataTrack";

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
  } = props;
  const navigation = useNavigation();
  const { i18n } = useI18n();

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
        screen && navigation.push(screen, { ...parameters });
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
          style={{ width: 15, height: 15 }}
        />
      )}
    </Pressable>
  );
};

const FList = ({ data, itemStyle, ...restProps }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) =>
        item.render ? (
          item.render(item)
        ) : (
          <Item {...item} itemStyle={itemStyle} />
        )
      }
      keyExtractor={(item) => item.id || item.title}
      {...restProps}
    />
  );
};

export default FList;
