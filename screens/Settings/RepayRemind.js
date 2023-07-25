import { View, Switch, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import { useSystemStore } from "@store/useSystemStore";

export const RepayRemind = (item) => {
  const [isOn, setOn] = useSystemStore((s) => [
    s.isRepayReminderOn,
    s.setRepayReminderOn,
  ]);
  const [isEnabled, setIsEnabled] = useState(isOn);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  useEffect(() => {
    setOn(isEnabled);
  }, [isEnabled]);

  return (
    <View
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={item.leftIcon}
          contentFit="cover"
          transition={1000}
          style={{
            width: 24,
            height: 24,
            marginRight: 12,
          }}
        />
        <Text style={{ color: "#0A233E", fontSize: 16 }}>还款提醒</Text>
      </View>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};
