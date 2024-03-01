import { ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect } from 'react';
import { BackHandler, Image, TouchableOpacity, View } from 'react-native';
import { Appbar, BottomNavigation, Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';


const Settings = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#edf3ff' }}>
        <Appbar.Header mode='center-aligned' style={{ backgroundColor: '#0e1c43', height: 50 }} statusBarHeight={0}>
          <Appbar.Content title="Settings" titleStyle={{ fontWeight: '900', color: 'white', fontSize: 18 }} />
        </Appbar.Header>

        <TouchableOpacity style={{ borderRadius: 10, marginTop: 40, alignItems: 'center', flexDirection: 'row' }} onPress={() => navigation.navigate('ResetPin')}>
          <Icon name='lock-closed' color={'#0e1c43'} size={25} style={{ transform: [{ scaleX: -1 }], marginLeft: 20, marginRight: 10 }}/>
          <Text style={{ color: 'black', fontSize: 18 }}>Change PIN</Text>
          <Icon name="chevron-forward" size={25} color={"darkgray"} style={{ left: 200}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{ borderRadius: 10, marginTop: 30, alignItems: 'center', flexDirection: 'row' }} onPress={() => navigation.navigate('Login')}>
          <Icon name='log-out' color={'#0e1c43'} size={25} style={{ transform: [{ scaleX: -1 }], marginLeft: 20, marginRight: 10 }}/>
          <Text style={{ color: 'red', fontSize: 18 }}>Log out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>

  );
};

export default Settings;