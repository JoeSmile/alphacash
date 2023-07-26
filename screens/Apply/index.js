import { View, Text, ScrollView, StyleSheet,Image,TouchableOpacity,Pressable,SafeAreaView,Linking,Modal,Platform} from "react-native";
import ApplyLoanCard from "@components/ApplyLoanCard";
import LoanDetails from "@components/LoanDetails";
import { useGetCashLoanProductConfig,useApplyCreateBill,useGetApplyCheckParams } from '@apis';
import { useEffect,useState,useRef  } from "react";
import CollectionAccount from "@components/CollectionAccount";
import FaceRecognition from "@components/FaceRecognition";
import Checkbox from 'expo-checkbox';
import { Audio } from 'expo-av';
import MSlider from '@react-native-community/slider';
import { useSystemStore } from '@store/useSystemStore'
import { useNavigation } from "@react-navigation/native";
import { useUserQuota } from '@store/useUserQuota';
import { Buffer } from 'buffer';
import { decode,encode } from 'base-64';
import * as FileSystem from 'expo-file-system';




// 将base64文件转换为二进制
function dataURLtoBlob(dataUrl) {
  let arr = dataUrl.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = decode(arr[1]);
  // let bstr = atob(arr[1]);//Android端没有 atob方法
  // let bstr = Buffer.from(arr[1],'base64')
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type: mime});
}

function buildGetRequest(url, params) {
  if (params) {
    const queryString = Object.keys(params)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
      .join('&');
    return url + '?' + queryString;
  }
  return url;
}

const playImage = require('@assets/applyLoan/dialogs_ic_play.png')
const stopImage = require('@assets/applyLoan/dialogs_ic_pause.png')
const baseURL = 'https://alphacashapi.tangbull.com/api/app/laon/voice'

