import React, { useContext } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { StateContext } from '../../AppContext';
import EachPlaybackItem from './eachPlaybackItem';

export default function PlaybackList(props) {
    const { playbacks, playbackIds } = useContext(StateContext);

    const renderItem = (eachItem) => <EachPlaybackItem {...eachItem} />;

    return (
        <View style={ styles.listContainer }>
            <FlatList
                data={playbackIds.map((id) => playbacks[id])}
                renderItem={renderItem}
                keyExtractor={(item) => item.audioId}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 5,
        justifyContent: 'center'
    }
});