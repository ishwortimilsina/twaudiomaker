const reducer = (state, action) => {
    switch (action.type) {
        case 'addAudio':
            return {
                ...state,
                playbacks: {
                    ...state.playbacks,
                    [action.audio.audioId]: {
                        ...action.audio
                    }
                }
            };
        case 'addMultiAudios':
            return {
                ...state,
                playbacks: {
                    ...state.playbacks,
                    ...action.audios
                }
            };
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
            return {
                ...state,
                recordingQuality: action.recordingQuality
            };
        case 'changeStorageLocation':
            return {
                ...state,
                storageLocation: action.storageLocation
            };
        case 'changeRecModeChannel':
            return {
                ...state,
                recModeChannel: action.recModeChannel
            };
        default:
            return state;
    }
};

export default reducer;