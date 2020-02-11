import React, { useReducer, useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';

import { StateContext, ActionContext } from './AppContext';
import reducer from './store/reducer';
import initialState from './store/initialState';
import Home from './components/Home';

export default function Main(props) {
    const [ havePermission, setPermissionStatus ] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);

    // All the actions
    const addAudioToStore = (audio) => {
        dispatch({ type: 'addAudio', payload: audio });
    };
    const changeIsRecordingGoingOn = (isRecordingGoingOn) => {
        dispatch({ type: 'changeIsRecordingGoingOn', isRecordingGoingOn });
    };
    const changeIsPlaybackGoingOn = (isPlaybackGoingOn) => {
        dispatch({ type: 'changeIsPlaybackGoingOn', isPlaybackGoingOn });
    };
    const selectPlayback = (selectedPlayback) => {
        dispatch({type: 'selectPlayback', selectedPlayback });
    };

    const actions = useMemo(() => ({
        addAudioToStore,
        changeIsPlaybackGoingOn,
        changeIsRecordingGoingOn,
        selectPlayback
    }), []);

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
    
    if (havePermission) {
        return (
            <StateContext.Provider value={state}>
                <ActionContext.Provider value={actions}>
                    <View style={styles.container}>
                        <Home />
                    </View>
                </ActionContext.Provider>
            </StateContext.Provider>
        );
    }

    return (
        <View style={styles.container}>
            <Text>The app needs to have permission to use the mic to be functional.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        margin: 10,
        marginTop: 30,
        flex: 1,
        backgroundColor: '#fff',
    }
});