import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { CardSection } from '../common';
import Colors from '../../themes/Colors';
import { millToClockString } from '../../utils/datetime';
import { ActionContext } from '../../AppContext';
import Menu from '../menu';

export default function EachPlaybackItem(props) {
    const { item } = props;
    const { audioName, audioDuration, audioCreated } = item;
    const { selectPlayback } = useContext(ActionContext);
    const [ isModalVisible, toggleModal ] = useState(false);
    const createdDate = new Date(audioCreated);
    const timeString = createdDate.toLocaleTimeString('en-US');
    const dateString = createdDate.toLocaleDateString('en-US');
    const durationString = millToClockString(audioDuration);

    // For theming purposes
    styles.cardSectionStyle = {
        ...styles.cardSectionStyle,
        backgroundColor: Colors.background_medium,
        borderColor: Colors.background_medium
    };
    styles.nameStyle = {
        ...styles.nameStyle,
        color: Colors.text_light
    };
    styles.durationStyle = {
        ...styles.durationStyle,
        color: Colors.date_time_medium
    };
    styles.dateStyle = {
        ...styles.dateStyle,
        color: Colors.date_time_medium
    };

    useEffect(() => {
        return () => {
            // if the component is being removed or unmounted, close the menu modal
            toggleModal(false);
        }
    }, [])

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
                item={item}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardSectionStyle: {
        backgroundColor: Colors.background_medium,
        borderColor: Colors.background_medium,
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
        color: Colors.date_time_medium
    },
    dateStyle: {
        fontSize: 14,
        color: Colors.date_time_medium
    },
    kebabStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingLeft: 10
    }
});