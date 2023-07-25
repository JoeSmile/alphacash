import { View, Text, StyleSheet, Image,Button,Modal,TouchableOpacity } from "react-native";
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';


export default function FaceDetectionScreen (
  { 
    visible, 
    onClose, 
    onFaceDetected
   }) {

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
          <Text>Close</Text>
        </TouchableOpacity>
        <Camera
        // other props
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