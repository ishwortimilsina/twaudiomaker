import React, { useReducer, useMemo } from 'react';
import { StateContext, ActionContext } from '../AppContext';
import reducer from './reducer';
import initialState from './initialState';

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
        dispatch({type: 'selectPlayback', selectedPlayback });
    };
    const changeRecordingQuality = (recordingQuality) => {
        console.log(recordingQuality)
        dispatch({type: 'changeRecordingQuality', recordingQuality });
    };
    const changeStorageLocation = (storageLocation) => {
        dispatch({type: 'changeStorageLocation', storageLocation });
    };

    const actions = useMemo(() => ({
        addAudioToStore,
        addMultiAudiosToStore,
        removeAudioFromStore,
        changeIsPlaybackGoingOn,
        changeIsRecordingGoingOn,
        selectPlayback,
        changeRecordingQuality,
        changeStorageLocation
    }), []);

    return (
        <StateContext.Provider value={state}>
            <ActionContext.Provider value={actions}>
                {props.children}
            </ActionContext.Provider>
        </StateContext.Provider>
    );
}