import React, { useContext, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { StateContext, ActionContext } from '../../AppContext';
import EachPlaybackItem from './eachPlaybackItem';
import { getAudioFiles } from '../../utils/fileManagement';

export default function PlaybackList(props) {
    const { playbacks, isRecordingGoingOn } = useContext(StateContext);
    const { addMultiAudiosToStore } = useContext(ActionContext);

    async function audioFilesGetter(){
        const results = await getAudioFiles();
        if (!results.error) {
            addMultiAudiosToStore(results);
        }
    }

    useEffect(() => {
        const filesGetter = setInterval(audioFilesGetter, 5000);

        return () => filesGetter && clearInterval(filesGetter);
    }, []);

    useEffect(() => {
        // read files again as soon as a recording is done
        if(!isRecordingGoingOn) {
            audioFilesGetter();
        }
    }, [isRecordingGoingOn]);

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