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
import { useI18n, LocaleTypes } from "@hooks/useI18n";


// 将base64文件转换为二进制
function dataURLtoBlob(dataUrl) {
  let arr = dataUrl.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = decode(arr[1]);
  // let bstr = atob(arr[1]);//Android端没有 atob方法
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type: mime});
  // return bstr;
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
const fImageUri = "data:image/jpeg;base64,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"


export default function Apply () {
  const store = useSystemStore();
  const userStore = useUserQuota();
  const navigation = useNavigation();
  const { i18n } = useI18n();


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
        const blobData = dataURLtoBlob(fImageUri)
        console.log('Sun >>> blobData ==== ' + JSON.stringify(blobData))
        // const blobData = dataURLtoBlob(userStore.faceData.faceBase64)
        let file = blobData
        if (Platform.OS === 'android') {
          // console.log('Platform.OS === android')
          // file = {
          //   uri: userStore.faceData.faceBase64,
          //   type: 'image/jpg', 
          //   name: userStore.faceData.faceName
          // }
        }
         //拼接参数
         const params = {
          "applyAmount": optWithDaysConfig[daysOption].opt[amountIndex].applyAmount,
          "manageFee": optWithDaysConfig[daysOption].opt[amountIndex].manageFee,
          "dailyRate": optWithDaysConfig[daysOption].opt[amountIndex].dailyRate/100,
          "dayNum": optWithDaysConfig[daysOption].days,
          "minLoanMoney": optWithDaysConfig[daysOption].minLoanMoney,
          "maxLoanMoney": optWithDaysConfig[daysOption].maxLoanMoney,
          "selfieImage": file,
          "paymentType": "2",
          "ewalletType": "1",
          "ewalletAccount": "03123456788"
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

        applyCreateBill(params)
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
      // if(isChecked && userStore.faceData.faceName !== ''){
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
        
      // } else {
      //   return
      // }
    })

    const clickCollectionAccount = (() => {
      console.log('Sun >>> clickCollectionAccount')
      // navigation.push('MyCards')
      // 参数通过第二个参数传递给目标页面
      navigation.navigate('MyCards', { isApplySelect: true });
    })

    const goBack = (() => {
      console.log('Sun >>> goback')
      // unloadAudio()
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
     if(toVoice){
      // unloadAudio()
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
          {/* <CollectionAccount></CollectionAccount> */}
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
          <Text style={{marginHorizontal: 6,fontSize: 12, color: '#4F5E6F'}}>{i18n.t('Agree')}</Text>
          <Pressable onPress={() => clickLoanAgreement()}>
          <Text style={{fontSize: 12, color: '#0825B8', fontWeight: 'bold'}}>{i18n.t('Agree Loan Agreement')}</Text>
          </Pressable>
        </View>

        
        <Text style={{fontSize: 12,color: '#4F5E6F'}}>
          {i18n.t('Kind Tips')}
          {':\n'}
          {i18n.t('KindTips1')}
          {'\n\n'}
          {i18n.t('KindTips2')}
          {'\n\n'}
          {i18n.t('KindTips3')}
          {'\n'}
          {/* {'Contact Email:xxxxt@xx.com'}
          {'\n'}
          {'address:XXXXXXXX'} */}
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
          <Text style={{color: '#FFFFFF',fontSize: 15}}>{i18n.t('GetLoan')}</Text>
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
           <Text style={{fontWeight: 'bold', color: '#0A233E',marginLeft: -21}}>{i18n.t('Confirm Payment Info')}</Text>
           </View>
          </View>

          <View style={styles.voiceContentStyle}>

            <View style={styles.voicecontentItemStyle}>
              <Text style={{fontSize: 15,color: '#4F5E6F',fontWeight:'500'}}>{i18n.t('Loan Amount')}</Text>
              <Text style={{fontSize: 15,color: '#0A233E',fontWeight:'800'}}>RS.{optWithDaysConfig[daysOption].opt[amountIndex].applyAmount}</Text>
            </View>

            <View style={styles.voicecontentItemStyle}>
              <Text style={{fontSize: 15,color: '#4F5E6F',fontWeight:'500'}}>{i18n.t('LoanTerm')}</Text>
              <Text style={{fontSize: 15,color: '#0A233E',fontWeight:'800'}}>{optWithDaysConfig[daysOption].days} {i18n.t('Days')}</Text>
            </View>

            <View style={styles.voicecontentItemStyle}>
              <Text style={{fontSize: 15,color: '#4F5E6F',fontWeight:'500'}}>{i18n.t('DisburseAmount')}</Text>
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
              <Text style={{color: '#FFFFFF', fontSize: 15}}>{i18n.t('Cancel')}</Text>
           </TouchableOpacity>

           <TouchableOpacity onPress={getApplyLoan}  activeOpacity={isClickable ? 0.2 : 1} style={{flex: 1,borderRadius:3,backgroundColor: isClickable ? '#0825B8' : '#C0C4D6',height: 46,justifyContent: 'center',alignItems: 'center',marginLeft: 8}}>
              <Text style={{color: '#FFFFFF', fontSize: 15}}>{i18n.t('Disburse Now')}</Text>
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