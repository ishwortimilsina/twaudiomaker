import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { UnTouchableMenuItem } from '../common/unTouchableMenuItem';
import { millToClockString } from '../../utils/datetime';

export default function PlaybackMenu(props) {
    const {
        audioDuration,
        audioCreated,
        audioName,
        audioUri,
        audioMimeType,
        audioBitsPerSample,
        audioSampleRate,
        audioNumChannels,
        audioBitRate } = props.item;
    const durationString = millToClockString(audioDuration);
    const location = audioUri.replace('/storage/emulated/0/', '/Internal Storage/');
    const format = `${audioMimeType}, ${audioBitsPerSample}bit, ${Math.floor(audioBitRate / 1000)}kbps, ${Math.floor(audioSampleRate / 1000)}KHz, ${audioNumChannels === 1 ? 'Mono': 'Stereo'}`;
    return (
        <>
            <Text style={styles.menuTitle} numberOfLines={1}>Details</Text>
            <UnTouchableMenuItem
                itemIconName="file"
                itemText="File Name"
                itemSubText={audioName}
            />
            <UnTouchableMenuItem
                itemIconName="calendar"
                itemText="Created"
                itemSubText={new Date(audioCreated).toLocaleString()}
            />
            <UnTouchableMenuItem
                itemIconName="timer-sand"
                itemText="Duration"
                itemSubText={durationString}
            />
            <UnTouchableMenuItem
                itemIconName="music-note"
                itemText="Format"
                itemSubText={format}
            />
            <UnTouchableMenuItem
                itemIconName="folder"
                itemText="Location"
                itemSubText={location}
            />
        </>
    )
}

const styles = StyleSheet.create({
    menuTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    }
});