export default function Apply () {
  const store = useSystemStore();
  const userStore = useUserQuota();
  const navigation = useNavigation();


  const { mutate: getCashLoanProductConfig, data: loanProductConfigData, 
    isLoading: isGetCashLoanProductConfigLoading} = useGetCashLoanProductConfig()

  const { mutate: getGetApplyCheckParams, data: applyCheckParamsData, 
    isLoading: isGetApplyCheckParamsLoading} = useGetApplyCheckParams()

  const { mutate: applyCreateBill, data: billData, 
    isLoading: isApplyCreateBillLoading} = useApplyCreateBill()

    const [optWithDaysConfig, setOptWithDaysConfig] = useState([]);
    //审核账号
    const [isSpecialAccount, setIsSpecialAccount] = useState(false);
    
    const [daysOption,setDaysOption] = useState(0)
    const [amountIndex,setAmountIndex] = useState(0)
    const [isChecked, setChecked] = useState(true);
    const [toVoice,setToVoice] = useState(false)

    //人脸数据
    const [faceImage, setFaceImage] = useState();
    const [faceImageName,setFaceImageName] = useState('defaultName.jpg')



    //音频
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isClickable, setIsClickable] = useState(true);
    const [audioFileUri,setAudioFileUri] = useState({})

    useEffect(() => {
      getCashLoanProductConfig()
    },[])

    useEffect(() => {
      if(applyCheckParamsData?.data?.error_code == 1){
        console.log('Sun >>> applyCheckParamsData')
        const blobData = dataURLtoBlob(userStore.faceData.faceBase64)
        // const blobData = dataURLtoBlob(userStore.faceData.faceBase64)
        let file = blobData
        // if (Platform.OS === 'android') {
        //   // Android 平台处理 Blob 对象
        //   console.log('Platform.OS === android')
        //   file = {uri: userStore.faceData.faceBase64, type: 'image/jpg', name: userStore.faceData.faceName}
        //   // file = new File([blobData], "store.faceData.split('Camera/')[1].jpeg", { type: 'image/jpeg' });
        // }
         //拼接参数
         const params = {
          "applyAmount": optWithDaysConfig[daysOption].opt[amountIndex].applyAmount,
          "manageFee": optWithDaysConfig[daysOption].opt[amountIndex].manageFee,
          "dailyRate": optWithDaysConfig[daysOption].opt[amountIndex].dailyRate/100,
          "dayNum": optWithDaysConfig[daysOption].days,
          "minLoanMoney": optWithDaysConfig[daysOption].minLoanMoney,
          "maxLoanMoney": optWithDaysConfig[daysOption].maxLoanMoney,
          "selfieImage": blobData, 
        } 
        let cardParams = {}
        if(store.cardInfo.bankAccount){
          cardParams = {
            "paymentType": "1",
            "bankAccountName": store.cardInfo.bankAccountName,
            "bankAccount": store.cardInfo.bankAccount,
            "bankId": store.cardInfo.bankId
          }
        } else if(store.cardInfo.ewalletAccount){
          cardParams = {
            "paymentType": "2",
            "ewalletType": store.cardInfo.ewalletType,
            "ewalletAccount": store.cardInfo.ewalletAccount,
          }
        }
        const allParams = {...params, ...cardParams}

        applyCreateBill(allParams)
      }
    },[applyCheckParamsData])

    useEffect(() => {
      if(billData?.data?.error_code == 1){
        userStore.setFaceData({faceBase64: '',faceName: ''})
        navigation.replace('Homepage')
      }
    },[billData])

    const clickLoanAgreement = (()=> {
      openExternalLink()
    })

    const openExternalLink  = (() => {
      const url = 'https://www.baidu.com'
      Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URL: " + url);
        }
      })
      .catch((error) => console.error('An error occurred: ', error));

    }) 

    const getLoan = (async () => {
      if(isChecked && userStore.faceData.faceName !== ''){
        console.log('Sun >>> getLoan' +  store.locale)
        setToVoice(true)
        if(optWithDaysConfig[daysOption].days === 30){
          setIsClickable(false)
        }
        //拼接参数
        const params = {
          "app": store.app,
          "sign": store.sign,
          "token":  store.token,
          "language": store.locale,
          "applyAmount": optWithDaysConfig[daysOption].opt[amountIndex].applyAmount,
          "dayNum": optWithDaysConfig[daysOption].days,
          "disburseMoney":  optWithDaysConfig[daysOption].opt[amountIndex].disburseMoney,
          "dailyRate": optWithDaysConfig[daysOption].opt[amountIndex].dailyRate,
          "fineStrategyText": optWithDaysConfig[daysOption].opt[amountIndex].fineStrategyText ?? ""
        } 
        const audioFUri = buildGetRequest(baseURL,params)
        setAudioFileUri(audioFUri)
        console.log('Sun >>> ====' + audioFUri)
        loadAudio(audioFUri)
        
      } else {
        return
      }
    })

    const clickCollectionAccount = (() => {
      console.log('Sun >>> clickCollectionAccount')
      // navigation.push('MyCards')
      // 参数通过第二个参数传递给目标页面
      navigation.navigate('MyCards', { isApplySelect: true });
    })

    const goBack = (() => {
      console.log('Sun >>> goback')
      setToVoice(false)
    })

    const getApplyLoan = (() => {
      // if(isClickable){
        console.log('Sun >>> getApplyLoan')
        //参数检查
        const data = { 
          "applyAmount": optWithDaysConfig[daysOption].opt[amountIndex].applyAmount,
          "manageFee": optWithDaysConfig[daysOption].opt[amountIndex].manageFee,
          "dailyRate": optWithDaysConfig[daysOption].opt[amountIndex].dailyRate/100,
          "dayNum": optWithDaysConfig[daysOption].days,
          "minLoanMoney": optWithDaysConfig[daysOption].minLoanMoney,
          "maxLoanMoney": optWithDaysConfig[daysOption].maxLoanMoney
        }
        getGetApplyCheckParams(data)
        //申请贷款
      // }else {
      //   return
      // }
    })

    const playVoice = (() => {
      console.log('Sun >>> playVoice' + isPlaying)
      //Andoroid端播放结束自动销毁，需要重新加载播放
      if(currentTime != 0){
        playSound()
      } else {
        if(!isPlaying){
          loadAudio(audioFileUri)  
          setIsPlaying(!isPlaying) 
        }
      }
    })

    const onPlaybackStatusUpdate = (status) => {
      if (status.isLoaded && !status.isBuffering) {
        setCurrentTime(status.positionMillis);
        setDuration(status.durationMillis);
      }

       //报错 status.durationMillis = infinity 以及调用了后会引起音频卡顿(web 端)
      //  console.log('status.durationMillis' + status.durationMillis)
        // setDuration(status.durationMillis)
    

       // 判断是否音频播放结束
       if (status.didJustFinish && !status.isLooping) {
        // 重置所有状态
        setIsClickable(true)
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };

    const loadAudio = async (audioFileUri) => {
      try {
        const { sound } = await Audio.Sound.createAsync({ 
          uri: audioFileUri,
          initialStatus: {
            shouldPlay: true
          }

        });
        setSound(sound);
        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        await sound.playAsync();
      } catch (error) {
        console.log('Error loading audio:', error);
      }
    };

    const handleSliderChange = (value) => {
      if (sound) {
        sound.setPositionAsync(value);
      }
    };

    const formatTime = (timeInMillis) => {
       if (timeInMillis !== Infinity && !isNaN(timeInMillis)) {
    const minutes = Math.floor(timeInMillis / 60000);
    const seconds = ((timeInMillis % 60000) / 1000).toFixed(0);

    // 补零操作
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedMinutes}:${formattedSeconds}`;
  }
    };

    const playSound = async () => {
      if (sound) {
        try {
          if (isPlaying) {
            await sound.pauseAsync();
          } else {
            await sound.playAsync();
          }
          setIsPlaying(!isPlaying);
        } catch (error) {
          console.log('Error playing/pausing audio:', error);
        }
      }
    };
  
    const unloadAudio = async () => {
      try {
        if (sound) {
          await sound.unloadAsync();
        }
      } catch (error) {
        console.log('Error unloading audio:', error);
      }
    };

    useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
          }
        : undefined;
    }, [sound]);

    useEffect(() => {
     if(!toVoice){
      unloadAudio()
      setIsClickable(true)
      setIsPlaying(true);
      setCurrentTime(0);
      if (sound) {
        sound.setPositionAsync(0);
      }
     }
    }, [toVoice]);
    

    useEffect(() => {
      if(loanProductConfigData?.data?.error_code == 1){
        const loanConfigInfo = loanProductConfigData.data.data.cashLoan
        //产品配置信息
        setOptWithDaysConfig(loanConfigInfo.optWithDaysConfig)
        //是否审核账号
        setIsSpecialAccount(loanConfigInfo.isSpecialAccount)
        //默认金额下标
        setAmountIndex(loanConfigInfo.optWithDaysConfig[0].defaultAmountIndex)
        //默认天数下标
        // setDaysOption(loanConfigInfo.defaultDayOption)

      }
    },[loanProductConfigData])
    
  const clickFaceRecognition = (() => {
    navigation.push('FaceDetectionScreen')
  })

  const convertImageToBase64 = async (imageUri) => {
    try {
        // 读取文件内容
        const fileContent = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
  
        // 使用 base-64 库将文件内容转换为 Base64 格式
        // const base64Data = encode(fileContent);
        return `data:image/jpeg;base64,${fileContent}`;
    } catch (error) {
      console.log('转换图片为Base64时出错：', error);
      return null;
    }

  };


  return (
    <SafeAreaView>
       <ScrollView style={styles.container}>
        <View
        style={{
          top: 0,
          position: "absolute",
          backgroundColor: "#0825B8",
          width: "100%",
          height: 150,
          zIndex: 0,
        }}
        />
      
       { !!optWithDaysConfig[daysOption] && !isGetCashLoanProductConfigLoading && 
       <View style={{padding: 12}}>

       
        <ApplyLoanCard 
        optWithDaysConfig = {optWithDaysConfig} 
        setOptWithDaysConfig={setOptWithDaysConfig}
        daysOption = {daysOption}
        setDaysOption = {setDaysOption}
        amountIndex = {amountIndex}
        setAmountIndex = {setAmountIndex}
        ></ApplyLoanCard>

        <LoanDetails 
        optWithDaysConfig = {optWithDaysConfig}
        setOptWithDaysConfig={setOptWithDaysConfig}
        daysOption = {daysOption}
        setDaysOption = {setDaysOption}
        amountIndex = {amountIndex}
        setAmountIndex = {setAmountIndex}
        ></LoanDetails>

        <Pressable onPress={() => clickCollectionAccount()}>
          <CollectionAccount></CollectionAccount>
        </Pressable>

        <Pressable onPress={() => clickFaceRecognition()}>
        <FaceRecognition></FaceRecognition>
        </Pressable>
        

        <View style={styles.loanAgreementStyle}>
          <Checkbox 
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#0825B8' : undefined}
          ></Checkbox>
          <Text style={{marginHorizontal: 6,fontSize: 12, color: '#4F5E6F'}}>Agree</Text>
          <Pressable onPress={() => clickLoanAgreement()}>
          <Text style={{fontSize: 12, color: '#0825B8', fontWeight: 'bold'}}>Loan Agreement</Text>
          </Pressable>
        </View>

        
        <Text style={{fontSize: 12,color: '#4F5E6F'}}>
          {'Kind Tips：'}
          {'\n'}
          {'1.Cooling off period: If you regret applying for a loan,please contact us promptly and repay the principal within24 hours.According to company regulations, we willcancel your loan application for free!'}
          {'\n\n'}
          {'2.Remember to repay the loan in time, if you fail to repay the loan on time, you will be fined according to the  Late Payment Charges rate of 2%/day!'}
          {'\n\n'}
          {'3.Key Excutive For Loan Handing Officer Name:Mr.Mohsin Ali'}
          {'\n'}
          {'Contact Email:xxxxt@xx.com'}
          {'\n'}
          {'address:XXXXXXXX'}
        </Text>
        <View style={{height: 80}}></View>

       </View>
       }
       
        </ScrollView>

        <TouchableOpacity 
         onPress={() => getLoan()}
         style={{
          bottom: 36,
          left: 36,
          right: 36,
          position: 'absolute',
          backgroundColor: isChecked ? "#0825B8" : "#C0C4D6",
          height: 46,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          borderRadius: 3,
        }}
        >
          <Text style={{color: '#FFFFFF',fontSize: 15}}>Get Loan</Text>
          <Image source={require('@assets/applyLoan/btn_ic_right.png')} style={{width: 12, height: 12,marginLeft: 2}}></Image>

        </TouchableOpacity>

      {/* 语音 */}
      { !!optWithDaysConfig[daysOption] &&
        <Modal
         visible={toVoice}
         animationType="fade"
         transparent={true}
         >
        <View style={styles.otherContainer}>
        <View style={styles.voiceViewStyle}>

          <View style={styles.voiceItemStyle}>
            <TouchableOpacity onPress={goBack}>
             <Image source={require('@assets/applyLoan/com_nav_ic_back_black.png')} style={{width: 21,height: 21}}></Image>
            </TouchableOpacity>
            <View style={{flex: 1,alignItems: 'center',backgroundColor: '#F4F5F7',}}>
           <Text style={{fontWeight: 'bold', color: '#0A233E',marginLeft: -21}}>Confirm Payment Info</Text>
           </View>
          </View>

          <View style={styles.voiceContentStyle}>

            <View style={styles.voicecontentItemStyle}>
              <Text style={{fontSize: 15,color: '#4F5E6F',fontWeight:'500'}}>Loan Amount</Text>
              <Text style={{fontSize: 15,color: '#0A233E',fontWeight:'800'}}>RS.{optWithDaysConfig[daysOption].opt[amountIndex].applyAmount}</Text>
            </View>

            <View style={styles.voicecontentItemStyle}>
              <Text style={{fontSize: 15,color: '#4F5E6F',fontWeight:'500'}}>Loan Term</Text>
              <Text style={{fontSize: 15,color: '#0A233E',fontWeight:'800'}}>{optWithDaysConfig[daysOption].days} Days</Text>
            </View>

            <View style={styles.voicecontentItemStyle}>
              <Text style={{fontSize: 15,color: '#4F5E6F',fontWeight:'500'}}>Disburse Amount</Text>
              <Text style={{fontSize: 15,color: '#0A233E',fontWeight:'800'}}>RS.{optWithDaysConfig[daysOption].opt[amountIndex].disburseMoney}</Text>
            </View>
            
          </View>

          <View style={styles.voicePlayStyle}>
            <Pressable onPress={playVoice}>
            <Image source={isPlaying === false ? playImage : stopImage} style={{width: 24,height: 24}}></Image>
            </Pressable>
           
            <View style={{flexDirection: 'column',flex: 1,justifyContent: 'center',marginTop: -6}}>
              <MSlider
              style = {{marginTop: 6}}
              value={currentTime}
              minimumValue={0}
              maximumValue={duration}
              onValueChange={handleSliderChange}
              minimumTrackTintColor="#00B295" // 设置走过的进度的颜色
              maximumTrackTintColor="#00B2954D" // 设置进度条的颜色
              thumbTintColor="transparent" // 将滑块颜色设为透明
              thumbStyle={{ width: 0, height: 0 }} // 设置滑块样式为空对象，使其不占用空间
              ></MSlider>
              <View style ={{flexDirection: 'row',justifyContent: 'space-between',marginHorizontal: 15,marginTop: -3}}>
                <Text style={{color: '#8899AC', fontSize: 11}}>{formatTime(currentTime)}</Text>
                <Text  style={{color: '#8899AC', fontSize: 11}}>{formatTime(duration)}</Text>
              </View>
            </View>

          </View>

          <Text style={{color: '#4F5E6F', fontSize: 12,marginTop: 12,fontWeight: 500,lineHeight: 17}}>
          {'I have read and fully understood the Markup charges and terms of the loan product, and I agree that when the loan is approved, the funds will be transferred directly to the account I provided!'}
          </Text>

          <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 24}}>
           <TouchableOpacity onPress={goBack} style={{flex: 1,borderRadius:3,backgroundColor: '#C0C4D6',height: 46,justifyContent: 'center',alignItems: 'center',marginRight: 8}}>
              <Text style={{color: '#FFFFFF', fontSize: 15}}>Cancel</Text>
           </TouchableOpacity>

           <TouchableOpacity onPress={getApplyLoan}  activeOpacity={isClickable ? 0.2 : 1} style={{flex: 1,borderRadius:3,backgroundColor: isClickable ? '#0825B8' : '#C0C4D6',height: 46,justifyContent: 'center',alignItems: 'center',marginLeft: 8}}>
              <Text style={{color: '#FFFFFF', fontSize: 15}}>Disburse Now</Text>
            </TouchableOpacity>
          </View>

        </View>
        </View>
        </Modal>
}
    
    </SafeAreaView>
       
)}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: '#F4F5F7'
  },

  noneContainer: {
   display: 'none'
  },

  otherContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loanAgreementStyle: {
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
  },

  voiceViewStyle: {
    position: 'absolute',
    bottom: 0,
    opacity: 1,
    backgroundColor: '#F4F5F7',
    padding: 14,
    paddingTop: 24,
    flex: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'column',
  },

  voiceItemStyle: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    backgroundColor: '#F4F5F7',
  },

  voiceContentStyle: {
    borderRadius:4,
    backgroundColor: '#FFFFFF',
    marginTop:24,
    paddingHorizontal: 12,
    paddingTop: 15,
    flexDirection: 'column'
  },

  voicecontentItemStyle: {
    flexDirection:'row',
    justifyContent: 'space-between',
    height: 35
  },

  voicePlayStyle: {
    height: 54,
    borderRadius:4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },


  
});