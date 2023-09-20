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
import {
  useGetIdentityInfoDetail,
  useUpdateIdentityInfo,
  useUpdateBillUserImages,
  useGetAccounts,
  useGetUserFormStatus
} from "@apis";
import * as ImagePicker from "expo-image-picker";
import { useI18n } from "@hooks/useI18n";
import { useAbleImage } from "@hooks/useAbleImage";
import mime from "mime";
import { Image } from "expo-image";
import { Camera, CameraType } from "expo-camera";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";
import { useUserQuota } from "@store/useUserQuota";
import { Toast } from "@ant-design/react-native";
import { doTrack } from "@utils/dataTrack";
import { getWritingDirectionStyle, getRevertImage, getRTLView } from "@styles";
import { FButton } from "@components/FButton";

const imageUri = require("@assets/images/info_pic_cnic_card_positive.png");
const imageUri1 = require("@assets/images/info_pic_cnic_card_negative.png");
const imageUri2 = require("@assets/images/info_pic_holding_id_card.png");
const imageUri3 = require("@assets/images/info_pic_work_permit.png");

export default function Certificate({ route }) {
  const [cashLoan, bill] = useUserQuota((s) => [s.cashLoan, s.bill]);
  const navigation = useNavigation();
  const [showModalType, setShowModalType] = useState("");

  const {
    mutate: getIdentityInfo,
    data: identityInfo,
    isLoading: isIdentityInfoLoading,
  } = useGetIdentityInfoDetail();

  // 没有错误，直接更新
  const {
    mutate: updateIdentityInfo,
    data: updateIdentityInfoResponse,
    isLoading: isUpdateIdentityInfoLoading,
  } = useUpdateIdentityInfo();

  // 申请bill中有错误，需要修改
  const {
    mutate: updateBillUserImages,
    data: updateBillUserImagesResponse,
    isLoading: isUpdateBillUserImagesLoading,
  } = useUpdateBillUserImages();

  const { mutate: getAccounts, data: cards, isLoading } = useGetAccounts();

  const { i18n, locale } = useI18n();
  const [imageList, setImage] = useState([]);
  const [showTips, setShowTips] = useState(false);
  const [index, setIndex] = useState();
  const [pickedFromAlbum, setPickedFromAlbum] = useState(false);
  const [jumpPage, setJumpPage] = useState("MyCards");
  // 没有错误，直接更新
  const [isUpdate, setIsUpdate] = useState(false);
  // 申请bill中有错误，需要修改
  const [isModify, setIsModify] = useState(false);
  const [modifycnicBack, setModifycnicBack] = useState(false);
  const [modifycnicFront, setModifycnicFront] = useState(false);
  const [modifycnicInHand, setModifycnicInHand] = useState(false);
  const [modifyemploymentProof, setModifyemploymentProof] = useState(false);
  const [hasCards, setHasCards] = useState(false);
  const editAble = useAbleImage();
  const [fromScreen, setFromScreen] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [isUploading, setUploading] = useState(false);

  // const [permission, requestPermission] = Camera.useCameraPermissions();

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //   })();
  // }, [permission]);

  useEffect(() => {
    getIdentityInfo();
    getAccounts();
  }, []);

  useEffect(() => {
    if(!modifycnicBack && !modifycnicFront && !modifycnicInHand && !modifyemploymentProof && imageList.length == 4) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [modifycnicBack, modifycnicFront, modifycnicInHand, modifyemploymentProof, imageList])

  useEffect(() => {
    if (cards && cards.data && Array.isArray(cards.data.data) && cards.data.data.length > 0) {
      setHasCards(true);
    } else {
      setHasCards(false);
    }
  }, [cards]);

  useEffect(() => {
    const isUpdate = route.params ? route.params.isUpdate : false;
    const isModify = route.params ? route.params.isModify : false;
    console.log('Sun >>> isUpdate == ' + isUpdate + "isModify == " + isModify)
    const fromScreen = route.params ? route.params.fromScreen : "";
    setFromScreen(fromScreen);
    setIsUpdate(!!isUpdate);
    setIsModify(!!isModify);
  }, [route]);

  useEffect(() => {
    if (identityInfo?.data?.error_code == 1) {
      const imageData = identityInfo.data.data?.identityInfo || {};
      const needModifyInfo = {
        cnicBack: false,
        cnicFront: false,
        cnicInHand: false,
        employmentProof: false,
        ...(identityInfo.data.data?.needModifyInfo || {}),
      };
      setModifycnicBack(needModifyInfo.cnicBack);
      setModifycnicFront(needModifyInfo.cnicFront);
      setModifycnicInHand(needModifyInfo.cnicInHand);
      setModifyemploymentProof(needModifyInfo.employmentProof);

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
          "Sun >>> uri = " +
            imgCnicFront.uri +
            ">>>>>> type =" +
            imgCnicFront.type +
            ">>>>>>>> name = " +
            imgCnicFront.name
        );
        setImage([
          imgCnicFront,
          imgCnicBack,
          imgCnicInHand,
          imgEmploymentProof,
        ]);
      }
    }
  }, [identityInfo]);

  // 首次添加 或 更改图片
  useEffect(() => {
    if (updateIdentityInfoResponse?.data?.error_code == 1) {
      setUploading(false);
      console.log("Sun >>>>>>>>>> updateIdentityInfoResponse");
      if (isUpdate) {
        navigation.goBack();
      } else {
        //1. 点击apply,跳转到个人信息
        if (fromScreen == "Apply") {
          if (hasCards) {
            navigation.push("Apply");
          } else {
            // 如果没有收款账号，就跳转到 添加新收款账号
            navigation.push("AddNewAccount", { fromScreen: "Apply",card: {} });
          }
        } else {
          if (hasCards) {
            navigation.push("Credentials");
          } else {
             // 如果没有收款账号，就跳转到 添加新收款账号
             navigation.push("AddNewAccount", { fromScreen: "",card: {} });
          }
        }
      }
    }
  }, [updateIdentityInfoResponse]);

  //bill中有错 修改错误图片
  useEffect(() => {
    if (updateBillUserImagesResponse?.data?.error_code == 1) {
      console.log("0.0 >>>>>>>>>> updateBillUserImagesResponse");
      Toast.info({
        content: i18n.t("modify successfully"),
        duration: 3,
      });
      setUploading(false);
      navigation.push("Homepage");
    }
  }, [updateBillUserImagesResponse]);

  const showPickImageModel = (id) => {
    let hasError = false;

    switch(id) {
      case 0:
        hasError = modifycnicFront;
        break;
      case 1:
        hasError = modifycnicBack ;
        break;
      case 2:
        hasError = modifycnicInHand;
        break;
      case 3:
        setShowTips(true);
        setIndex(id);
        return;
    }
    if (hasError) {
      setShowTips(true);
      setIndex(id);
      return;
    }

    if (!editAble) {
      Toast.info({
        content: "There is no problem with this image and no need re-upload",
        duration: 2,
      });
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

    switch(index) {
      case 0:
        setModifycnicFront(false);
        break;
      case 1:
        setModifycnicBack(false);
        break;
      case 2:
        setModifycnicInHand(false);
        break;
      case 3:
        setModifyemploymentProof(false);
        break;
    }
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
    switch(index) {
      case 0:
        setModifycnicFront(false);
        break;
      case 1:
        setModifycnicBack(false);
        break;
      case 2:
        setModifycnicInHand(false);
        break;
      case 3:
        setModifyemploymentProof(false);
        break;
    }
    setImage(updatedImages);
  };

  const onClickUpdateIdentityInfo = () => {
    setUploading(true);
    doTrack("pk40", 1);
    const params = {
      cnicFront: imageList[0],
      cnicBack: imageList[1],
      cnicInHand: imageList[2],
      employmentProof: imageList[3],
    };
    console.log('Sun >>> isUpdate == ' + isUpdate + "isModify == " + isModify)
    if (isModify) {
      updateBillUserImages(params);
    } else {
      updateIdentityInfo(params);
    }
  };

  return (
    <ScrollView style={[styles.container, getWritingDirectionStyle(locale)]}>
      <Spinner
        visible={
          isIdentityInfoLoading ||
          isUpdateIdentityInfoLoading ||
          isUpdateBillUserImagesLoading
        }
        textContent={i18n.t("Loading")}
        textStyle={{ color: "#FFF" }}
      />
      <SafeIntro
        safeText={i18n.t(
          "Upload credential information, only for user identity verification, we will encrypt and store it, and it will never be used for other purposes!"
        )}
      />
      <View style={{ padding: 0 }}>
        {/* CNIC card */}
        <View
          style={{
            paddingHorizontal: 12,
            marginTop: 20,
          }}
        >
          <View
            style={[{
              justifyContent: "space-between",
              marginBottom: 12,
            },  getRTLView(locale)]}
          >
            <Text style={styles.boldTextStyle}>{i18n.t("CNIC Card")}</Text>
            <Pressable
              onPress={() => setShowModalType(EXAMPLE_TYPES.CNIC_CARD)}
            >
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
                  padding: 6,
                  backgroundColor: modifycnicFront? "#EF3C3429" : "#F4F5F7",
                  borderWidth: 2,
                  borderRadius: 4,
                  borderColor: modifycnicFront ? "#EF3C34" : "white",
                }}
              >
                <Image
                  style={{
                    height: 96,
                    width: 150,
                  }}
                  source={imageList[0] ? imageList[0].uri : imageUri}
                  contentFit="cover"
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
                {i18n.t("CNIC Card Front")}
              </Text>
              { modifycnicFront && <Text
               style={{
                fontSize: 12,
                color: "#EF3C34",
                alignSelf: "center",
                marginTop: 6,
                fontWeight:'bold'
              }}>
                {i18n.t("Need modify")}
              </Text>}
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
                  padding: 6,
                  backgroundColor: modifycnicBack ? "#EF3C3429" : "#F4F5F7",
                  borderWidth: 2,
                  borderRadius: 4,
                  borderColor: modifycnicBack ? "#EF3C34" : "white",
                }}
              >
                <Image
                  style={{
                    height: 96,
                    width: 150,
                  }}
                  source={imageList[1] ? imageList[1].uri : imageUri1}
                  contentFit="cover"
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
                {i18n.t("CNIC Card Back")}
              </Text>
              { modifycnicBack && <Text
               style={{
                fontSize: 12,
                color: "#EF3C34",
                alignSelf: "center",
                marginTop: 6,
                fontWeight:'bold'
              }}>
                {i18n.t("Need modify")}
              </Text>}
            </Pressable>
          </View>
        </View>

        <View style={styles.shadowContent}></View>

        {/* in hand */}
        <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
          <View
            style={[{
              justifyContent: "space-between",
              marginBottom: 12,
            },  getRTLView(locale)]}
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
              padding: 6,
              backgroundColor: modifycnicInHand ? "#EF3C3429" : "#F4F5F7",
              borderWidth: 2,
              borderRadius: 4,
              borderColor: modifycnicInHand ? "#EF3C34" : "white",
            }}
            onPress={() => showPickImageModel(2)}
          >
            <Image
              style={{
                height: 96,
                width: 150,
              }}
              source={imageList[2] ? imageList[2].uri : imageUri2}
              contentFit="cover"
              transition={500}
            />
          </Pressable>
          { modifycnicInHand && <Text
               style={{
                fontSize: 12,
                color: "#EF3C34",
                marginHorizontal: 48,
                marginTop: 6,
                fontWeight:'bold'
              }}>
                {i18n.t("Need modify")}
              </Text>}
        </View>

        <View style={styles.shadowContent}></View>

        {/* proof employment */}
        <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
          <View
            style={[{
              justifyContent: "space-between",
              marginBottom: 12,
            }, getRTLView(locale)]}
          >
            <Text style={styles.boldTextStyle}>
              {i18n.t("Proof Employment")}
            </Text>
            <Pressable
              onPress={() => setShowModalType(EXAMPLE_TYPES.PROOF_EMPLOYMENT)}
            >
              <Text style={styles.underlineText}>{i18n.t("Example")}</Text>
            </Pressable>
          </View>
          <Pressable
            style={{
              width: 166,
              padding: 6,
              backgroundColor: modifyemploymentProof ? "#EF3C3429" : "#F4F5F7",
              borderWidth: 2,
              borderRadius: 4,
              borderColor: modifyemploymentProof ? "#EF3C34" : "white",
            }}
            onPress={() => showPickImageModel(3)}
          >
            <Image
              style={{
                height: 96,
                width: 150,
              }}
              source={imageList[3] ? imageList[3].uri : imageUri3}
              contentFit="cover"
              transition={500}
            />
          </Pressable>
          { modifyemploymentProof && <Text
               style={{
                fontSize: 12,
                color: "#EF3C34",
                marginHorizontal: 48,
                marginTop: 6,
                fontWeight:'bold'
              }}>
                {i18n.t("Need modify")}
              </Text>}
        </View>
        <FButton 
          disabled={isUploading && canSubmit}
          title = "Submit"
          onPress={onClickUpdateIdentityInfo}
          style={{
            backgroundColor:  !isUploading && canSubmit ? "#0825B8" : '#C0C4D6',
            marginHorizontal: 15,
            marginVertical: 20
          }}
        />
      </View>
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
      <View style={{ paddingHorizontal: 15 }}>
        <Return trackName={"pk5"} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  submitBtn: {
    height: 50,
    borderRadius: 3,
    color: "white",
  },

  boldTextStyle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0A233E",
  },

  shadowContent: {
    height: 4,
    backgroundColor: "#F4F5F7",
    marginTop: 24,
  },

  underlineText: {
    fontSize: 15,
    fontWeight: "600",
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
