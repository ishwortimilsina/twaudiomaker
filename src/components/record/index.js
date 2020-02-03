import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import useClock from '../hooks/useClock';
import { Button } from '../common'; 

export default function Record(props) {
    const [ recordSessionStarted, changeRecordSessionStarted ] = useState(false);
    const [ isRecording, changeIsRecording ] = useState(false);
    const [, clockString ] = useClock({
        startTime: 0,
        pauseClock: recordSessionStarted && !isRecording,
        stopClock: !recordSessionStarted
    });

    const onRecordPress = () => {
        console.log('Record clicked.');
        changeIsRecording(true);
        if (!recordSessionStarted) {
            console.log('Recording session started.')
            changeRecordSessionStarted(true);
        }
    };

    const onPauseRecordPress = () => {
        console.log('Pause Record Clicked.');
        changeIsRecording(false);
    };

    const onStopRecordPress = () => {
        console.log('Stop Record Clicked. Recording session ended.');
        changeIsRecording(false);
        changeRecordSessionStarted(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.clockContainer}>
                <Text style={styles.clockText}>
                    {clockString}
                </Text>
            </View>
            <View style={styles.buttonsContainer}>
                {
                    !isRecording ? (
                        <Button onPress={onRecordPress}>
                            Record
                        </Button>
                    ) : (
                        <Button onPress={onPauseRecordPress}>
                            Pause
                        </Button>
                    ) 
                }
                <Button
                    onPress={onStopRecordPress}
                    disabled={!recordSessionStarted}
                >
                    Stop
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#fff',
    },
    clockText: {
        fontSize: 60,
        marginBottom: 50
    },
    clockContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});