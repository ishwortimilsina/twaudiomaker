import { saveKeyVal } from '../utils/asyncStorageManagement';

const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        case 'addAudio':
            newState = {
                ...state,
                playbacks: {
                    ...state.playbacks,
                    [action.audio.audioId]: {
                        ...action.audio
                    }
                }
            };

            // persist in asyncstorage
            saveKeyVal('playbacks', newState.playbacks);

            return newState;
        case 'addMultiAudios':
            newState = {
                ...state,
                playbacks: {
                    ...state.playbacks,
                    ...action.audios
                }
            };

            // persist in asyncstorage
            saveKeyVal('playbacks', newState.playbacks);

            return newState;
        case 'removeAudio':
            let newPlaybacks = {};

            for (let audioId in state.playbacks) {
                if (audioId !== action.audioId) {
                    newPlaybacks[audioId] = state.playbacks[audioId];
                }
            }

            // if removed audio is the same as the currently selected
            // audio for playing, set it to null
            let selectedPlayback = state.selectedPlayback &&
                state.selectedPlayback.audioId === action.audioId
                    ? null
                    : state.selectedPlayback;

            // persist in asyncstorage
            saveKeyVal('playbacks', newPlaybacks);

            return {
                ...state,
                playbacks: newPlaybacks,
                selectedPlayback
            };
        case 'changeIsRecordingGoingOn':
            return {
                ...state,
                isRecordingGoingOn: action.isRecordingGoingOn
            };
        case 'changeIsPlaybackGoingOn':
            return {
                ...state,
                isPlaybackGoingOn: action.isPlaybackGoingOn
            };
        case 'selectPlayback':
            return {
                ...state,
                selectedPlayback: action.selectedPlayback
            };
        case 'changeRecordingQuality':
            let newRecQuality = action.recordingQuality || state.recordingQuality;

            // persist in asyncstorage
            saveKeyVal('recordingQuality', newRecQuality);

            return {
                ...state,
                recordingQuality: newRecQuality
            };
        case 'changeStorageLocation':
            let newStorageLocation = action.storageLocation || state.storageLocation;

            // persist in asyncstorage
            saveKeyVal('storageLocation', newStorageLocation);

            return {
                ...state,
                storageLocation: newStorageLocation
            };
        case 'changeRecModeChannel':
            let newRecMode = action.recModeChannel || state.recModeChannel;

            // persist in asyncstorage
            saveKeyVal('recModeChannel', newRecMode);

            return {
                ...state,
                recModeChannel: newRecMode
            };
        default:
            return state;
    }
};

export default reducer;