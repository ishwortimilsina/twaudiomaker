import React, { useReducer, useMemo, useEffect } from 'react';
import { StateContext, ActionContext } from '../AppContext';
import reducer from './reducer';
import initialState from './initialState';
import { getKeyVal } from '../utils/asyncStorageManagement';

export default function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    // All the actions
    const addAudioToStore = (audio) => {
        dispatch({ type: 'addAudio', audio });
    };
    const addMultiAudiosToStore = (audios) => {
        dispatch({ type: 'addMultiAudios', audios });
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
        dispatch({ type: 'selectPlayback', selectedPlayback });
    };
    const changeRecordingQuality = (recordingQuality) => {
        dispatch({ type: 'changeRecordingQuality', recordingQuality });
    };
    const changeStorageLocation = (storageLocation) => {
        dispatch({ type: 'changeStorageLocation', storageLocation });
    };
    const changeRecModeChannel = (recModeChannel) => {
        dispatch({ type: 'changeRecModeChannel', recModeChannel });
    };

    useEffect(() => {
        // populate the store with the following saved values in the asyncStorage
        (async function getQualityLocationModeAsync() {
            const recordingQuality = await getKeyVal('recordingQuality');
            changeRecordingQuality(recordingQuality);
            const storageLocation = await getKeyVal('storageLocation');
            changeStorageLocation(storageLocation);
            const recModeChannel = await getKeyVal('recModeChannel');
            changeRecModeChannel(recModeChannel);
            console.log(recordingQuality, storageLocation, recModeChannel);
        })();
    }, []);
    console.log(state.recordingQuality, state.storageLocation, state.recModeChannel);
    const actions = useMemo(() => ({
        addAudioToStore,
        addMultiAudiosToStore,
        removeAudioFromStore,
        changeIsPlaybackGoingOn,
        changeIsRecordingGoingOn,
        selectPlayback,
        changeRecordingQuality,
        changeStorageLocation,
        changeRecModeChannel
    }), []);

    return (
        <StateContext.Provider value={state}>
            <ActionContext.Provider value={actions}>
                {props.children}
            </ActionContext.Provider>
        </StateContext.Provider>
    );
}