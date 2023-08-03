import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import SafeIntro from "./SafeIntro";
import { useEffect, useState } from "react";
import { EXAMPLE_TYPES, ExampleModal } from "./ExampleModal";
import Return from "./Return";
import { useGetIdentityInfoDetail, useUpdateIdentityInfo } from "@apis";
import * as ImagePicker from "expo-image-picker";
import { Asset } from "expo-asset";
import { useI18n } from "@hooks/useI18n";
import mime from "mime";
import { Image } from "expo-image";
import { Camera, CameraType } from "expo-camera";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";
import { useUserQuota } from "@store/useUserQuota";


const imageUri = require("@assets/images/info_pic_cnic_card_positive.png");
const imageUri1 = require("@assets/images/info_pic_cnic_card_negative.png");
const imageUri2 = require("@assets/images/info_pic_holding_id_card.png");
const imageUri3 = require("@assets/images/info_pic_work_permit.png");

export default function Certificate() {
  const [bill] = useUserQuota((s) => [
    s.bill,
  ]);
  const navigation = useNavigation();
  const [showModalType, setShowModalType] = useState("");
  const {
    mutate: getIdentityInfo,
    data: identityInfo,
    isLoading: isIdentityInfoLoading,
  } = useGetIdentityInfoDetail();
  const {
    mutate: updateIdentityInfo,
    data: updateIdentityInfoResponse,
    isLoading: isUpdateIdentityInfoLoading,
  } = useUpdateIdentityInfo();
  const { i18n } = useI18n();
  const [imageList, setImage] = useState([]);
  const [showTips, setShowTips] = useState(false);
  const [index, setIndex] = useState();
  const [jumpPage, setJumpPage] = useState('MyCards')
  // const [permission, requestPermission] = Camera.useCameraPermissions();

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //   })();
  // }, [permission]);

  useEffect(() => {
    getIdentityInfo();
  }, []);

  useEffect(() => {
    if (identityInfo?.data?.error_code == 1) {
      const imageData = identityInfo.data.data?.identityInfo || {};
      if (
        imageData.cnicFront &&
        imageData.cnicBack &&
        imageData.cnicInHand &&
        imageData.employmentProof
      ) {
        const imgCnicFront = {
          uri: imageData.cnicFront,
          type: mime.getType(imageData.cnicFront),
          name: imageData.cnicFront.split("/").pop(),
        };
        const imgCnicBack = {
          uri: imageData.cnicBack,
          type: mime.getType(imageData.cnicBack),
          name: imageData.cnicBack.split("/").pop(),
        };
        const imgCnicInHand = {
          uri: imageData.cnicInHand,
          type: mime.getType(imageData.cnicInHand),
          name: imageData.cnicInHand.split("/").pop(),
        };
        const imgEmploymentProof = {
          uri: imageData.employmentProof,
          type: mime.getType(imageData.employmentProof),
          name: imageData.employmentProof.split("/").pop(),
        };
        console.log(
          "Sun >>> " +
            imgCnicFront.uri +
            ">>>>>>" +
            imgCnicFront.type +
            ">>>>>>>>" +
            imgCnicFront.name
        );
        setImage([
          imgCnicFront,
          imgCnicBack,
          imgCnicInHand,
          imgEmploymentProof,
        ]);
      } else {
        setJumpPage('Homepage')
      }
    }
  }, [identityInfo]);

  useEffect(() => {
    if (updateIdentityInfoResponse?.data?.error_code == 1) {
      console.log("Sun >>>>>>>>>> updateIdentityInfoResponse");
      navigation.push(jumpPage);
    }
  }, [updateIdentityInfoResponse]);

  const showPickImageModel = (id) => {
    if((bill.appStatus == 101 || bill.appStatus == 201 || bill.appStatus == 301 || bill.appStatus == 303) && (id == 0 || id == 1 || id == 2) ){
      //当有用户贷款行为时（审核中、打款中、使用中、逾期）或该用户变为老用户后，与姓名+CNIC+身份证正反面+手持照片不可修改
       return;
    }
    setShowTips(true);
    setIndex(id);
  };

  const pickImage = async () => {
    setShowTips(false);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,//是否允许裁剪
      quality: 0.75,
    });

    if (result.canceled) {
      return;
    }

    let updatedImages = [...imageList];
    const imgUri = result.assets[0].uri;
    console.log("Sun imgUri =>>> " + imgUri);
    const img = {
      uri: imgUri,
      type: mime.getType(imgUri),
      name: imgUri.split("/").pop(),
    };
    updatedImages[index] = img;
    setImage(updatedImages);
  };

  const takePhoto = async () => {
    setShowTips(false);

    const result = await ImagePicker.launchCameraAsync({
      // allowsEditing: true,
    });

    if (result.canceled) {
      return;
    }

    let updatedImages = [...imageList];
    const imgUri = result.assets[0].uri;
    console.log("Sun imgUri =>>> " + imgUri);
    const img = {
      uri: imgUri,
      type: mime.getType(imgUri),
      name: imgUri.split("/").pop(),
    };
    updatedImages[index] = img;
    setImage(updatedImages);
  };

  const onClickUpdateIdentityInfo = () => {
    console.log("Sun >>>>>>>>>> onClickUpdateIdentityInfo");

    const params = {
      cnicFront: imageList[0],
      cnicBack: imageList[1],
      cnicInHand: imageList[2],
      employmentProof: imageList[3],
    };
    updateIdentityInfo(params);
  };

  return (
    <ScrollView style={styles.container}>
      <Spinner
        visible={isIdentityInfoLoading || isUpdateIdentityInfoLoading}
        textContent={i18n.t('Loading')}
        textStyle={{ color: "#FFF" }}
      />
      <SafeIntro
        safeText={i18n.t(
          "Upload credential information, only for user identity verification, we will encrypt and store it, and it will never be used for other purposes!"
        )}
      />

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
          <Text style={styles.boldTextStyle}>{i18n.t("CNIC Card")}</Text>

          <Pressable onPress={() => setShowModalType(EXAMPLE_TYPES.CNIC_CARD)}>
            <Text style={styles.underlineText}>{i18n.t("Example")}</Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 15,
          }}
        >
          <Pressable
            onPress={() => showPickImageModel(0)}
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                width: 166,
                padding: 8,
                backgroundColor: "#F4F5F7",
                borderRadius: 4,
              }}
            >
              <Image
                style={{
                  height: 96,
                  width: 150,
                }}
                source={imageList[0] ? imageList[0].uri : imageUri}
                contentFit="contain"
                transition={500}
              />
            </View>
            <Text
              style={{
                fontSize: 12,
                color: "#8899AC",
                alignSelf: "center",
                marginTop: 6,
              }}
            >
              CNIC Card Front
            </Text>
          </Pressable>
          <Pressable
            onPress={() => showPickImageModel(1)}
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                width: 166,
                padding: 8,
                backgroundColor: "#F4F5F7",
                borderRadius: 4,
              }}
            >
              <Image
                style={{
                  height: 96,
                  width: 150,
                }}
                source={imageList[1] ? imageList[1].uri : imageUri1}
                contentFit="contain"
                transition={500}
              />
            </View>
            <Text
              style={{
                fontSize: 12,
                color: "#8899AC",
                alignSelf: "center",
                marginTop: 6,
              }}
            >
              CNIC Card Back
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.shadowContent}></View>

      {/* in hand */}
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 18,
            marginBottom: 15,
          }}
        >
          <Text style={styles.boldTextStyle}>
            {i18n.t("Take photo with CNIC card in hand")}
          </Text>
          <Pressable
            onPress={() => setShowModalType(EXAMPLE_TYPES.CNIC_IN_HAND)}
          >
            <Text style={styles.underlineText}>{i18n.t("Example")}</Text>
          </Pressable>
        </View>

        <Pressable
          style={{
            width: 166,
            padding: 8,
            backgroundColor: "#F4F5F7",
            borderRadius: 4,
          }}
          onPress={() => showPickImageModel(2)}
        >
          <Image
            style={{
              height: 96,
              width: 150,
            }}
            source={imageList[2] ? imageList[2].uri : imageUri2}
            contentFit="contain"
            transition={500}
          />
        </Pressable>
      </View>

      <View style={styles.shadowContent}></View>

      {/* proof employment */}
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 18,
            marginBottom: 15,
          }}
        >
          <Text style={styles.boldTextStyle}>{i18n.t("Proof Employment")}</Text>
          <Pressable
            onPress={() => setShowModalType(EXAMPLE_TYPES.PROOF_EMPLOYMENT)}
          >
            <Text style={styles.underlineText}>{i18n.t("Example")}</Text>
          </Pressable>
        </View>
        <Pressable
          style={{
            width: 166,
            padding: 8,
            backgroundColor: "#F4F5F7",
            borderRadius: 4,
          }}
          onPress={() => showPickImageModel(3)}
        >
          <Image
            style={{
              height: 96,
              width: 150,
            }}
            source={imageList[3] ? imageList[3].uri : imageUri3}
            contentFit="contain"
            transition={500}
          />
        </Pressable>
      </View>

      <Pressable
        style={{
          height: 46,
          marginTop: 24,
          marginBottom: 15,
          marginHorizontal: 0,
          backgroundColor: "#0825B8",
          borderRadius: 3,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
        }}
        onPress={() => onClickUpdateIdentityInfo()}
      >
        <Text
          style={{
            textAlign: "center",
            borderRadius: 3,
            height: 46,
            lineHeight: 46,
            color: "#FFFFFF",
            backgroundColor: "#0825B8",
            fontSize: 15,
          }}
        >
          {" "}
          {i18n.t("Next")}{" "}
        </Text>
        <Image
          source={require("@assets/images/btn_ic_right.png")}
          style={{ width: 12, height: 12 }}
        />
      </Pressable>

      <ExampleModal
        isVisible={!!showModalType}
        onClose={() => setShowModalType("")}
        type={showModalType}
      />

      <Modal visible={showTips} animationType="none" transparent={true}>
        <View style={styles.otherContainer}>
          <View style={styles.photoViewStyle}>
            <Pressable
              onPress={() => takePhoto()}
              style={{
                flex: 1,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 15, color: "#0A233E" }}
              >
                Camera
              </Text>
            </Pressable>

            <View
              style={{ width: "100%", height: 1, backgroundColor: "#F4F5F7" }}
            ></View>

            <Pressable
              onPress={() => pickImage()}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 15, color: "#0A233E" }}
              >
                Choose From Album
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Return />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
    height: "100%",
  },
  submitBtn: {
    height: 50,
    borderRadius: 3,
    color: "white",
  },

  boldTextStyle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0A233E",
  },

  shadowContent: {
    height: 4,
    backgroundColor: "#F4F5F7",
    opacity: 1,
    marginTop: 18,
  },

  underlineText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0825B8",
    textDecorationLine: "underline",
  },

  tipStyle: {
    width: "82%",
    height: 220,
    paddingHorizontal: 12,
    paddingTop: 18,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  otherContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  photoViewStyle: {
    position: "absolute",
    bottom: 0,
    opacity: 1,
    height: 156,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "column",
  },
});
