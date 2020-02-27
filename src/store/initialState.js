/**
 * playbacks: {
 *      <audioId> : {
 *          audioId: <string>,
 *          audioUri: <string>,
 *          audioName: <string>,
 *          audioDuration: <number>, // milliseconds
 *          audioCreated: <number> // epoch
 *      }
 * },
 * isRecordingGoingOn: <boolean>,
 * isPlaybackGoingOn: <boolean>,
 * selectedPlayback: {
 *      audioId: <string>,
 *      audioUri: <string>,
 *      audioName: <string>,
 *      audioDuration: <number>, // milliseconds
 *      audioCreated: <number> // epoch
 * },
 * recordingQuality: <string> // "very_low", "low", "medium", "high", "very_high"
 */
const initialState = {
    playbacks: {},
    isRecordingGoingOn: false,
    isPlaybackGoingOn: false,
    selectedPlayback: null,
    recordingQuality: 'high',
    storageLocation: 'public'
};

export default initialState;