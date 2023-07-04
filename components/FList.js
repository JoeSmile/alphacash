import { Text, FlatList, Pressable, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Item = (props) => {
  const { title, screen, leftItem, displayIcon = true, itemStyle = {} } = props;
  const navigation = useNavigation();
  console.log('itemStyle', itemStyle)
  return (
    <Pressable
      style={[{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 30,
        alignItems: "center",
        marginBottom: 20,
        paddingHorizontal: 20,
      }, itemStyle]}
      onPress={() => {
        screen && navigation.push(screen);
      }}
    >

      {!!leftItem ? (
        leftItem(props)
      ) : (
        <Text style={{ fontSize: 16 }}>{title}</Text>
      )}

      {displayIcon && <Image
        source={require('@assets/images/triangle_right.svg')}
        contentFit="cover"
        transition={1000}
        style={{
          width: 16,
          height: 16
        }}
      />}

    </Pressable>
  );
};

const FList = ({ data, itemStyle, ...restProps }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) =>
        item.render ? item.render(item) : <Item {...item} itemStyle={itemStyle} />
      }
      keyExtractor={(item) => item.id || item.title}
      {...restProps}
    />
  );
};

export default FList;
