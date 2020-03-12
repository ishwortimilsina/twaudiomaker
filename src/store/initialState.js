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
 * storageLocation: <string> // "public", "private"
 * recModeChannel: <number> // 1, 2
 */
const initialState = {
    playbacks: {},
    isRecordingGoingOn: false,
    isPlaybackGoingOn: false,
    selectedPlayback: null,
    recordingQuality: 'high',
    storageLocation: 'public',
    recModeChannel: 2,
    theme: 'green'
};

export default initialState;