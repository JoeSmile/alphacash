import { Text, FlatList, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useI18n } from "@hooks/useI18n";

const Item = (props) => {
  const { title, screen, leftItem, displayIcon = true, itemStyle = {}, rightIcon='' } = props;
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
        screen && navigation.push(screen);
      }}
    >
      {!!leftItem ? (
        leftItem(props)
      ) : (
        <Text style={{ fontSize: 16 }}>{i18n.t(title)}</Text>
      )}
      {
        displayIcon && <Image
        source={rightIcon ? rightIcon : require("@assets/images/com_ic_right.png")}
        contentFit="cover"
        transition={200}
        style={{ width: 15, height: 15 }}
      />
      }
      
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
