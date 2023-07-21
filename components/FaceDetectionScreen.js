import { View, Text, StyleSheet, Image,Button,Modal,TouchableOpacity } from "react-native";
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
      </View>
    </Modal>
  );
};