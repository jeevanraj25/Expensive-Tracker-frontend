
import { StyleSheet, View, Text } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomBox from '@/components/CustomBox'
import { Button } from '@/components/ui/button'
import CustomText from '@/components/CustomText'
import {GestureHandlerRootView, TextInput} from 'react-native-gesture-handler';
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const router =useRouter();
   const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const isLoggedIn = async() => {
     const accessToken = await AsyncStorage.getItem('accessToken');
     const response=await fetch('http://localhost:8000/auth/v1/ping',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-Requested-With': 'XMLHttpRequest'
      }
     })

     return response.ok
  }
  
  const refreshToken = async() =>{
    const refreshToken=await AsyncStorage.getItem('refreshToken');
   const response = await fetch('http://localhost:8000/auth/v1/refresh-token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${refreshToken}`,
    'X-Requested-With': 'XMLHttpRequest'
  },
  body: JSON.stringify({
    refresh_token: refreshToken
  })
});

    if(response.ok){
      const data=await response.json();
      await AsyncStorage.setItem('accessToken', data.access_token);
      await AsyncStorage.setItem('refreshToken', data.refresh_token);

      const accessToken =await AsyncStorage.getItem('accessToken');
      const refresh_token=await AsyncStorage.getItem('refreshToken');
      console.log("access token",accessToken);
      console.log("refresh token",refresh_token);
    }

    return response.ok;
  }

   const gotoHomePageWithLogin = async () => {
    
    const response = await fetch(`http://192.168.56.1:8000/auth/v1/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        username: userName,
        password: password,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      await AsyncStorage.setItem('refreshToken', data['token']);
      await AsyncStorage.setItem('accessToken', data['accessToken']);
       router.push('/Home');
    }
  };


  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await isLoggedIn();
      setLoggedIn(loggedIn);
      if (loggedIn) {
        router.push('/Home');
      }else{
       const refreshed = await refreshToken();
       setLoggedIn(refreshed);
       if(refreshed){
        router.push('/Home');
       }
      }
    };
    checkLoginStatus();
  }, []);

   
  return (

      <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.loginContainer}>
        <View style={styles.loginBox}>
        <CustomBox style={loginBox}>
          <CustomText style={styles.heading}>Login</CustomText>
          <TextInput
            placeholder="User Name"
            value={userName}
            onChangeText={text => setUserName(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
            secureTextEntry
          />
        </CustomBox>
        </View>
        
        <Button  onPressIn={() => gotoHomePageWithLogin()}  style={styles.button}>
          <CustomBox  style={buttonBox}>
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