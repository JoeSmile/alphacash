import { Text, FlatList, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Item = (props) => {
  const { title, screen, leftItem, displayIcon = true } = props;
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        borderBottomWidth: "1px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "30px",
        alignItems: "center",
        marginBottom: "20px",
        paddingHorizontal: "20px",
      }}
      onPress={() => {
        screen && navigation.push(screen);
      }}
    >
      {!!leftItem ? (
        leftItem(props)
      ) : (
        <Text style={{ fontSize: "18px" }}>{title}</Text>
      )}

      {displayIcon && <AntDesign name="right" size={24} color="black" />}
    </Pressable>
  );
};

const FList = ({ data, ...restProps }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) =>
        item.render ? item.render(item) : <Item {...item} />
      }
      keyExtractor={(item) => item.id || item.title}
      {...restProps}
    />
  );
};

export default FList;
