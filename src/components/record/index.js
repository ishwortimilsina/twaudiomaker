import React, { useState, useRef, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';

import { Button } from '../common';
import { millToClockString } from '../../utils/datetime';
import { ActionContext } from '../../AppContext';

export default function Record(props) {
    const _recording = useRef(null);
    const _sound = useRef(null);
    const [ recordSessionStarted, changeRecordSessionStarted ] = useState(false);
    const [ isRecording, changeIsRecording ] = useState(false);
    const [ recordingDuration, setRecordingDuration ] = useState(0);
    const { addAudioToStore } = useContext(ActionContext);
    
    const onRecordingStatusUpdate = status => {
        if (status.canRecord) {
            changeIsRecording(status.isRecording);
            setRecordingDuration(status.durationMillis);
        } else if (status.isDoneRecording) {
            changeIsRecording(status.isRecording);
            setRecordingDuration(status.durationMillis);
        }
    };

    const onRecordPress = async () => {
        console.log('Record clicked.');
        if (!recordSessionStarted) {
            const recording = new Audio.Recording();
            try {
                await recording.prepareToRecordAsync(
                    Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
                );
                _recording.current = recording;
                await _recording.current.startAsync();
                // get the recording status each second
                await _recording.current.setOnRecordingStatusUpdate(onRecordingStatusUpdate);
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

        if (props.latestPlaybackInstance) {
            await props.latestPlaybackInstance.setOnPlaybackStatusUpdate(null);
            props.setPlaybackInstance(null);
        }
    };

    const onPauseRecordPress = async () => {
        console.log('Pause Record Clicked.');
        try {
            if (_recording.current) {
                await _recording.current.pauseAsync();
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
                changeRecordSessionStarted(false);
                console.log('Recording session ended.');

                const { sound } = await _recording.current.createNewLoadedSoundAsync();
                _sound.current = sound;

                // to download the recording
                const uri = await _recording.current.getURI();
                // const soundAsset = await MediaLibrary.createAssetAsync(uri);

                const status = await sound.getStatusAsync();
                addAudioToStore({
                    audioId: uri.split('/Audio/recording-')[1].slice(0, -4),
                    audioUri: uri,
                    audioName: uri.split('/Audio/')[1],
                    audioDuration: status.durationMillis,
                    audioCreated: Date.now()
                });
                props.setPlaybackInstance(sound);
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
                    {millToClockString(recordingDuration)}
                </Text>
            </View>
            <View style={styles.buttonsContainer}>
                {
                    !isRecording ? (
                        <Button onPress={onRecordPress} style={{minWidth:150}}>
                            Record
                        </Button>
                    ) : (
                        <Button onPress={onPauseRecordPress} style={{minWidth:150}}>
                            Pause
                        </Button>
                    ) 
                }
                <Button
                    onPress={onStopRecordPress}
                    disabled={!recordSessionStarted}
                    style={{minWidth:150}}
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