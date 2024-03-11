import { ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect } from 'react';
import { BackHandler, Image, TouchableOpacity, View } from 'react-native';
import { Appbar, BottomNavigation, Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';


const Transactions = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#edf3ff' }}>
        <Appbar.Header mode='center-aligned' style={{ backgroundColor: '#0e1c43', height: 50 }} statusBarHeight={0}>
          <Appbar.Content title="Transactions" titleStyle={{ fontWeight: '900', color: 'white', fontSize: 18 }} />
        </Appbar.Header>

        
      </SafeAreaView>
    </>

  );
};

export default Transactions;