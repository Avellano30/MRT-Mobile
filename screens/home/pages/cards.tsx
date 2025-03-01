import Clipboard from '@react-native-clipboard/clipboard';
import { ParamListBase, useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, Dimensions, ScrollView, TouchableHighlight, TouchableWithoutFeedback, View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Appbar, Button, Card, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Swipeable from 'react-native-swipeable';
import { storage } from '../../login'

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

const Cards = () => {
    // 'https://mrt-system-be-1qvh.onrender.com'
    // 'http://localhost:8080'
    // 'http://10.200.53.141:8080'

    const screenWidth = Dimensions.get('window').width;

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const _goAdd = () => navigation.navigate('AddCard');
    const _handleMore = () => navigation.navigate('AddCard');

    const [cardClick, setCardClick] = useState<Number | null>(null);
    const [cards, setCards] = useState<BeepCard[]>([]);
    const [mainCard, setMainCard] = useState<String | null>('');

    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused();

    const handleCardClick = (cardId: number) => {
        if (cardClick !== cardId) {
            setCardClick(cardId);
        } else {
            setCardClick(null);
        }
    }

    const handleLongPress = (cardId: number) => {
        try {
            storage.set('mainCard', String(cardId));
            const savedMainCard = storage.getString('mainCard');
            setMainCard(String(savedMainCard));
            Alert.alert('Success', 'Successfully set as main card');
        } catch (error) {
            Alert.alert('Error', 'Failed to set as main card');
        }
    }
    const [deviceID, setDeviceID] = useState('');

    DeviceInfo.getUniqueId().then((uniqueId) => {
        setDeviceID(uniqueId);
    });

    const fetchCards = async () => {
        try {
            const response = await fetch(`${apiUrl}/mobile/card/${deviceID}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setCards(data);

        } catch (error) {
            console.log(error);
        }
    };

    const unlinkCard = async (cardId: any) => {
        try {
            const updateDeviceID = await fetch(`${apiUrl}/mobile/card/${cardId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ deviceID: null }),
            });

            if (!updateDeviceID.ok) {
                throw new Error("Card Unlink Failed");
            }

            fetchCards();
        } catch (error) {
            console.error(error); // Handle error
        }
    };

    const renderSwipeableButtons = (cardId: number, index: number) => {
        return [
            <View>
                <TouchableHighlight
                    key={`view-${index}`}
                    onPress={() => {
                        storage.set('viewCard', `${cardId}`)
                        navigation.navigate('ViewTransaction')
                    }}
                    underlayColor="#dddddd"
                    style={{ backgroundColor: 'darkgray', justifyContent: 'center', paddingLeft: 30, height: 90, borderRadius: 10 }}
                >
                    <Icon name="eye" color={'black'} size={20} />
                </TouchableHighlight>
                <TouchableHighlight
                    key={`delete-${index}`}
                    onPress={() => setModalVisible(true)}
                    underlayColor="#dddddd"
                    style={{ backgroundColor: '#FF3B30', justifyContent: 'center', paddingLeft: 30, height: 90, borderRadius: 10 }}
                >
                    <Icon name='trash' color={'white'} size={20} />
                </TouchableHighlight>

                <View style={styles.container}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', alignItems: 'center', }}>
                            <View style={styles.modalView}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, paddingTop: 20 }}>Remove Card</Text>
                                <Text style={{ marginBottom: 15, textAlign: 'center', fontWeight: '200' }}>Are you sure to remove this card?</Text>
                                <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: 'darkgray', width: 300, justifyContent: 'space-evenly' }}>
                                    <TouchableOpacity style={{ backgroundColor: '#fff', paddingVertical: 15, width: 150, borderBottomLeftRadius: 20 }} onPress={() => setModalVisible(!modalVisible)} >
                                        <Text style={{ color: '#0e1c43', fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>No</Text>
                                    </TouchableOpacity>
                                    <View style={{ borderLeftWidth: 1, borderColor: 'darkgray' }} />
                                    <TouchableOpacity style={{ backgroundColor: '#fff', paddingVertical: 15, width: 150, borderBottomRightRadius: 20 }} onPress={() => { unlinkCard(cardId); setModalVisible(false); }} >
                                        <Text style={{color: 'red', fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>Yes</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        ];
    };

    useEffect(() => {
        const fetchData = async () => {
            if (deviceID) {
                await fetchCards();
                const savedMainCard = storage.getString('mainCard');
                if (savedMainCard === null) {
                    storage.set('mainCard', String(cards[0].cardId));
                    setMainCard(String(cards[0].cardId));
                } else {
                    setMainCard(String(savedMainCard));
                }
            }
        };

        fetchData();
    }, [isFocused, deviceID, cards]);


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

    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#edf3ff', flex: 1 }}>
                <ScrollView>
                    <Appbar.Header mode='center-aligned' style={{ backgroundColor: '#0e1c43', height: 50 }} statusBarHeight={0}>
                        {/* <Appbar.BackAction onPress={_goBack} /> */}
                        <Appbar.Content title="Cards" titleStyle={{ fontWeight: '900', color: 'white', fontSize: 18 }} />
                        {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
                        <Appbar.Action icon="plus" onPress={_handleMore} color='lightblue' />
                    </Appbar.Header>

                    <View style={{ marginBottom: 15 }} />

                    {cards && cards.map((card, index) => (
                        <Swipeable rightButtons={renderSwipeableButtons(card.cardId, index)} key={index}>
                            <Card key={card.cardId} style={{ marginLeft: 15, marginRight: 15, marginBottom: 5, backgroundColor: 'white' }} onPress={() => handleCardClick(card.cardId)} onLongPress={() => handleLongPress(card.cardId)}>
                                <Card.Content style={{ position: 'absolute', marginLeft: 5, marginTop: 5, zIndex: 50 }}>
                                    {mainCard === String(card.cardId) && (
                                        <Icon name="star" size={20} color={'darkorange'} style={{ position: 'absolute', zIndex: 100, top: 15, right: -70 }} />
                                    )}
                                    <TouchableWithoutFeedback onLongPress={() => Clipboard.setString(card.cardId.toString())}>
                                        <Text style={{ color: 'white', fontSize: 24, fontWeight: '700' }}>{card.cardId}</Text>
                                    </TouchableWithoutFeedback>
                                    <Text style={{ color: 'white', fontWeight: '300', fontSize: 11 }}>Valid Until 2026-01-30</Text>
                                    <Text style={{ color: '#b5b8bf', fontWeight: '300', fontSize: 11, marginTop: 45 }}>
                                        Available Balance as of {formattedDate(card.transactions.length > 0 ? (card.transactions[card.transactions.length - 1].tapOut?.date ?? new Date().toISOString()) : new Date().toISOString())}
                                    </Text>
                                    <Text style={{ color: 'white', fontSize: 30, fontWeight: '900' }}>₱{card.balance}.00</Text>
                                </Card.Content>
                                <Card.Cover source={require('../../../assets/card.png')} style={{ zIndex: 0, borderColor: '#0e1c43', height: 180 }} />
                                <View style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,0.3)', height: 180, borderRadius: 10, top: 0, left: 0, right: 0, bottom: 0 }} />

                                {cardClick === card.cardId && card.transactions.length > 0 && (
                                    <Card.Content style={{ marginLeft: 5, marginVertical: 15 }}>
                                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Latest Transaction ({card.transactions.slice(-5).reverse().filter(transaction => transaction.tapOut?.date).length})</Text>
                                        <Text style={{ fontSize: 12 }}>as of {formattedDate(card.transactions[card.transactions.length - 1].tapOut?.date ?? new Date().toISOString())}</Text>
                                        {card.transactions.slice(-5).reverse().filter(transaction => transaction.tapOut?.date).map((transaction, index) => (
                                            <View key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                                <View style={{ backgroundColor: '#cfd6dc', padding: 5, width: 40, height: 40, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Icon name="card-outline" size={25} color={'black'} />
                                                </View>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ fontSize: 15 }}>MRT3 Rail Service Provider</Text>
                                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 280 }}>
                                                        <Text style={{ fontSize: 11, color: 'gray', verticalAlign: 'bottom' }}>{transaction.tapOut?.date ? formattedDate(transaction.tapOut.date) : 'N/A'}</Text>
                                                        <Text style={{ fontSize: 13, color: 'red', verticalAlign: 'top' }}>- ₱{transaction.fare}.00</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        ))}
                                    </Card.Content>
                                )}

                                {cardClick === card.cardId && card.transactions.length === 0 && (
                                    <Card.Content style={{ marginLeft: 5, marginTop: 15 }}>
                                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Latest Transaction ({card.transactions.length})</Text>
                                        <Text style={{ fontSize: 12 }}>as of {formattedDate(new Date().toISOString())}</Text>
                                        <Text style={{ fontSize: 17, textAlign: 'center', marginTop: 15 }}>No transactions to display</Text>
                                    </Card.Content>
                                )}
                            </Card>
                        </Swipeable>

                    ))}

                    <Card style={{ borderStyle: 'dashed', borderColor: 'black', borderWidth: 1, marginLeft: 15, marginRight: 15, marginBottom: 15, overflow: 'hidden' }}>
                        <Card.Content style={{ zIndex: 50 }}>
                            <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center' }}>Add a card™</Text>
                            <Text style={{ fontWeight: '300', fontSize: 11, textAlign: 'center', marginTop: 5, color: '#3b3b3b' }}>The card number is found at the back of your card™</Text>
                            <Card.Actions>
                                <Button textColor='white' style={{ backgroundColor: '#0e1c43', marginLeft: 'auto', marginRight: 'auto', marginVertical: 15, borderRadius: 10 }} onPress={_goAdd}>Add card</Button>
                            </Card.Actions>
                        </Card.Content>
                        <View style={{ position: 'absolute', height: 150, width: screenWidth, backgroundColor: '#c1e1ec', borderRadius: 10 }} />
                    </Card>
                </ScrollView>
            </SafeAreaView>
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default Cards;