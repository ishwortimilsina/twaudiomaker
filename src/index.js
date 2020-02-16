import React, { useReducer, useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { requestRecordAudioPermission, checkRecordAudioPermission } from './utils/appPermissions';
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
    const removeAudioFromStore = (audioId) => {
        dispatch({ type: 'removeAudio', audioId });
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
        removeAudioFromStore,
        changeIsPlaybackGoingOn,
        changeIsRecordingGoingOn,
        selectPlayback
    }), []);

    // first check the permission to use the mic.
    // Ask for the permission if not already granted.
    // update 'havePermission' state value
    useEffect(() => {
        (async () => {
            let isGranted = await checkRecordAudioPermission();
            if (isGranted) {
                setPermissionStatus(true);
            } else {
                let permission = await requestRecordAudioPermission();
                if (permission) {
                    setPermissionStatus(true);
                }
            }
        })();
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