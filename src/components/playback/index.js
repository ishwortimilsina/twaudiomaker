import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { StateContext } from '../../AppContext';
import PlaybackList from './playbackList';
import Player from './player';
import * as Colors from '../../themes/Colors';

export default function Playback(props) {
    const { selectedPlayback } = useContext(StateContext);
    const [ playbackToUse, setPlaybackToUse ] = useState(selectedPlayback);

    // This is kind of a hacky solution.
    // Problem:
    // whenever a playing sound is deleted, it doesn't have enough
    // to release resource before  the player itself is unmounted because of
    // the selected playback being null causing the sound to keep playing and
    // react throwing warning.
    // Solution:
    // only remove the player after certain time in case of selectedPlayback
    // being null. This allows the player to stop playing and release resource
    // before being unmounted.
    useEffect(() => {
        const setPlaybackTimeout = setTimeout(() => {
            setPlaybackToUse(selectedPlayback);
        }, 100);

        return () => clearTimeout(setPlaybackTimeout);
    }, [selectedPlayback]);

    return (
        <View style={styles.controlsContainer}>
            <PlaybackList />
            {
                playbackToUse ? <Player selectedPlayback={selectedPlayback} /> : null
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
        padding: 10,
        backgroundColor: Colors.background_extra_dark,
    }
});