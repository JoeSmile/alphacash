import { Image, View, Text, Pressable, StyleSheet, Button } from "react-native";
import SafeIntro from "./SafeIntro";
import { useState } from "react";
import { EXAMPLE_TYPES, ExampleModal } from "./ExampleModal";
import Return from './Return';

export default function Certificate() {
  const [showModalType, setShowModalType] = useState("");
  return (
    <View style={styles.container}>
      <SafeIntro safeText="Upload credential information, only for user identity verification, we will encrypt and store it, and it will never be used for other purposes!" />

      {/* CNIC card */}
      <View
        style={{
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <Text>CNIC Card</Text>

          <Pressable onPress={() => setShowModalType(EXAMPLE_TYPES.CNIC_CARD)}>
            <Text>Example</Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 15,
          }}
        >
          <Pressable
            style={{
              flex: 1,
            }}
          >
            <View>
              <Image
                style={{
                  height: 96,
                  width: 150,
                }}
                source={require("@assets/images/info_pic_cnic_card_positive.png")}
                contentFit="cover"
              />
              <Text>CNIC Card Front</Text>
            </View>
          </Pressable>
          <Pressable
            style={{
              flex: 1,
            }}
          >
            <View>
              <Image
                style={{
                  height: 96,
                  width: 150,
                }}
                source={require("@assets/images/info_pic_cnic_card_negative.png")}
                contentFit="cover"
              />
              <Text>CNIC Card Back</Text>
            </View>
          </Pressable>
        </View>
      </View>

      {/* in hand */}
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <Text>Take photo with CNIC card in hand</Text>
          <Pressable
            onPress={() => setShowModalType(EXAMPLE_TYPES.CNIC_IN_HAND)}
          >
            <Text>Example</Text>
          </Pressable>
        </View>
        <View>
          <Image
            style={{
              height: 96,
              width: 150,
            }}
            source={require("@assets/images/info_pic_holding_id_card.png")}
            contentFit="cover"
          />
        </View>
      </View>

      {/* proof employment */}
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <Text>Proof Employment</Text>
          <Pressable
            onPress={() => setShowModalType(EXAMPLE_TYPES.PROOF_EMPLOYMENT)}
          >
            <Text>Example</Text>
          </Pressable>
        </View>
        <View>
          <Image
            style={{
              height: 96,
              width: 150,
            }}
            source={require("@assets/images/info_pic_work_permit.png")}
            contentFit="cover"
          />
        </View>
      </View>

      <View style={{ width: 300, alignSelf: "center" }}>
        <Button type="submit" style={styles.submitBtn} title="Submit" />
      </View>
      <ExampleModal
        isVisible={!!showModalType}
        onClose={() => setShowModalType("")}
        type={showModalType}
      />
      <Return />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
  },
  submitBtn: {
    height: 50,
    borderRadius: 3,
    color: "white",
  },
});
