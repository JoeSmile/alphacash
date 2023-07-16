import React, { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import CardList from "./CardList";

export default function MyCards({ navigation }) {
  return (
    <View style={{
      paddingVertical: 20,
      paddingHorizontal: 15,
      backgroundColor: 'white',
      minHeight: '100%'
    }}>
      <View style={{
        height: 62,
        padding: 15,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#C0C4D6',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
      }}>
        <Image source={require("@assets/images/loan_ic_add.png")}
          contentFit="cover"
          transition={200}
          style={{ width: 15, height: 15, marginRight: 5 }}/>
          <Text style={{
            color: '#0A233E',
            fontSize: 16,
            fontWeight: 'bold'
          }}>Add Collection Account</Text>
      </View>
          
      <CardList />
    </View>
  );
}
