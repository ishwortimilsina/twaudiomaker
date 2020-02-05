import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';

import useClock from '../hooks/useClock';
import { Button } from '../common';

export default function Record(props) {
    const _recording = useRef(null);
    const _sound = useRef(null);
    const [ recordSessionStarted, changeRecordSessionStarted ] = useState(false);
    const [ isRecording, changeIsRecording ] = useState(false);
    const [, clockString ] = useClock({
        startTime: 0,
        pauseClock: recordSessionStarted && !isRecording,
        stopClock: !recordSessionStarted
    });

    const onRecordPress = async () => {
        console.log('Record clicked.');
        changeIsRecording(true);
        if (!recordSessionStarted) {
            const recording = new Audio.Recording();
            try {
                await recording.prepareToRecordAsync(
                    Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
                );
                _recording.current = recording;
                await _recording.current.startAsync();
                // get the recording status each second
                await _recording.current.setProgressUpdateInterval(1000);
                console.log('Recording session started.');
                changeRecordSessionStarted(true);
            }
            catch (err) {
                console.log('An error occured while starting a recording session.');
                console.log(err);
            }
        } else {
            try {
                if (_recording.current) {
                    await _recording.current.startAsync();
                    console.log('Resumed the paused audio recording.');
                } else {
                    console.log('No prepared paused recording found to resume.');
                }
            }
            catch (err) {
                console.log('An error occured while resuming the paused recording.');
                console.log(err);
            }
        }
    };

    const onPauseRecordPress = async () => {
        console.log('Pause Record Clicked.');
        try {
            if (_recording.current) {
                await _recording.current.pauseAsync();
                changeIsRecording(false);
                console.log('Successfully paused recording.');
            } else {
                console.log('No prepared recording found to pause.');
            }
        }
        catch (err) {
            console.log('An error occured while trying to pause recording.');
            console.log(err);
        }
    };

    const onStopRecordPress = async () => {
        console.log('Stop Record Clicked.');
        try {
            if (_recording.current) {
                await _recording.current.stopAndUnloadAsync();
                changeIsRecording(false);
                changeRecordSessionStarted(false);
                console.log('Recording session ended.');

                const info = await _recording.current.getURI();

                const { sound } = await _recording.current.createNewLoadedSoundAsync();
                _sound.current = sound;

                const soundAsset = await MediaLibrary.createAssetAsync(info);
                console.log(soundAsset)
                // to play the sound
                await sound.playAsync();
            } else {
                console.log('No prepared recording found to stop.');
            }
        }
        catch (err) {
            console.log('An error occured while trying to stop the recording.');
            console.log(err);
        }
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