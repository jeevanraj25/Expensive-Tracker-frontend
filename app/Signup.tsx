import { View, Text,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CustomText from '@/components/CustomText'
import CustomBox from '@/components/CustomBox'
import { Button } from '@/components/ui/button'
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Signup = () => {
   
    const router =useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  

  const navigateToLoginScreen = async () => {
    try {
      console.log('Navigating to login screen...');
      const response = await fetch(`http://192.168.56.1:8000/auth/v1/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          'first_name': firstName,
          'last_name': lastName,
          'email': email,
          'phone_number': phoneNumber,
          'password': password,

        }),
      });
  
      const data = await response.json();
      console.log(data);
      console.log(data["accessToken"]);
      console.log(data["token"]);
      await AsyncStorage.setItem('accessToken', data["accessToken"]);
      await AsyncStorage.setItem('refreshToken', data["token"]);
  
      router.replace('/Home');
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

 
  return (
   <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.signupContainer}>
        <View style={styles.SigiupBox}>
        <CustomBox style={signUpBox}>
          <CustomText style={styles.heading}>Sign Up</CustomText>
          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={text => setFirstName(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={text => setLastName(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
           />
                 {/* <TextInput
            placeholder="User Name"
            value={userName}
            onChangeText={text => setUserName(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
          /> */}
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
            secureTextEntry
          />
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
            keyboardType="phone-pad"
          />
        </CustomBox>
        </View>
        <Button onPressIn={() => navigateToLoginScreen()} style={styles.button}>
            <CustomBox  style={buttonBox}>
                <CustomText style={{textAlign: 'center'}}>Submit</CustomText>
            </CustomBox>
          </Button>
          <Button onPress={() => router.push('/Login')} style={styles.button}>
            <CustomBox style={buttonBox}>
                <CustomText style={{textAlign: 'center'}}>Login</CustomText>
            </CustomBox>
          </Button>
      </View>
    </GestureHandlerRootView>
  )
}

export default Signup



const styles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  SigiupBox: {
    width: '100%',
  },
  button: {
    marginTop: 20,
    width: "30%",
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

const signUpBox = {
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