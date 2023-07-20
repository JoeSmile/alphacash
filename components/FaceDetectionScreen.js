import { View, Text, StyleSheet, Image,Button,Modal } from "react-native";
// import { Camera, useCameraDevices } from "react-native-vision-camera";
import * as FaceDetector from 'expo-face-detector';


export default function FaceDetectionScreen (
  { 
    visible, 
    onClose, 
    onFaceDetected
   }) {

    // const devices = useCameraDevices()
    // //前摄像头
    // const device = devices.front

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
        {/* <Camera
          style={{ flex: 1 }}
          onFacesDetected={handleFacesDetected}
          device={device}
          isActive={true}
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.fast,
            detectLandmarks: FaceDetector.Constants.Landmarks.none,
            runClassifications: FaceDetector.Constants.Classifications.none,
            minDetectionInterval: 100,
            tracking: true,
          }}
        /> */}
        <TouchableOpacity onPress={handleCloseModal}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};