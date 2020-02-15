import React, { useContext, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { StateContext, ActionContext } from '../../AppContext';
import EachPlaybackItem from './eachPlaybackItem';
import { getAudioFilesList } from '../../utils/fileManagement';

export default function PlaybackList(props) {
    const { playbacks, playbackIds } = useContext(StateContext);
    const { addAudioToStore } = useContext(ActionContext);

    useEffect(() => {
        async function getFiles() {
            const results = await getAudioFilesList();
            if (!results.error) {
                for (let file of results) {
                    if (file.name && file.name.indexOf('.mp3') > -1) {
                        const createDate = new Date(file.mtime.toString()).getTime();
                        addAudioToStore({
                            audioId: `Recording-${createDate}`,
                            audioUri: file.path,
                            audioName: file.name,
                            audioDuration: null,
                            audioCreated: createDate
                        });
                    }
                }
            }
        }

        getFiles();
    }, []);

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