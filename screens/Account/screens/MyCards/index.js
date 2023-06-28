import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import CardList from "./CardList";

export default function MyCards({ navigation }) {
  return (
    <View>
      <View>
        <Pressable onPress={() => navigation.push("CardForm")}>
          <Text>添加收款账号</Text>
        </Pressable>
      </View>
      <CardList />
    </View>
  );
}
