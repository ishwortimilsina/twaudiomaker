import React, { useContext } from 'react';
import { View, StyleSheet, Slider } from 'react-native';

import { StateContext } from '../../AppContext';
import PlaybackList from './playbackList';
import Player from './player';

export default function Playback(props) {
    const { selectedPlayback } = useContext(StateContext);

    return (
        <View style={styles.controlsContainer}>
            <PlaybackList />
            {
                selectedPlayback ? <Player selectedPlayback={selectedPlayback} /> : null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    controlsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 10,
        backgroundColor: '#fff',
    }
});