import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { CardSection } from '../common';
import * as Colors from '../../themes/Colors';
import { millToClockString } from '../../utils/datetime';
import { ActionContext } from '../../AppContext';
import Menu from './menu';

export default function EachPlaybackItem(props) {
    const { item } = props;
    const { audioName, audioDuration, audioCreated } = item;
    const { selectPlayback } = useContext(ActionContext);
    const [ isModalVisible, toggleModal ] = useState(false);
    const createdDate = new Date(audioCreated);
    const timeString = createdDate.toLocaleTimeString('en-US');
    const dateString = createdDate.toLocaleDateString('en-US');
    const durationString = millToClockString(audioDuration);

    return (
        <TouchableOpacity
            onPress={() => {
                console.log(`Selected audio: ${item.audioName}`);
                selectPlayback(item);
            }}
        >
            <CardSection style={ styles.cardSectionStyle }>
                <View style={ styles.coinAmountContainerStyle }>
                    <Text style={styles.nameStyle} numberOfLines={1}>{audioName}</Text>
                    <View style={styles.durationDateContainer}>
                        <Text style={styles.durationStyle}>{durationString}</Text>
                        <Text style={styles.dateStyle}>{dateString}  {timeString}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.kebabStyle}
                    onPress={() => toggleModal(!isModalVisible)}
                >
                    <Icon
                        name="dots-vertical"
                        size={25}
                        color={Colors.text_light}
                    />
                </TouchableOpacity>
            </CardSection>
            <Menu
                isModalVisible={isModalVisible}
                toggleModal={toggleModal}
                name={item.audioName}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardSectionStyle: {
        backgroundColor: Colors.home_card,
        borderColor: Colors.home_card,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 10,
        marginBottom: 10,
        minWidth: '100%'
    },
    coinAmountContainerStyle: {
        flex: 3
    },
    nameStyle : {
        fontSize: 18,
        color: Colors.text_light,
        marginBottom: 10
    },
    durationDateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    durationStyle: {
        fontSize: 14,
        color: Colors.price_same
    },
    dateStyle: {
        fontSize: 14,
        color: Colors.price_same
    },
    kebabStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingLeft: 10
    },
    modalViewStyle: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFF',
        padding: 30
    }
});