import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Appbar, Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddCard = () => {
    // 'https://mrt-system-be-1qvh.onrender.com'
    // 'http://localhost:8080'
    const apiUrl = 'http://localhost:8080';
    const navigation = useNavigation();

    const _goBack = () => navigation.navigate('Main' as never);

    const [customValue, setCustomValue] = useState('637805');
    const [deviceID, setDeviceID] = useState('');
    const handleChangeText = (text: string) => {
        if (text.startsWith('637805') && text.length <= 16) {
            setCustomValue(text);
        }
    };

    DeviceInfo.getUniqueId().then((uniqueId) => {
        setDeviceID(uniqueId);
    });

    
    const saveCard = async () => {
        try {
            const updateDeviceID = await fetch(`${apiUrl}/mobile/card/${customValue}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({deviceID: deviceID}),
            });

            if (!updateDeviceID.ok) {
                throw new Error("Card Link Failed");
            }

            navigation.navigate('Main' as never);
        } catch (error) {
            console.error(error); // Handle error
        }
    };

    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#edf3ff', flex: 1 }}>
                <Appbar.Header mode='center-aligned' style={{ backgroundColor: '#0e1c43', height: 50 }} statusBarHeight={0}>
                    <Appbar.BackAction onPress={_goBack} color='white' />
                    <Appbar.Content title="Add a card™" titleStyle={{ fontWeight: '900', color: 'white', fontSize: 18 }} />
                </Appbar.Header>

                <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 30 }}>
                    <Text style={{ marginBottom: 10 }}>card™ Number (last 10 digits)</Text>
                    <TextInput
                        value={customValue}
                        style={{ backgroundColor: 'white' }}
                        outlineStyle={{ borderRadius: 10, borderColor: '#0e1c43' }}
                        keyboardType="numeric"
                        maxLength={16}
                        mode='outlined'
                        onChangeText={handleChangeText}
                    />

                    <Text style={{ marginTop: 30, marginBottom: 10 }}>Card Label (optional)</Text>
                    <TextInput style={{ backgroundColor: 'white' }} mode='outlined' outlineStyle={{ borderRadius: 10, borderColor: '#0e1c43' }} placeholder='e.g. Card' placeholderTextColor={'gray'} />
                </View>

            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: 'white' }}>
                <Button style={{ marginHorizontal: 25, marginVertical: 10, borderRadius: 10, paddingVertical: 5 }} 
                buttonColor='#0e1c43' 
                textColor='white'
                onPress={saveCard}
            >
                Save Card
            </Button>
            </SafeAreaView>
        </>

    );
};

export default AddCard;