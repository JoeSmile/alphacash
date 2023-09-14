import { View, Text, StyleSheet } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { useEffect, useState, useRef, useMemo } from "react";
import { useUserQuota } from "@store";
//import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { useI18n } from "@hooks/useI18n";
import { useUpdateBillUserImages } from "@apis";
import Spinner from "react-native-loading-spinner-overlay";
import { Toast } from "@ant-design/react-native";
import { doTrack } from "@utils/dataTrack";

let leftShake = false;
let rightShake = false;
let timer;

export default function FaceDetectionScreen({ route, navigation }) {
  const { i18n } = useI18n();
  const [shakeTip, faceTip] = useMemo(
    () => [
      i18n.t("Please shake left, then right"),
      i18n.t("Please face the screen"),
    ],
    []
  );

  const cameraRef = useRef(null);
  const [permission] = Camera.useCameraPermissions();
  const [tips, setTips] = useState(shakeTip);
  const [size, setSize] = useState(); // 相机默认用最大的size
  const store = useUserQuota();

  const {
    mutate: updateBillUserImages,
    data: updateBillUserImagesResponse,
    isLoading: isUpdateBillUserImagesLoading,
  } = useUpdateBillUserImages();

  const isModify = route.params ? route.params.isModify : false;

  useEffect(() => {
    const getAvailablePictureSizes = async () => {
      const sizes = await cameraRef.current?.getAvailablePictureSizesAsync(
        "1:1"
      );

      console.log("AvailablePictureSizes: ", sizes);
      setSize(sizes[Math.floor(sizes.length / 3)]); // 选择大小适中的
    };

    if (permission) {
      cameraRef.current?.resumePreview();
      setTimeout(getAvailablePictureSizes, 800);
    } else {
      Camera.requestCameraPermissionsAsync();
    }
  }, [permission]);

  useEffect(() => {
    if (updateBillUserImagesResponse?.data?.error_code == 1) {
      Toast.info({
        content: i18n.t("Successful face recognition"),
        duration: 3,
      });
      navigation.goBack();
    }
  }, [updateBillUserImagesResponse]);

  const isSmiling = (face) => {
    // 0.6 是一个基准值，可以根据实际情况进行调整
    return face.smilingProbability > 0.8;
  };

  const isBlinkingFace = (face) => {
    // 0.3 是一个基准值，可以根据实际情况进行调整
    return (
      face.leftEyeOpenProbability < 0.2 || face.rightEyeOpenProbability < 0.2
    );
  };

  const isLeftShakeFace = (face) => {
    // 这里的阈值可以根据实际情况进行调整
    const yawThreshold = 300;
    return Math.abs(face.yawAngle) > yawThreshold;
  };

  const isRightShakeFace = (face) => {
    // 这里的阈值可以根据实际情况进行调整
    const min = 40;
    const max = 300;
    return Math.abs(face.yawAngle) > min && Math.abs(face.yawAngle) < max;
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 0.1,
        skipProcessing: true,
      }; //设置为ImageType.png 还是jpg格式？
      const photo = await cameraRef.current.takePictureAsync(options);
      const parts = photo.uri.split("/").pop();
      console.log("Sun >>> photo ==" + photo.width);
      console.log("Sun >>> photo parts ==" + parts);
      const img = {
        uri: photo.uri,
        type: mime.getType(photo.uri),
        name: parts,
      };
      store.setFaceData(img);
      if (isModify) {
        updateBillUserImages({
          applyImage: img,
        });
      } else {
        doTrack("pk29", 1);
        navigation.goBack();
      }
    }
  };

  const setTipIfNeed = (tip) => {
    if (tips !== tip) {
      setTips(tip);
    }
  };

  const handleFacesDetected = ({ faces }) => {
    if (faces.length > 0) {
      if (!leftShake || !rightShake) {
        setTipIfNeed(shakeTip);
      }

      for (let i = 0; i < faces.length; i++) {
        if (leftShake && rightShake) {
          break;
        }

        let face = faces[i];
        //console.log("Sun >>> face.yawAngle === " + face.yawAngle);
        if (!leftShake && isLeftShakeFace(face)) {
          leftShake = true;
        }
        if (leftShake && !rightShake && isRightShakeFace(face)) {
          rightShake = true;

          setTipIfNeed(faceTip);
          timer = setTimeout(() => {
            takePicture();
          }, 1000);
        }
      }
    } else {
      setTipIfNeed(faceTip);
      timer && clearTimeout(timer);
      leftShake = false;
      rightShake = false;
      timer = undefined;
    }
  };

  const cameraSize = size && { pictureSize: size };

  return (
    <View style={styles.container}>
      <Spinner
        visible={isUpdateBillUserImagesLoading}
        textContent={i18n.t("Loading")}
        textStyle={{ color: "#FFF" }}
      />
      <View
        style={{
          marginTop: 96,
          backgroundColor: "#FFFFFF",
          width: 256,
          height: 256,
          overflow: "hidden",
          borderRadius: 128,
        }}
      >
        <Camera
          ref={cameraRef}
          style={{ flex: 1 }}
          type={CameraType.front}
          onFacesDetected={handleFacesDetected}
          ratio="1:1"
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
            runClassifications: FaceDetector.FaceDetectorClassifications.all,
            minDetectionInterval: 100,
            tracking: true,
          }}
          {...cameraSize}
        />
      </View>

      <View>
        <Text
          style={{
            lineHeight: 22,
            marginTop: 46,
            color: "#0825B8",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          {tips}
        </Text>
      </View>

      <View>
        <Text
          style={{
            lineHeight: 22,
            marginTop: 24,
            color: "#4F5E6F",
            fontSize: 13,
          }}
        >
          {i18n.t("ImproveYourPassRate")}
        </Text>
      </View>

      {/* <Image style={{width: 100,height: 100}} source={{uri: store.faceData.uri}}> </Image> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    padding: 16,
  },
});
