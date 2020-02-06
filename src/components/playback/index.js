import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native';

import { Button } from '../common';

/**
 * Function to convert a number to a string with length of at least two
 * eg: 1 => '01', 12 => '12'
 * @param {Number} num 
 */
const convertTo2Digits = (num) => {
    return num > 9 ? '' + num : '0'+ num;
};

/**
 * Function to convert a given time in seconds to a clock string
 * Eg: 3672000 => '01:01:02'
 * @param {Number} millTime 
 */
const timeToClockString = (millTime) => {
    const time = Math.ceil(Number(millTime) / 1000);
    const hours = Math.floor(time/3600);
    const minutes = Math.floor((time - (hours * 3600))/60);
    const seconds = time - (hours * 3600) - (minutes * 60);

    const hoursStr = convertTo2Digits(hours);
    const minStr = convertTo2Digits(minutes);
    const secStr = convertTo2Digits(seconds);

    return `${hoursStr}:${minStr}:${secStr}`;
}

export default function Playback(props) {
    const [isPlaybackPlaying, setIsPlaybackPlaying] = useState(false);
    const [playbackDuration, setPlaybackDuration] = useState(null);
    const [playbackPosition, setPlaybackPosition] = useState(null);
    const [isPlaybackLoaded, setIsPlaybackLoaded] = useState(false);

    const onPlaybackStatusUpdate = (status) => {
        setIsPlaybackPlaying(status.isPlaying);
        setPlaybackDuration(status.playableDurationMillis);
        setPlaybackPosition(status.positionMillis);
        setIsPlaybackLoaded(status.isLoaded);
    };

    useEffect(() => {
        // whenever the new palybackInstance arrives, set a function to be run
        // with the latest status every 500 milliseconds (default)
        (async () => {
            if (props.playbackInstance) {
                const soundStatus = await props.playbackInstance.getStatusAsync();
                if (soundStatus.isLoaded) {
                    await props.playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
                }
            }
        })();
    }, [props.playbackInstance]);

    const onPlayPress = async () => {
        console.log('Playback play pressed.');

        if (isPlaybackLoaded) {
            // to determine if the sound had just finished playing
            if (playbackDuration - playbackPosition <= 500) {
                await props.playbackInstance.replayAsync();
                console.log('Replaying the sound.');
            }
            else {
                await props.playbackInstance.playAsync();
                console.log('Sound found. Played.');
            }
        }
    };

    const onPausePress = async () => {
        console.log('Playback pause pressed.');

        if (isPlaybackPlaying) {
            await props.playbackInstance.pauseAsync();
            console.log('A playing sound found. Paused.');
        }
    };

    const onStopPress = async () => {
        console.log('Playback stop pressed.');

        if (isPlaybackPlaying) {
            await props.playbackInstance.stopAsync();
            console.log('A playing sound found. Stopped.');
        }
    };

    const getSeekSliderPosition = () => {
        if (
            props.playbackInstance != null &&
            playbackPosition != null &&
            playbackDuration != null
        ) {
            return playbackPosition/playbackDuration;
        }
        return 0;
    };

    const getPlaybackTimestamp = () => {
        if (
          props.playbackInstance != null &&
          playbackPosition != null &&
          playbackDuration != null
        ) {
          return {
              remTime: timeToClockString(playbackPosition),
              totTime: timeToClockString(playbackDuration)
          };
        }
        return {
            remTime: '00:00:00',
            totTime: '00:00:00'
        };
    };

    const { remTime, totTime } = getPlaybackTimestamp();

    return (
        <View style={styles.controlsContainer}>
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
                <Button onPress={onPlayPress} style={{minWidth:100}}>
                    Play
                </Button>
                <Button onPress={onPausePress} style={{minWidth:100}}>
                    Pause
                </Button>
                <Button onPress={onStopPress} style={{minWidth:100}}>
                    Stop
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    controlsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#fff',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#fff',
    },
    playbackSlider: {
        alignSelf: 'stretch'
    },
    playbackTimestampContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        alignSelf: 'stretch'
    },
    playbackTimestamp: {
        textAlign: 'right',
        alignSelf: 'stretch',
        paddingRight: 20
    }
});