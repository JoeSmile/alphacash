import { View, Switch, Text, Image, StyleSheet, Pressable } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useSystemStore } from "@store/useSystemStore";
import FModal from "@components/FModal";
import { useI18n } from "@hooks/useI18n";

export const RepayRemind = (item) => {
  const { i18n } = useI18n();

  const [isOn, setOn] = useSystemStore((s) => [
    s.isRepayReminderOn,
    s.setRepayReminderOn,
  ]);
  const [isEnabled, setIsEnabled] = useState(isOn);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSwitch = useCallback(() => {
    if (isEnabled) {
      setModalVisible(true);
    } else {
      setIsEnabled(!isEnabled);
      setOn(!isEnabled);
    }
  }, [isEnabled]);

  const closeReminder = useCallback(() => {
    setModalVisible(false);
    setIsEnabled(false);
    setOn(false);
  }, []);

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
        <Text style={{ color: "#0A233E", fontSize: 16 }}>{i18n.t(item.title)}</Text>
      </View>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <FModal
        isOpen={modalVisible}
        displayClose={false}
        header={null}
        body={
          <Text style={styles.tip}>
          {
            i18n.t('Are you sure you want to turn off the repayment tips?')
          }
          </Text>
        }
        footer={
          <>
            <Pressable
              style={[styles.button, styles.buttonRefuse]}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.btnText}>{i18n.t('Cancel')}</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={closeReminder}
            >
              <Text style={styles.btnText}>{i18n.t('Confirm')}</Text>
            </Pressable>
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tip: {
    fontSize: 16,
    lineHeight: 23,
    color: "#0A233E",
    textAlign: "center",
  },
  button: {
    borderRadius: 3,
    padding: 12,
    elevation: 2,
    flex: 1,
  },
  buttonOpen: {
    backgroundColor: "#0825B8",
  },
  buttonRefuse: {
    backgroundColor: "#C0C4D6",
  },
  btnText: {
    fontSize: 16,
    lineHeight: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
