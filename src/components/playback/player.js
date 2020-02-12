import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native';
import { Audio } from 'expo-av';

import { Button, CardSection } from '../common';
import { millToClockString } from '../../utils/datetime';
import { ActionContext, StateContext } from '../../AppContext';
import * as Colors from '../../themes/Colors';

export default function Playback(props) {
    const [playbackInstance, setPlaybackInstance] = useState(null);
    const [isPlaybackPlaying, setIsPlaybackPlaying] = useState(false);
    const [playbackDuration, setPlaybackDuration] = useState(null);
    const [playbackPosition, setPlaybackPosition] = useState(null);
    const [isPlaybackLoaded, setIsPlaybackLoaded] = useState(false);
    const { changeIsPlaybackGoingOn, selectPlayback } = useContext(ActionContext);
    const { isPlaybackGoingOn, isRecordingGoingOn } = useContext(StateContext);

    const onPlaybackStatusUpdate = (status) => {
        setIsPlaybackPlaying(status.isPlaying);
        setPlaybackDuration(status.playableDurationMillis);
        setPlaybackPosition(status.positionMillis);
        setIsPlaybackLoaded(status.isLoaded);

        // update isRecordingGoingOn value in the store
        // so that all the components can pick it up
        if (status.isPlaying && !isPlaybackGoingOn) {
            changeIsPlaybackGoingOn(true);
        } else if (!status.isPlaying && isPlaybackGoingOn) {
            changeIsPlaybackGoingOn(false);
        }
    };

    useEffect(() => {
        (async () => {
            if (props.selectedPlayback) {
                const playbackObject = new Audio.Sound();
                await playbackObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
                await playbackObject.loadAsync({ uri: props.selectedPlayback.audioUri });
                setPlaybackInstance(playbackObject);
            }
        })();
    }, [props.selectedPlayback]);

    useEffect(() => {
        (async () => {
            if (isRecordingGoingOn && playbackInstance) {
                await playbackInstance.unloadAsync();
                await playbackInstance.setOnPlaybackStatusUpdate(null);
                setIsPlaybackPlaying(false);
                setPlaybackDuration(null);
                setPlaybackPosition(null);
                setIsPlaybackLoaded(false);
                setPlaybackInstance(null);
            }
        })();
    }, [isRecordingGoingOn, isPlaybackGoingOn]);

    const onPlayPress = async () => {
        console.log('Playback play pressed.');

        if (isPlaybackLoaded) {
            // to determine if the sound had just finished playing
            if (playbackDuration - playbackPosition <= 500) {
                await playbackInstance.replayAsync();
                console.log('Replaying the sound.');
            }
            else {
                await playbackInstance.playAsync();
                console.log('Sound found. Played.');
            }
        }
    };

    const onPausePress = async () => {
        console.log('Playback pause pressed.');

        if (isPlaybackPlaying) {
            await playbackInstance.pauseAsync();
            console.log('A playing sound found. Paused.');
        }
    };

    const onStopPress = async () => {
        console.log('Playback stop pressed.');

        if (isPlaybackPlaying) {
            await playbackInstance.stopAsync();
            console.log('A playing sound found. Stopped.');
        }
    };

    const onClosePress = async () => {
        console.log('Close button pressed on the player.');

        if (isPlaybackPlaying) {
            await playbackInstance.stopAsync();
            console.log('A playing sound found. Stopped.');
            await playbackInstance.unloadAsync();
            await playbackInstance.setOnPlaybackStatusUpdate(null);
            selectPlayback(null);
        }
    }

    const getSeekSliderPosition = () => {
        if (
            playbackInstance != null &&
            playbackPosition != null &&
            playbackDuration
        ) {
            return playbackPosition/playbackDuration;
        }
        return 0;
    };

    const getPlaybackTimestamp = () => {
        if (
            playbackInstance != null &&
            playbackPosition != null &&
            playbackDuration
        ) {
            return {
                remTime: millToClockString(playbackPosition),
                totTime: millToClockString(playbackDuration)
            };
        }
        return {
            remTime: '00:00:00',
            totTime: '00:00:00'
        };
    };

    const { remTime, totTime } = getPlaybackTimestamp();

    return (
        <CardSection style={styles.controlsContainer}>
            <Button
                style={styles.closeButton}
                onPress={onClosePress}
            >X</Button>
            <Slider
                style={styles.playbackSlider}
                value={getSeekSliderPosition()}
                disabled={false}
            />
            <View style={styles.playbackTimestampContainer}>
                <Text style={styles.playbackTimestamp}>
                    {remTime}
                </Text>
                <Text style={styles.playbackTimestamp}>
                    {totTime}
                </Text>
            </View>
            <View style={styles.buttonsContainer}>
                {
                    isPlaybackPlaying ? (
                        <Button onPress={onPausePress} style={styles.buttons}>
                            Pause
                        </Button>
                    ) : (
                        <Button onPress={onPlayPress} style={styles.buttons}>
                            Play
                        </Button>
                    )
                }
                <Button
                    onPress={onStopPress}
                    style={styles.buttons}
                    disabled={!isPlaybackGoingOn}
                >
                    Stop
                </Button>
            </View>
        </CardSection>
    );
}

const styles = StyleSheet.create({
    controlsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        alignSelf: 'stretch',
        backgroundColor: Colors.background_medium
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    playbackSlider: {
        alignSelf: 'stretch'
    },
    playbackTimestampContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    playbackTimestamp: {
        textAlign: 'right',
        alignSelf: 'stretch',
        paddingRight: 20,
        color: Colors.text_medium
    },
    buttons: {
        minWidth: 100,
        backgroundColor: Colors.background_light
    },
    closeButton: {
        alignSelf: 'flex-end',
        top: -20
    }
});