import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Button } from '../common';

export default function Playback(props) {
    const onPlayPress = async () => {
        console.log('Playback play pressed.');

        if (props.playbackInstance) {
            const soundStatus = await props.playbackInstance.getStatusAsync();
            if (soundStatus.isLoaded) {
                // to determine if the sound had just finished playing
                if (soundStatus.playableDurationMillis - soundStatus.positionMillis <= 500) {
                    await props.playbackInstance.replayAsync();
                    console.log('Replaying the sound.');
                }
                else {
                    await props.playbackInstance.playAsync();
                    console.log('Sound found. Played.');
                }
            }
        }
    };

    const onPausePress = async () => {
        console.log('Playback pause pressed.');

        if (props.playbackInstance) {
            const soundStatus = await props.playbackInstance.getStatusAsync();
            if (soundStatus.isPlaying) {
                await props.playbackInstance.pauseAsync();
                console.log('A playing sound found. Paused.');
            }
        }
    };

    const onStopPress = async () => {
        console.log('Playback stop pressed.');

        if (props.playbackInstance) {
            const soundStatus = await props.playbackInstance.getStatusAsync();
            if (soundStatus.isPlaying) {
                await props.playbackInstance.stopAsync();
                console.log('A playing sound found. Stopped.');
            }
        }
    };

    return (
        <View style={styles.controlsContainer}>
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
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#fff',
    }
});