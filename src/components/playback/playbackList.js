import React, { useContext, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { StateContext, ActionContext } from '../../AppContext';
import EachPlaybackItem from './eachPlaybackItem';
import { getAudioFilesList } from '../../utils/fileManagement';

const supportedAudioFormats = {
    'mp3': true,
    'mp4': true,
    'wav': true,
    'aac': true,
    'js': false
};

export default function PlaybackList(props) {
    const { playbacks } = useContext(StateContext);
    const { addAudioToStore } = useContext(ActionContext);

    useEffect(() => {
        async function getFiles() {
            const results = await getAudioFilesList();
            if (!results.error) {
                let fileNameSplit;
                for (let file of results) {
                    if (file.name) {
                        fileNameSplit = file.name.split('.');
                        if (supportedAudioFormats[fileNameSplit[fileNameSplit.length - 1]]) {
                            const createDate = new Date(file.mtime.toString()).getTime();
                            addAudioToStore({
                                audioId: `Recording-${createDate}`,
                                audioUri: file.path,
                                audioName: file.name,
                                audioDuration: file.duration || 0,
                                audioCreated: createDate
                            });
                        }
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
                data={Object.values(playbacks)}
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