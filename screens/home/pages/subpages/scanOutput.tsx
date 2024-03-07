import React, { useEffect, useState } from 'react';
import { View, Alert, BackHandler, Image } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';


const ScanOutput = ({route}: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const _goBack = () => navigation.navigate('Main', {index: 0});

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0e1c43' }}>
            <Appbar.Header style={{ backgroundColor: '#0e1c43', height: 50 }} statusBarHeight={0}>
                <Appbar.Content title="" />
                <Appbar.Action icon={() => <Icon name="close-outline" size={25} color="white" />} onPress={_goBack} />
            </Appbar.Header>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 150 }}>
                <Icon name="card-outline" size={150} color="white" />
                <Text style={{ color: 'white', fontWeight: '900', fontSize: 40 }}>{route.params.message}</Text>
                {/* <Text style={{ color: 'white', fontWeight: '900', fontSize: 40 }}>Successfully</Text> */}
            </View>
        </SafeAreaView>
    );
}

export default ScanOutput;
