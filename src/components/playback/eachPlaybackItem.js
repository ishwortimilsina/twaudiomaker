import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { CardSection } from '../common';
import * as Colors from '../../themes/Colors';
import { millToClockString } from '../../utils/datetime';

export default function EachPlaybackItem(props) {
    const { item } = props;
    const { audioName, audioDuration, audioCreated } = item;
    const createdDate = new Date(audioCreated);
    const timeString = createdDate.toLocaleTimeString('en-US');
    const dateString = createdDate.toLocaleDateString('en-US');
    const durationString = millToClockString(audioDuration);

    return (
        <TouchableWithoutFeedback
            onPress={() => {}}
        >
            <CardSection style={ styles.cardSectionStyle }>
                <View style={ styles.coinAmountContainerStyle }>
                    <Text style={styles.nameStyle} numberOfLines={1}>{audioName}</Text>
                    <View style={styles.durationDateContainer}>
                        <Text style={styles.durationStyle}>{durationString}</Text>
                        <Text style={styles.dateStyle}>{dateString}  {timeString}</Text>
                    </View>
                </View>
            </CardSection>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    cardSectionStyle: {
        backgroundColor: Colors.home_card,
        borderColor: Colors.home_card,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
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
    }   
});