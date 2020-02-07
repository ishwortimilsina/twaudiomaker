import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';

import Record from './record';
import Playback from './playback';
import PlaybackList from './playback/playbackList';
import { StateContext } from '../AppContext';

export default function Home(props) {
    const [ havePermission, setPermissionStatus ] = useState(false);
    const [ playbackInstance, setPlaybackInstance ] = useState(null);
    const { playbacks, playbackIds } = useContext(StateContext);

    // Ask for the user's permission to use the phone's mic
    // update 'havePermission' state value
    useEffect(() => {
        Audio.requestPermissionsAsync()
            .then((perm) => {
                if (perm.status === 'granted') {
                    MediaLibrary.requestPermissionsAsync()
                        .then((medPerm) => {
                            if (perm.status === 'granted') {
                                setPermissionStatus(true);
                            } else {
                                setPermissionStatus(false);
                            }
                        })
                        .catch(err => {
                            console.log('An error occured while asking for media permission.');
                            console.log(err);
                        })
                } else {
                    setPermissionStatus(false);
                }
            })
            .catch(err => {
                console.log('An error occured while asking for mic permission.')
                console.log(err);
            })
    }, []);

    return (
        <View style={styles.container}>
            {
                havePermission
                    ? (
                        <>
                            <Record />
                            <Playback
                                selectedPlayback={playbacks[playbackIds[playbackIds.length - 1]]}
                            />
                        </>
                ) : (
                    <Text>The app needs to have permission to use the mic to be functional.</Text>
                )
            }
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
    }
});