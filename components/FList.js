import { Text, FlatList, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from 'expo-image';

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
        marginBottom: 10,

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

      <Image
        source={require('@assets/images/triangle_right.svg')}
        contentFit="cover"
        transition={200}
        style={{ width: 20, height: 20 }}
      />
    

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
