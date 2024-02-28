import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

const CameraQR = () => {
    const device = useCameraDevice('back');
    
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            console.log(`Scanned ${codes.length} codes!`);
        },
    });

    if (device == null) return <View style={styles.container} />;

    const { hasPermission, requestPermission } = useCameraPermission();

    
    useEffect(() => {
        if(hasPermission) {
            requestPermission();
        }
    }, [hasPermission]);
    
    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                device={device}
                isActive={true}
                codeScanner={codeScanner}
            />
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
