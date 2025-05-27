
import { StyleSheet, View, Text } from 'react-native'
import React, { use, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomBox from '@/components/CustomBox'
import { Button } from '@/components/ui/button'
import CustomText from '@/components/CustomText'
import {GestureHandlerRootView, TextInput} from 'react-native-gesture-handler';
import { useRouter } from 'expo-router'

const Login = () => {
  const router =useRouter();
   const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
   
  return (

      <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.loginContainer}>
        <View style={styles.loginBox}>
        <CustomBox style={loginBox}>
          <CustomText style={styles.heading}>Login</CustomText>
          <TextInput
            placeholder="User Name"
            value="username"
            onChangeText={text => setUserName(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Password"
            value="password"
            onChangeText={text => setPassword(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
            secureTextEntry
          />
        </CustomBox>
        </View>
        
        <Button  style={styles.button}>
          <CustomBox style={buttonBox}>
            <CustomText style={{textAlign: 'center'}}>Submit</CustomText>
          </CustomBox>
        </Button>
        <Button onPress={() => router.push('/Signup')} style={styles.button}>
          <CustomBox style={buttonBox}>
            <CustomText style={{textAlign: 'center'}}>Signup</CustomText>
          </CustomBox>
        </Button>
      </View>
    </GestureHandlerRootView>
   
  )
}

export default Login


const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
   

  },
  loginBox: {
    width: '100%',
  },
  button: {
    marginTop: 20,
    width: '30%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    color: 'black',
  },
});

const loginBox = {
  mainBox: {
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
  },
  shadowBox: {
    backgroundColor: 'gray',
    borderRadius: 10,
  },
};

const buttonBox = {
  mainBox: {
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  shadowBox: {
    backgroundColor: 'gray',
    borderRadius: 10,
  },
};