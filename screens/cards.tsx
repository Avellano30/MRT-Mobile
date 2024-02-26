import * as React from 'react';
import { Appbar, Button, Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
// import BeepCard from '../assets/card';

const Cards = () => {
    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');

    return (
        <>
            <Appbar.Header mode='center-aligned'>
                {/* <Appbar.BackAction onPress={_goBack} /> */}
                <Appbar.Content title="Cards" titleStyle={{ fontWeight: '900' }} />
                {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
                <Appbar.Action icon="plus" onPress={_handleMore} />
            </Appbar.Header>

            <Card style={{ margin: 10 }}>
                <Card.Content style={{ position: 'absolute', marginLeft: 5, marginTop: 5, zIndex: 50 }}>
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: '700' }}>6378051234567890</Text>
                    <Text style={{ color: 'white', fontWeight: '300', fontSize: 11 }}>Valid Until 2026-01-30</Text>
                    <Text style={{ color: '#b5b8bf', fontWeight: '300', fontSize: 11, marginTop: 55 }}>Available Balance as of February 24, 2024 06:38 AM</Text>
                    <Text style={{ color: 'white', fontSize: 30, fontWeight: '900' }}>₱63.00</Text>
                </Card.Content>
                <Card.Cover source={require('../assets/card.png')} style={{ zIndex: 0, borderColor: '#0e1c43' }} />
            </Card>

            <Card style={{ borderStyle: 'dashed', borderColor: 'black', borderWidth: 2, margin: 10 }}>
                <Card.Content style={{ marginLeft: 15, zIndex: 50 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center' }}>Add a card™</Text>
                    <Text style={{ fontWeight: '300', fontSize: 11, textAlign: 'center' }}>The card number is found at the back of your card™</Text>
                    <Card.Actions style={{alignItems:'center'}}>
                        <Button textColor='white' style={{backgroundColor: '#0e1c43'}}>Add card</Button>
                    </Card.Actions>
                </Card.Content>
                {/* <Card.Cover source={require('../assets/card.png')} style={{padding: 10, height: 200, zIndex: 0, borderColor: '#0e1c43'}}/> */}
            </Card>
        </>

    );
};

export default Cards;