import { View, Text, StyleSheet, Image,Button,Modal,TouchableOpacity } from "react-native";
import { Camera, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { useI18n, LocaleTypes } from "@hooks/useI18n";


export default function FaceDetectionScreen () {
  const { i18n } = useI18n();

  const handleFacesDetected = ({ faces }) => {
    if (faces.length > 0) {
      const face = faces[0];
      onFaceDetected(face);
    } else {
      onFaceDetected(null);
    }
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={handleCloseModal}>
          <Text>{i18n.t('Close')}</Text>
        </TouchableOpacity>
        <Camera
        // other props
        type = {CameraType.front}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
        mode: FaceDetector.FaceDetectorMode.fast,
        detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
        runClassifications: FaceDetector.FaceDetectorClassifications.none,
        minDetectionInterval: 100,
        tracking: true,
    }}
  />
      </View>
    </Modal>
  );
};