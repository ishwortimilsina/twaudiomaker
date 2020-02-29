import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { audioQualityMap } from '../../constants/audioQualities';
import { millToClockString } from '../../utils/datetime';
import { ActionContext, StateContext } from '../../AppContext';
import { moveFileToStorageDir } from '../../utils/fileManagement';
import * as Colors from '../../themes/Colors';

export default function Record(props) {
    const _recording = useRef(null);
    const [ recordSessionStarted, changeRecordSessionStarted ] = useState(false);
    const [ isRecording, changeIsRecording ] = useState(false);
    const [ recordingDuration, setRecordingDuration ] = useState(0);
    const { changeIsRecordingGoingOn } = useContext(ActionContext);
    const { isRecordingGoingOn, recordingQuality, storageLocation, recModeChannel } = useContext(StateContext);

    useEffect(() => {
        // update isRecordingGoingOn value in the store
        // so that all the components can pick it up
        if (isRecording && !isRecordingGoingOn) {
            changeIsRecordingGoingOn(true);
        } else if (!isRecording && isRecordingGoingOn) {
            changeIsRecordingGoingOn(false);
        }
    }, [isRecording]);

    const onRecordPress = async () => {
        console.log('Record clicked.');
        if (!recordSessionStarted) {
            try {
                const time = new Date();
                const stringDateTime = `${time.getMonth()}-${time.getDate()}-${time.getFullYear()} ${time.getHours()}-${time.getMinutes()}-${time.getSeconds()}`;
                const { encoding, bitRate, channels, sampleRate, quality } = audioQualityMap[recordingQuality];

                const audioPath = AudioUtils.DocumentDirectoryPath + `/Recording ${stringDateTime}.aac`;
                AudioRecorder.prepareRecordingAtPath(audioPath, {
                    SampleRate: sampleRate,
                    Channels: recModeChannel,
                    AudioQuality: quality,
                    AudioEncoding: encoding,
                    AudioEncodingBitRate: bitRate
                });

                await AudioRecorder.startRecording();

                _recording.current = AudioRecorder;
                changeIsRecording(true);
                
                AudioRecorder.onProgress = (data) => {
                    setRecordingDuration(data.currentTime * 1000);
                };

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
                    await _recording.current.resumeRecording();
                    console.log('Resumed the paused audio recording.');
                    changeIsRecording(true);
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
                await _recording.current.pauseRecording();
                console.log('Successfully paused recording.');
                changeIsRecording(false);
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
                const filePath = await _recording.current.stopRecording();
                changeRecordSessionStarted(false);
                changeIsRecording(false);
                console.log('Recording session ended.');

                // move the file to storage directory and let user know about saving
                await moveFileToStorageDir(filePath, storageLocation);
                ToastAndroid.show('Recording saved.', ToastAndroid.SHORT);
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
            <View style={styles.recordContainer}>
                <View style={styles.clockContainer}>
                    <Text style={styles.clockText}>
                        {millToClockString(recordSessionStarted ? recordingDuration : 0)}
                    </Text>
                </View>
                <View style={styles.buttonsContainer}>
                    {
                        !isRecording ? (
                            <TouchableOpacity
                                style={styles.controlButtons}
                                onPress={onRecordPress}
                            >
                                <Icon
                                    name="record-rec"
                                    size={200}
                                    color="green"
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.controlButtons}
                                onPress={onPauseRecordPress}
                            >
                                <Icon
                                    name="pause"
                                    size={200}
                                    color="green"
                                />
                            </TouchableOpacity>
                        ) 
                    }
                    <TouchableOpacity
                        style={styles.controlButtons}
                        onPress={onStopRecordPress}
                        disabled={!recordSessionStarted}
                    >
                        <Icon
                            name="stop-circle"
                            size={70}
                            color={recordSessionStarted ? "red" : "grey"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        flex: 1,
        backgroundColor: Colors.background_extra_dark,
        paddingTop: 100
    },
    recordContainer: {
        backgroundColor: Colors.background_light,
        borderRadius: 25
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    clockText: {
        fontSize: 60,
        marginBottom: 50
    },
    clockContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    controlButtons: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: -80
    }
});