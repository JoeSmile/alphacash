import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import CardList from "./CardList";

export default function MyCards({ navigation, route }) {
  return (
    <View style={{
      paddingVertical: 20,
      paddingHorizontal: 15,
      backgroundColor: 'white',
      minHeight: '100%'
    }}> 
    <CardList navigation={navigation} route={route}/>
    </View>
  );
}
