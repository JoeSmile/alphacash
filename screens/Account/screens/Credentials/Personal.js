import { SafeAreaView, View, Text, Pressable, StyleSheet, Image, TextInput } from "react-native";
import { Formik } from 'formik';
import Colors from "@const/Colors";
import { FDatePicker} from '@components/FDatePicker';

export default function PersonalInfo({navigation}) {
  return (
    <SafeAreaView >
    <View style={styles.container}>
        <View style={styles.safeTextContainer}>
        <View >
          <Image 
            source={require('@assets/images/mine_info_ic_safe.svg')}
            contentFit="cover"
            transition={1000}
            style={{
              width: '22px',
              height: '22px',
            }}/>
        </View>
          <Text style={styles.safeText}>
            The information you fill in is only used for credit
    evaluation and will never be used for other purposes.We use encryption to ensure your information security!
          </Text>
        </View>
      {/* form */}

      <Formik
          initialValues={{ phoneNumber: '', OTP: '' }}
          onSubmit={values => login(mockLoginParameters)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  name="phoneNumber"
                  placeholder="03x xxxx xxxx"
                  style={styles.textInput}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                  keyboardType="phoneNumber"
                />
              </View>
              <View>
                <View>
                  <Text>Date of Birth</Text>
                  
                </View>
              </View>
            </>
          )}
        </Formik>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "15px",
    paddingVertical: "15px",
    backgroundColor: 'white'
  },
  safeTextContainer: {
    border: "1px solid #698EC7",
    borderRadius: '4px',
    backgroundColor: '#F6F9FD',
    paddingHorizontal: '15px',
    paddingVertical: '15px',
    flexDirection:'row'
  },  
  safeText: {
    marginLeft: '10px',
    fontSize: '12px',
    color:'#4F5E6F'
  },
  inputContainer: {
    width: '100%',
    marginBottom: '20px'
  }, 
  label: {
    marginBottom:'10px'
  }, 
  textInput: {
    paddingLeft: '15px',
    height: 50,
    width: 'auto',
    backgroundColor: '#F4F5F7',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});