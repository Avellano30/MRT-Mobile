import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Camera, Code, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

const CameraQR = () => {
    const device = useCameraDevice('back');
    const navigation = useNavigation();
    const [qrCode, setQrCode] = useState<Code>();

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            if (codes[0].value === qrCode?.value) {
                console.log('Scanned already');
                return;
            } else {
                setQrCode(codes[0]);
                console.log(codes[0].value);
            }
        },
    });

    if (device == null) return <View style={styles.container} />;

    const { hasPermission, requestPermission } = useCameraPermission();


    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission]);

    // const handleRequestPermission = () => {
    //     if (!hasPermission) {
    //         requestPermission();
    //     }
    // };

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                device={device}
                isActive={true}
                codeScanner={codeScanner}
            />

            {/* {!hasPermission && (
                <Button onPress={handleRequestPermission} >Camera Permission</Button>
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    camera: {
        flex: 1,
    },
});

export default CameraQR;
