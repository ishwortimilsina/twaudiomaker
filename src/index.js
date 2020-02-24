import React, { useReducer, useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import {
    checkRecordAudioPermission,
    checkExtStorageReadPermission,
    checkExtStorageWritePermission,
    requestRecordAudioPermission,
    requestExtStorageReadPermission,
    requestExtStorageWritePermission } from './utils/appPermissions';
import { StateContext, ActionContext } from './AppContext';
import reducer from './store/reducer';
import initialState from './store/initialState';
import Home from './components/Home';
import * as Colors from './themes/Colors';

export default function Main(props) {
    const [ havePermission, setPermissionStatus ] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);

    // All the actions
    const addAudioToStore = (audio) => {
        dispatch({ type: 'addAudio', payload: audio });
    };
    const addMultiAudiosToStore = (audios) => {
        dispatch({ type: 'addMultiAudios', payload: audios });
    }
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
        addMultiAudiosToStore,
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
            let isAPGranted = await checkRecordAudioPermission();
            let isESRPGranted = await checkExtStorageReadPermission();
            let isESWPGranted = await checkExtStorageWritePermission();
            if (isAPGranted && isESRPGranted && isESWPGranted) {
                setPermissionStatus(true);
            } else {
                if (!isAPGranted) {
                    isAPGranted = await requestRecordAudioPermission();
                }
                if (!isESRPGranted) {
                    isESRPGranted = await requestExtStorageReadPermission();
                }
                if (!isESWPGranted) {
                    isESWPGranted = await requestExtStorageWritePermission();
                }
                
                if (isAPGranted && isESRPGranted && isESWPGranted) {
                    setPermissionStatus(true);
                }
            }
        })();
    }, []);

    const safeAreaInsets = useSafeArea();
    const viewStyle = {
        ...styles.container,
        paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right
    };
    
    if (havePermission) {
        return (
            <StateContext.Provider value={state}>
                <ActionContext.Provider value={actions}>
                    <View style={viewStyle}>
                        <Home />
                    </View>
                </ActionContext.Provider>
            </StateContext.Provider>
        );
    }

    return (
        <View style={viewStyle}>
            <Text>The app needs to have permission to use the mic to be functional.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: Colors.background_dark,
    }
});