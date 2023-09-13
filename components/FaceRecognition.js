import { View, Text, StyleSheet, Image } from "react-native";
import { useUserQuota } from "@store";
import { useI18n, LocaleTypes } from "@hooks/useI18n";
import { getRTLView, getRevertImage, getMarginRightOrLeft } from "../styles";

export default function FaceRecognition() {
  const faceImgName = useUserQuota((s) => s.faceData.name);
  const { i18n, locale } = useI18n();

  return (
    <View style={[styles.container, getRTLView(locale)]}>
      <Image
        source={require("@assets/applyLoan/loan_ic_face_recognition.png")}
        style={{ width: 35, height: 35 }}
      />
      <View style={[styles.contentStyle, getMarginRightOrLeft(locale, 0, 12)]}>

        <Text style={{ fontSize: 15, color: "#4F5E6F", fontWeight: 500 }}>
          {i18n.t("Face Recognition")}
        </Text>

        <Text
          style={{
            color: !faceImgName ? "#0A233E" : "#01AE01",
            fontWeight: "bold",
            marginTop: 8,
            fontSize: 15,
          }}
        >
          {i18n.t(!faceImgName ? "Please Identify" : "Passed")}
        </Text>
      </View>
      <Image
        source={require("@assets/applyLoan/com_ic_right.png")}
        style={[{ width: 15, height: 15 }, getRevertImage(locale)]}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    padding: 12,
    marginTop: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3,
  },

  contentStyle: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
});
