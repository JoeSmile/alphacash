import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useI18n } from "@hooks/useI18n";
import { getWritingDirectionStyle } from "@styles";

export const EXAMPLE_TYPES = {
  CNIC_CARD: "CNIC_CARD",
  CNIC_IN_HAND: "CNIC_IN_HAND",
  PROOF_EMPLOYMENT: "PROOF_EMPLOYMENT",
};

function ExampleImage({ type, i18n }) {
  let example = <></>;
  switch (type) {
    case EXAMPLE_TYPES.CNIC_CARD:
      example = (
        <View>
          <Text style={styles.label}>{i18n.t("CNIC Card Front")}</Text>
          <Image
            source={require("@assets/example/info_example_cnic_card_positive.png")}
            contentFit="cover"
            transition={1000}
            style={{
              width: 270,
              height: 170,
            }}
          />
          <Text style={{ ...styles.label, marginTop: 16 }}>
            {i18n.t("CNIC Card Back")}
          </Text>
          <Image
            source={require("@assets/example/info_example_cnic_card_negative.png")}
            contentFit="cover"
            transition={1000}
            style={{
              width: 270,
              height: 170,
              marginBottom: 64,
            }}
          />
        </View>
      );
      break;
    case EXAMPLE_TYPES.CNIC_IN_HAND:
      example = (
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Image
            source={require("@assets/example/info_example_cnic_hand_held.png")}
            contentFit="cover"
            transition={1000}
            style={{
              width: 270,
              height: 170,
            }}
          />
        </View>
      );
      break;
    case EXAMPLE_TYPES.PROOF_EMPLOYMENT:
      example = (
        <ScrollView style={{ height: 476, overflow: "scroll" }}>
          <Text style={styles.label}>{i18n.t("Work Scene")}:</Text>
          <Image
            source={require("@assets/example/info_example_work_scene.png")}
            contentFit="cover"
            transition={1000}
            style={{
              width: 270,
              height: 170,
            }}
          />
          <Text style={{ ...styles.label, marginTop: 16 }}>
            {i18n.t("Work Card")}:
          </Text>
          <Image
            source={require("@assets/example/info_example_work_card.png")}
            contentFit="cover"
            transition={1000}
            style={{
              width: 270,
              height: 170,
            }}
          />
          <Text style={{ ...styles.label, marginTop: 16 }}>
            {i18n.t("Other Certificates")}:
          </Text>
          <Image
            source={require("@assets/example/info_example_business_card.png")}
            contentFit="cover"
            transition={1000}
            style={{
              width: 270,
              height: 170,
              marginBottom: 64,
            }}
          />
        </ScrollView>
      );
      break;
  }
  return (
    <View>
      <Text style={styles.title}>{type == EXAMPLE_TYPES.PROOF_EMPLOYMENT ? i18n.t("Just upload any proof") : i18n.t("Example")}</Text>
      {example}
    </View>
  );
}

export function ExampleModal({ isVisible, onClose, type }) {
  const { i18n, locale } = useI18n();
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={[styles.container, getWritingDirectionStyle(locale)]}>
        <View style={styles.content}>
          <ExampleImage type={type} i18n={i18n} />
          <Pressable style={styles.closeBtnWrap} onPress={() => onClose("")}>
            <Text style={styles.closeBtn}>{i18n.t("I Know")}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    width: 294,
    position: "relative",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  closeBtnWrap: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    marginHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 20,
  },
  closeBtn: {
    height: 48,
    width: "100%",
    backgroundColor: "#0825B8",
    color: "white",
    fontSize: 16,
    lineHeight: 48,
    textAlign: "center",
    alignSelf: "center",
    borderRadius: 4,
  },
  label: {
    lineHeight: 20,
    marginBottom: 8,
    fontSize: 14,
    //fontWeight: "500",
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 16,
    color: "#0A233E",
    fontWeight: "500",
    lineHeight: 22,
  },
});
