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
    playbackIds: []
};

export default initialState;