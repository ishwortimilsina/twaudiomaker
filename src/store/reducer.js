const reducer = (state, action) => {
    switch (action.type) {
        case 'addAudio':
            return {
                ...state,
                playbacks: {
                    ...state.playbacks,
                    [action.payload.audioId]: {
                        ...action.payload
                    }
                },
                playbackIds: [
                    ...state.playbackIds,
                    action.payload.audioId
                ]
            };
        case 'removeAudio':
            let newPlaybacks = {};
            let newPlaybackIds = [];

            for (let audioId of state.playbackIds) {
                if (audioId !== action.audioId) {
                    newPlaybacks[audioId] = state.playbacks[audioId];
                    newPlaybackIds.push(audioId);
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
                playbackIds: newPlaybackIds,
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
        default:
            return state;
    }
};

export default reducer;