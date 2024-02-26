import React, { useState } from 'react';
import { withExpoSnack, styled } from 'nativewind';
import { Text, View, Alert, Button } from 'react-native';
import PasscodeInput from '../components/passcode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const StyledView = styled(View);
const StyledText = styled(Text);

const Login = () => {
  const [pin, setPin] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const savedPin = await AsyncStorage.getItem('pin');
      if (savedPin === pin) {
        // PIN matches, navigate to the main screen
        navigation.navigate('Home' as never);
      } else {
        Alert.alert('Error', 'Invalid PIN');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to authenticate');
    }
  };

  return (
    <StyledView className='flex flex-1 flex-col justify-center mx-auto'>
      <StyledText className="text-slate-800 font-bold">Enter your 6-digit passcode</StyledText>
      <PasscodeInput value={pin} onChange={setPin} />
      <StyledView>
        <Button title='Login' onPress={handleLogin} />
      </StyledView>
    </StyledView>
  );
}

export default withExpoSnack(Login);
