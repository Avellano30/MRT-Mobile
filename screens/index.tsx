import { ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { BottomNavigation, Button, Card, Text } from 'react-native-paper';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const New = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;


    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ marginLeft: 'auto', marginRight: 'auto'}}>
                    <Image source={require('../assets/logo.png')}
                        style={{
                            width: 250,
                            resizeMode: 'contain',
                        }} />
                </View>
            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: 'white' }}>
                <Button style={{ marginHorizontal: 25, marginVertical: 10, borderRadius: 10, paddingVertical: 5 }} 
                buttonColor='#0e1c43' 
                textColor='white'
                onPress={() => navigation.navigate('CreatePin')}
            >
                Get Started
            </Button>
            </SafeAreaView>
        </>

    );
};

export default New;