import React, { useContext, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { StateContext, ActionContext } from '../../AppContext';
import EachPlaybackItem from './eachPlaybackItem';
import { getAudioFilesList } from '../../utils/fileManagement';

const supportedAudioFormats = {
    'mp3': true,
    'mp4': true,
    'wav': true,
    'x-wav': true,
    'aac': true,
    'js': false
};

/**
 * Function to go through all the files and and create an array of objects with
 * audio data to be used wherever in the app.
 * @param {array} results // list of audio files
 */
const processResults = (results) => {
    const allAudios = {};
    let mimeTypeSplit;
    for (let file of results) {
        if (file.name) {
            mimeTypeSplit = file.mime_type.split('/');
            if (supportedAudioFormats[mimeTypeSplit[mimeTypeSplit.length - 1]]) {
                const createDate = new Date(file.mtime.toString()).getTime();
                allAudios[`Recording-${createDate}`] =  {
                    audioId: `Recording-${createDate}`,
                    audioUri: file.path,
                    audioName: file.name,
                    audioDuration: file.duration,
                    audioCreated: createDate,
                    audioAlbum: file.album,
                    audioArtist: file.artist,
                    audioBitRate: file.bit_rate,
                    audioBitsPerSample: file.bits_per_sample,
                    audioGenre: file.genre,
                    audioMimeType: file.mime_type,
                    audioNumChannels: file.num_channels,
                    audioSampleRate: file.sample_rate,
                    audioSize: file.size,
                    audioTitle: file.title
                };
            }
        }
    }
    return allAudios;
};

export default function PlaybackList(props) {
    const { playbacks, isRecordingGoingOn } = useContext(StateContext);
    const { addMultiAudiosToStore } = useContext(ActionContext);

    useEffect(() => {
        async function audioFilesGetter(){
            const results = await getAudioFilesList();
            if (!results.error) {
                let audioArray = processResults(results);
                addMultiAudiosToStore(audioArray);
            }
        }
        const filesGetter = setInterval(audioFilesGetter, 5000);

        return () => clearInterval(filesGetter);
    }, []);

    useEffect(() => {
        // read files again as soon as a recording is done
        if(!isRecordingGoingOn) {
            (async function audioFilesGetter(){
                const results = await getAudioFilesList();
                if (!results.error) {
                    let audioArray = processResults(results);
                    addMultiAudiosToStore(audioArray);
                }
            })();
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