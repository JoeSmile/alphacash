import { View, Text, StyleSheet, Image,Button,Modal,TouchableOpacity } from "react-native";
import { Camera, CameraType, ImageType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { useEffect,useState,useRef  } from "react";
import { useNavigation } from "@react-navigation/native";
import { useUserQuota } from '@store';


export default function FaceDetectionScreen ({}) {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isBlinking, setIsBlinking] = useState(false);
  const [isYawing, setIsYawing] = useState(false);
  const [tips,setTips] = useState('Please point straight at the camera')
  const navigation = useNavigation();
  // Add a variable to hold the timer ID
  const timerRef = useRef(null);
  const store = useUserQuota();
  const [faceData,setFaceData] = useState('')


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
    })();
    cameraRef.current.resumePreview()
  },[permission])

  // useEffect(() => {
  //   return () => {
  //     // 在组件卸载时停止相机预览
  //     if (cameraRef.current) {
  //       cameraRef.current.pausePreview();
  //     }
  //   };
  // })

  const isSmiling = (face) => {
    // 0.6 是一个基准值，可以根据实际情况进行调整
    return face.smilingProbability > 0.8;
  };

  const isBlinkingFace = (face) => {
    // 0.3 是一个基准值，可以根据实际情况进行调整
    return face.leftEyeOpenProbability < 0.4 || face.rightEyeOpenProbability < 0.4;
  };

  const isYawingFace = (face) => {
    // 这里的阈值可以根据实际情况进行调整
    const yawThreshold = 20;
    return Math.abs(face.yawAngle) > yawThreshold;
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true};//设置为ImageType.png 还是jpg格式？
      const photo = await cameraRef.current.takePictureAsync(options);
        // Convert the captured photo to Base64 format
        // const base64Photo = `data:image/jpg;base64,${photo.base64}`;
      setFaceData(photo)
      const parts = photo.uri.split('Camera/')
      store.setFaceData({faceBase64: `data:image/jpeg;base64,${photo.base64}`,faceName: parts[1]})
    }
  };

  const handleFacesDetected = ({ faces }) => {
    if (faces.length > 0) {
      if(!isBlinking){
        setTips('Please blink')
      }
      faces.map((face) => {
        if(isBlinkingFace(face)){
          setTips('Please shake your head')
          setIsBlinking(true)
        }
        if(isYawingFace(face) && isBlinking && !isYawing){
          setIsYawing(true)
          timerRef.current = setTimeout(() => {
            takePicture()
          }, 3000); 
        }
      })
    } else {
      setTips('Please point straight at the camera')
      setIsBlinking(false)
      setIsYawing(false)
      clearTimeout(timerRef.current);
    }
  };


  return (
    <View style ={styles.container}>
      
     <Text  style={{marginTop: 36,fontSize: 15}}>{tips}</Text>
      <View style={{marginTop: 36,backgroundColor: '#FFFFFF',width: 256,height: 256,overflow: 'hidden',borderRadius: 128}}>
        <Camera 
        ref={cameraRef}
        style={{flex: 1}}
        type={CameraType.front}
         onFacesDetected={handleFacesDetected}
         faceDetectorSettings={{
           mode: FaceDetector.FaceDetectorMode.fast,
           detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
           runClassifications: FaceDetector.FaceDetectorClassifications.all,
           minDetectionInterval: 100,
           tracking: true,
         }}
        />
      </View>
    <View>
      <Text style={{lineHeight: 22,marginTop: 36,color: '#4F5E6F'}}>Please follow the instructions to complete the face recognition action and improve your pass rate!</Text>
    </View>

        {faceData && <Image source={faceData} style={{width: 100,height: 100,marginTop: 20}}></Image>}
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 16,
  },

});