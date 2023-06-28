import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Item = ({ title }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => [
        navigation.push("BillDetail", {
          title: title,
        }),
      ]}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default function BillList({ bills }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={bills}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
