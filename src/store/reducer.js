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