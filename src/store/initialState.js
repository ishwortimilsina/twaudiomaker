/**
 * playbacks: {
 *      <audioId> : {
 *          audioId: <string>,
 *          audioUri: <string>,
 *          audioName: <string>,
 *          audioDuration: <number>, // milliseconds
 *          audioCreated: <number> // epoch
 *      }
 * }
 */
const initialState = {
    playbacks: {},
    playbackIds: [],
    isRecordingGoingOn: false,
    isPlaybackGoingOn: false,
    selectedPlayback: null
};

export default initialState;