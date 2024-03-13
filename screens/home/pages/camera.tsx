import { ParamListBase, useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, BackHandler } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
import { Camera, Code, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import { storage } from '../../login';
import io from 'socket.io-client';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const apiUrl = 'https://mrt-system-be-1qvh.onrender.com';

// https://mrt-system-be-1qvh.onrender.com - http://localhost:8080
const CameraQR = () => {
    const socket = io('https://mrt-system-be-1qvh.onrender.com');
    const device = useCameraDevice('back');
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [isCodeScanned, setIsCodeScanned] = React.useState(false);
    const [maintenance, setMaintenance] = React.useState(false);
    const [roomID, setRoomID] = React.useState('');
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            if (!isCodeScanned && codes.length > 0) {
                const corners = codes[0].corners;
                const scanBox = corners![0].x >= 471 && corners![0].y >= 230 &&
                    corners![1].x <= 815 && corners![1].y >= 230 &&
                    corners![2].x <= 815 && corners![2].y <= 489 &&
                    corners![3].x >= 471 && corners![3].y <= 489;

                if (scanBox) {
                    if (!codes[0].value?.startsWith('mrtQR-')) {
                        setIsCodeScanned(true);
                        navigation.navigate('ScanOutput', { message: 'Invalid QR' });
                        return;
                    } else if (maintenance) {
                        setIsCodeScanned(true);
                        navigation.navigate('ScanOutput', { message: 'Under Maintenance' });
                        return;
                    } else {
                        setIsCodeScanned(true);
                        const connectionId = codes[0].value;
                        setRoomID(connectionId);
                        socket.emit('joinRoom', connectionId);
                        const savedFavCard = storage.getString('mainCard');
                        socket.emit('privateMessage', connectionId, savedFavCard);
                        return;
                    }

                }
            }
        },
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch(`${apiUrl}/setting`); // Assuming the API endpoint is '/api/setting'
                const data = await response.json();
                setMaintenance(data[0].maintenance); // Assuming the response is an array with a single object
            } catch (error) {
                console.error(error);
            }
        };

        fetchSettings();
    }, [])


    useEffect(() => {
        socket.on('reply', (reply) => {
            navigation.navigate('ScanOutput', { message: reply });
        })

        return () => {
            socket.off('reply');
        };
    }, [isCodeScanned])

    if (device == null) return <View style={styles.container} />;

    const { hasPermission, requestPermission } = useCameraPermission();

    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission, requestPermission]);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            socket.connect();
        } else {
            if (roomID) {
                socket.emit('leaveRoom', roomID);
                socket.disconnect();
            }
        }

        return () => {
            socket.disconnect();
        };
    }, [isFocused]);


    useFocusEffect(React.useCallback(() => {
        if (isCodeScanned === true) {
            setIsCodeScanned(false);
        }

        return () => {
            setIsCodeScanned(false);
        };
    }, [isCodeScanned]))

    const _goBack = () => navigation.navigate('Main', { index: 0, name: 'Main' });

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            _goBack();
            return true;
        });

        return () => backHandler.remove();
    }, []);

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <Appbar.Header mode='center-aligned' style={{ backgroundColor: '#0e1c43', height: 50 }} statusBarHeight={0}>
                    <Appbar.BackAction onPress={_goBack} color='white' />
                    <Appbar.Content title="QR Reader" titleStyle={{ fontWeight: '900', color: 'white', fontSize: 18 }} />
                </Appbar.Header>
                <View style={styles.container}>
                    {device &&
                        <Camera
                            style={styles.camera}
                            device={device}
                            isActive={true}
                            codeScanner={codeScanner}
                        />
                    }
                    <View style={styles.box} >
                        <Image source={require('../../../assets/scanbox.png')} style={{ height: 200, width: 200 }} />
                    </View>
                </View>
            </SafeAreaView>
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#edf3ff'
    },
    camera: {
        flex: 1,
    },
    box: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default CameraQR;
