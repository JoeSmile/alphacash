import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import { useUserQuota } from '@store';



export default function FaceRecognition () {
  const store = useUserQuota();

  useEffect(() => {
    console.log('Sun >>> store.faceData =' + store.faceData)

  },[store.faceData])

  return(
    <View style={styles.container}>
      <Image source={require('@assets/applyLoan/loan_ic_face_recognition.png')} style={{width: 35, height: 35}}></Image>
      <View style={styles.contentStyle}>
        <Text style={{ fontSize: 15,color: '#4F5E6F',fontWeight: 500,}}>Face Recognition</Text>
        { store.faceData == '' ?
           <Text style={{color: '#0A233E', fontWeight: 'bold',marginTop: 8,fontSize: 15}}>please identify</Text>
           : <Text style={{color: '#01AE01', fontWeight: 'bold',marginTop: 8,fontSize: 15}}>pass</Text>
        }
       
      </View>
      <Image source={require('@assets/applyLoan/com_ic_right.png')} style={{width: 15, height: 15}}></Image>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    padding: 12,
    marginTop: 12,
  },

  contentStyle: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 12,
  },

});