import { ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BackHandler, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Appbar, BottomNavigation, Button, Card, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { storage } from '../../../login';

interface BeepTransaction {
    fare: number | null;
    tapIn: {
        station: string;
        date: string;
    } | null;
    tapOut: {
        station: string;
        date: string;
    } | null;
    distance: number | null;
}

interface BeepCard extends Document {
    cardId: number;
    balance: number;
    transactions: BeepTransaction[];
    deviceID: string;
}

const apiUrl = 'https://mrt-system-be-1qvh.onrender.com';

const Transactions = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [card, setCard] = useState<BeepCard>();
    const cardId = storage.getString('viewCard');

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(`${apiUrl}/cards/${cardId}/cardTransac`);
                const data = await response.json();
                setCard(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCards();
    }, [])


    const formattedDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'Asia/Manila',
        };

        return `${date.toLocaleDateString(undefined, options)}`;
    };

    const _goBack = () => navigation.navigate('Main', {index: 1});
    
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            _goBack();
            return true;
        });

        return () => backHandler.remove();
    }, []);

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#edf3ff' }}>
                <Appbar.Header mode='center-aligned' style={{ backgroundColor: '#0e1c43', height: 50 }} statusBarHeight={0}>
                    <Appbar.BackAction onPress={_goBack} color='white' />
                    <Appbar.Content title="Transactions" titleStyle={{ fontWeight: '900', color: 'white', fontSize: 18 }} />
                </Appbar.Header>

                <ScrollView scrollEnabled={true}>

                    <Card style={{ marginHorizontal: 10, backgroundColor: 'white', marginVertical: 15 }}>
                        <Card.Content>
                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Card Id: {cardId}</Text>
                            <Text style={{ fontSize: 12 }}>Latest Transactions as of {formattedDate(card?.transactions[card.transactions.length - 1]?.tapOut?.date ?? new Date().toISOString())}</Text>
                        </Card.Content>
                    </Card>

                    {card && card.transactions.length === 0 && (
                        <Card style={{ marginHorizontal: 10, backgroundColor: 'white', marginVertical: 3 }}>
                            <Text style={{ textAlign: 'center', padding: 20}}>No transactions to display</Text>
                        </Card>
                    )}

                    {card && card.transactions.length > 0 && (
                        card.transactions
                            .filter(transaction => transaction.tapOut && transaction.tapOut.station !== null)
                            .reverse()
                            .map((transaction, index) => (
                                <Card key={index} style={{ marginHorizontal: 10, backgroundColor: 'white', marginVertical: 3 }}>
                                    <Card.Content style={{ marginLeft: 5, marginVertical: 1 }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                            <View style={{ backgroundColor: '#cfd6dc', padding: 5, width: 40, height: 40, borderRadius: 100, justifyContent: 'center' }}>
                                                <Icon name="log-in-outline" size={25} color={'black'} />
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={{ fontSize: 15 }}>{transaction.tapIn?.station ? transaction.tapIn.station : 'N/A'}</Text>
                                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 285 }}>
                                                    <Text style={{ fontSize: 11, color: 'gray', verticalAlign: 'bottom' }}>{transaction.tapIn?.date ? formattedDate(transaction.tapIn.date) : 'N/A'}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                            <View style={{ backgroundColor: '#cfd6dc', padding: 5, width: 40, height: 40, borderRadius: 100, alignItems: 'flex-end', justifyContent: 'center' }}>
                                                <Icon name="log-out-outline" size={25} color={'black'} />
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={{ fontSize: 15 }}>{transaction.tapOut?.station ? transaction.tapOut.station : 'N/A'}</Text>
                                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 285 }}>
                                                    <Text style={{ fontSize: 11, color: 'gray', verticalAlign: 'bottom' }}>{transaction.tapOut?.date ? formattedDate(transaction.tapOut.date) : 'N/A'}</Text>
                                                    <Text style={{ fontSize: 13, color: 'red', verticalAlign: 'top' }}>- ₱{transaction.fare}.00</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </Card.Content>
                                </Card>
                            ))
                    )}
                    <View style={{marginBottom: 15}}/>
                </ScrollView>

            </SafeAreaView>
        </>

    );
};

export default Transactions;