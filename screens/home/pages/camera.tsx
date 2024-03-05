import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
import { Camera, Code, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import { storage } from '../../login';
import io from 'socket.io-client';
import { SafeAreaView } from 'react-native-safe-area-context';

const CameraQR = () => {
    const device = useCameraDevice('back');
    const navigation = useNavigation();
    const [qrCode, setQrCode] = useState<Code>();

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            let corners = codes[0].corners;

            if (corners![0].x >= 477 && corners![0].y >= 318 &&
                corners![1].x <= 808 && corners![1].y >= 320 &&
                corners![2].x <= 806 && corners![2].y <= 647 &&
                corners![3].x >= 479 && corners![3].y <= 649
              ) {
                if (codes[0].value === qrCode?.value) {
                    // console.log('Scanned already');
                    return;
                } else {
                    setQrCode(codes[0]);
                    console.log(codes[0].value);
    
                    const savedFavCard = storage.getString('favoriteCard');
                    sendQRCodeDataToWeb(savedFavCard);
                }
              }
            
            // console.log(codes[0].corners)
        },
    });

    if (device == null) return <View style={styles.container} />;

    const { hasPermission, requestPermission } = useCameraPermission();


    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission]);

    const socket = io('http://localhost:8080');

    const sendQRCodeDataToWeb = (qrCodeData: string | undefined) => {
        socket.emit('message', qrCodeData);
    };

    useEffect(() => {
        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, []);


    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <Appbar.Header mode='center-aligned' style={{ backgroundColor: '#0e1c43', height: 50 }} statusBarHeight={0}>
                    <Appbar.Content title="QR Reader" titleStyle={{ fontWeight: '900', color: 'white', fontSize: 18 }} />
                </Appbar.Header>
                <View style={styles.container}>
                    <Camera
                        style={styles.camera}
                        device={device}
                        isActive={true}
                        codeScanner={codeScanner}
                    />
                    <View style={styles.box} >
                        <Image source={require('../../../assets/scanbox.png')}  style= {{ height: 200, width: 200 }}/>
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
