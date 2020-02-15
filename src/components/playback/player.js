import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import Audio from 'react-native-sound';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useInterval from '../hooks/useInterval';
import { CardSection } from '../common';
import { millToClockString } from '../../utils/datetime';
import { ActionContext, StateContext } from '../../AppContext';
import * as Colors from '../../themes/Colors';

let playbackProgress = null;
export default function Playback(props) {
    const [playbackInstance, setPlaybackInstance] = useState(null);
    const [isPlaybackPlaying, setIsPlaybackPlaying] = useState(false);
    const [playbackDuration, setPlaybackDuration] = useState(null);
    const [playbackPosition, setPlaybackPosition] = useState(null);
    const [isPlaybackLoaded, setIsPlaybackLoaded] = useState(false);
    const { changeIsPlaybackGoingOn, selectPlayback } = useContext(ActionContext);
    const { isPlaybackGoingOn, isRecordingGoingOn } = useContext(StateContext);

    useEffect(() => {
        // update isRecordingGoingOn value in the store
        // so that all the components can pick it up
        if (isPlaybackPlaying && !isPlaybackGoingOn) {
            changeIsPlaybackGoingOn(true);
        } else if (!isPlaybackPlaying && isPlaybackGoingOn) {
            changeIsPlaybackGoingOn(false);
        }
    }, [isPlaybackGoingOn, isPlaybackPlaying]);

    // This function will be used as a callback to "play"
    // Gets invoked whenever a playback finishes playing
    const playComplete = (success) => {
        if(playbackInstance){
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }

            // stop tracking the playback progress
            if (playbackProgress) {
                clearInterval(playbackProgress);
                playbackProgress = null;
            }

            setIsPlaybackPlaying(false);
            setPlaybackPosition(null);
        }
    };

    // function to track the playback progress and update the appropriate state values
    const onPlaybackStatusUpdate = (playbackObject) => {
        if (playbackObject) {
            playbackProgress = setInterval(() => {
                playbackObject.getCurrentTime((seconds, isPlaying) => {
                    setPlaybackPosition(Math.floor(seconds * 1000));
                    setIsPlaybackPlaying(isPlaying);
                });
            }, 500);
        }
    };

    // Function to play the currently selected sound
    // if the playback is already loaded, just play it
    // otherwise, load the sound and then play it.
    const playSound = () => {
        try {
            if (playbackInstance) {
                // basically means, resume
                // we already have a loaded playbackInstance, we just need to play it
                console.log('A loaded sound found. Playing it.');
                playbackInstance.play(playComplete);
                setIsPlaybackPlaying(true);
                
                // track the playback progress
                onPlaybackStatusUpdate(playbackInstance);

            } else {
                console.log('Loading the selected sound to play it.');
                const playbackObject = new Audio(
                    props.selectedPlayback.audioUri, '',
                    async (error) => {
                        if (error) {
                            console.log('failed to load the sound', error);
                            Alert.alert('Notice', 'audio file error. (Error code : 1)');
                        } else {
                            if (playbackObject) {

                                // loaded successfully
                                setIsPlaybackLoaded(true);
                                setPlaybackInstance(playbackObject);

                                // update playback duration
                                let playbackDuration = playbackObject.getDuration();
                                playbackDuration = playbackDuration && playbackDuration * 1000;
                                setPlaybackDuration(playbackDuration);
                                console.log(`Duration in seconds: ${playbackDuration}`);
                            
                                // Play the sound with an onEnd callback
                                await playbackObject.play(playComplete);

                                console.log('Setting isPlaybackGoingOn to true.');
                                setIsPlaybackPlaying(true);

                                // track the playback progress
                                onPlaybackStatusUpdate(playbackObject);
                            }
                        }
                    }
                );
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        // immediately play the sound whenever the selected sound changes
        // do not wait for the user to click on the play button
        if (props.selectedPlayback) {
            playSound();
        } else {
            if (playbackProgress) {
                clearInterval(playbackProgress);
                playbackProgress = null;
            }
        }
    }, [props.selectedPlayback]);

    useEffect(() => {
        // if the recording has started while the audio is playing,
        // stop playing, release the resource and reset all the state values
        (async () => {
            if (isRecordingGoingOn && playbackInstance) {
                await playbackInstance.release();

                // stop tracking the playback progress
                if (playbackProgress) {
                    clearInterval(playbackProgress);
                    playbackProgress = null;
                }

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
        playSound();
    };

    const onPausePress = async () => {
        console.log('Playback pause pressed.');

        if (isPlaybackPlaying) {
            await playbackInstance.pause();
            console.log('A playing sound found. Paused.');
        }
    };

    const onStopPress = async () => {
        console.log('Playback stop pressed.');

        // stop tracking the playback progress
        if (playbackProgress) {
            clearInterval(playbackProgress);
            playbackProgress = null;
        }

        if (isPlaybackGoingOn) {
            await playbackInstance.stop();

            setIsPlaybackPlaying(false);
            setPlaybackPosition(null);

            console.log('A playing sound found. Stopped.');
        }
    };

    const onClosePress = async () => {
        console.log('Close button pressed on the player.');
        // stop tracking the playback progress
        if (playbackProgress) {
            clearInterval(playbackProgress);
            playbackProgress = null;
        }

        if (isPlaybackPlaying) {
            await playbackInstance.stop();
            await playbackInstance.release();
            setIsPlaybackPlaying(false);
            setPlaybackDuration(null);
            setPlaybackPosition(null);
            setIsPlaybackLoaded(false);
            setPlaybackInstance(null);

            console.log('A playing sound found. Stopped.');
        }
        selectPlayback(null);
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
            <TouchableOpacity
                style={styles.closeButton}
                onPress={onClosePress}
            >
                <Icon
                    name="close-circle"
                    size={32}
                    color="black"
                />
            </TouchableOpacity>
            <Text
                style={styles.nameStyle}
                numberOfLines={1}
            >
                {props.selectedPlayback && props.selectedPlayback.audioName}
            </Text>
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
                        <TouchableOpacity
                            style={styles.controlButtons}
                            onPress={onPausePress}
                        >
                            <Icon
                                name="pause-circle"
                                size={70}
                                color="blue"
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.controlButtons}
                            onPress={onPlayPress}
                        >
                            <Icon
                                name="play-circle"
                                size={70}
                                color="green"
                            />
                        </TouchableOpacity>
                    )
                }
                <TouchableOpacity
                    style={styles.controlButtons}
                    onPress={onStopPress}
                    disabled={!isPlaybackGoingOn}
                >
                    <Icon
                        name="stop"
                        size={50}
                        color={isPlaybackGoingOn ? "red" : "grey"}
                    />
                </TouchableOpacity>
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
    closeButton: {
        alignSelf: 'flex-end',
        top: -20
    },
    controlButtons: {
        marginRight: 20,
        marginLeft: 10,
        marginTop: -20
    },
    nameStyle: {
        marginBottom: 10,
        marginTop: -30,
        padding: 5,
        fontWeight: 'bold',
        fontSize: 15
    }
});