import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import RNMediaMetadataRetriever from 'react-native-media-metadata-retriever';
import { getKeyVal } from './asyncStorageManagement';
import supportedAudioFormats from '../constants/supportedAudioFormats';

/**
 * Function to create a directory at a given path
 * @param {string} path 
 */
const createDirectory = async (path) => {
    return new Promise((resolve) => {
        RNFS.mkdir(path)
            .then((res) => resolve({ success: true }))
            .catch((err) => resolve({ success: false, err }))
    });
};

export const publicStorageDirectory = RNFS.ExternalStorageDirectoryPath + '/recordings/music recordings/';
// create the recordings directory in price document directory location if it doesn't exist
(async function createPrivateRecordingsDirectory() {
    await createDirectory(RNFS.DocumentDirectoryPath + '/recordings/');
})();
export const privateStorageDirectory = RNFS.DocumentDirectoryPath + '/recordings/';

/**
 * Function to get sample_rate, number of channels, bits per sample and duration of a wav audio file
 * @param {string} path 
 */
const getWaveMetadata = (path) => {
    return new Promise((resolve, reject) => {
        RNFS.read(path, 40, 0, 'ascii')
        .then(result => {
            let buffer = new Buffer(40);

            //DATA               BYTES
            ////////////////////////////////////
            //chunk_size         5-6-7-8
            //sample_rate        25-26-27-28
            //num_channels       23-24
            //byte_rate           29-32
            //bits_per_sample     35-36

            buffer = Buffer.from(result, 'ascii').toString('hex').match(/.{1,2}/g);
            const sample_rate = parseInt(buffer.slice(24, 28).reverse().join(""), 16);
            const num_channels = parseInt(buffer.slice(22, 24).reverse().join(""), 16);
            const bit_rate = parseInt(buffer.slice(28, 32).reverse().join(""), 16) * 8; // bytes * 8 = bits
            const bits_per_sample = parseInt(buffer.slice(34, 36).reverse().join(""), 16);

            resolve({
                sample_rate,
                num_channels,
                bit_rate,
                bits_per_sample
            });
        })
        .catch((err) => {
            console.log(err.message);
            resolve({
                sample_rate: 0,
                num_channels: 0,
                bit_rate: 0,
                bits_per_sample
            })
        });
    });
}

/**
 * Function that fetches metadata of the audiofile that resides at the provided path
 * @param {string} path 
 */
const getMetadata = (path) => {
    return new Promise((resolve, reject) => {
        RNMediaMetadataRetriever.getMetadata(path)
            .then(async (info) => {
                let {
                    duration,
                    mime_type,
                    sample_rate,
                    num_channels,
                    bits_per_sample,
                    bit_rate } = info;

                duration = (duration && Number(duration) == duration) ? Number(duration) : 0;

                // for wave file, this api won't return some data points
                // so we use our own metadata extractor
                if (mime_type.indexOf('wav') > -1) {
                    const waveMeta = await getWaveMetadata(path);
                    ({ sample_rate, num_channels, bit_rate, bits_per_sample } = waveMeta);
                }

                resolve({
                    error: null,
                    data: {
                        ...info,
                        duration,
                        sample_rate,
                        num_channels,
                        bit_rate,
                        bits_per_sample: bits_per_sample || 16
                    }
                });
            })
            .catch((error) => {
                resolve({
                    error: error,
                    data: {
                        duration: 0,
                        album: null,
                        artist: null,
                        bit_rate: 0,
                        bits_per_sample: 0,
                        genre: null,
                        mime_type: null,
                        num_channels: 0,
                        sample_rate: 0,
                        title: null
                    }
                })
            })
    });
}

/**
 * Function to go through a file and return an object compatible with how the UI
 * store and the components expect.
 * @param {object} file
 */
const processFileData = (file) => {
    let fileAudio = null;
    let mimeTypeSplit, extension;

    if (file.name && file.mime_type) {
        mimeTypeSplit = file.mime_type.split('/');
        extension = mimeTypeSplit.pop();
        if (supportedAudioFormats[extension]) {
            const createDate = new Date(file.mtime.toString()).getTime();
            fileAudio = {
                audioId: `Recording-${createDate}`,
                audioUri: file.path,
                audioName: file.name,
                audioDuration: file.duration,
                audioCreated: createDate,
                audioAlbum: file.album,
                audioArtist: file.artist,
                audioBitRate: file.bit_rate,
                audioBitsPerSample: file.bits_per_sample,
                audioGenre: file.genre,
                audioMimeType: file.mime_type,
                audioNumChannels: file.num_channels,
                audioSampleRate: file.sample_rate,
                audioSize: file.size,
                audioTitle: file.title
            };
        }
    }
    return fileAudio;
};

/**
 * Function to get metadata, erither from asyncStorage (if the file info is there),
 * or by using our actual metadata retrieval functions.
 * @param {object} audioFilesAsyncStorage
 * @param {object} file
 */
async function retrieveMetadata(audioFilesAsyncStorage, file) {
    let metaInfo, fileId, asyncStorageFile;

    fileId = 'Recording-' + (new Date(file.mtime.toString()).getTime());
    if (
        audioFilesAsyncStorage[fileId] &&
        audioFilesAsyncStorage[fileId].audioName == file.name &&
        audioFilesAsyncStorage[fileId].audioUri == file.path
    ) {
        asyncStorageFile = audioFilesAsyncStorage[fileId];
        metaInfo = {
            data: {
                duration: asyncStorageFile.audioDuration,
                album: asyncStorageFile.audioAlbum,
                artist: asyncStorageFile.audioArtist,
                bit_rate: asyncStorageFile.audioBitRate,
                bits_per_sample: asyncStorageFile.audioBitsPerSample,
                genre: asyncStorageFile.audioGenre,
                mime_type: asyncStorageFile.audioMimeType,
                num_channels: asyncStorageFile.audioNumChannels,
                sample_rate: asyncStorageFile.audioSampleRate,
                title: asyncStorageFile.audioTitle
            },
            error: null
        };
    } else {
        // fetch metadata if possible
        metaInfo = await getMetadata(file.path);
        if (metaInfo.error) {
            console.log(metaInfo.error);
        }
    }

    return metaInfo;
}

/**
 * Function to get a list of files from the public storage location
 * @param {object} audioFilesAsyncStorage
 */
async function getPublicAudioFiles(audioFilesAsyncStorage) {
    return new Promise((resolve, reject) => {
        RNFS.readDir(publicStorageDirectory)
            .then(async (result) => {
                const files = {};
                let metaInfo, fileAudioData;
                for (let file of result) {
                    metaInfo = await retrieveMetadata(audioFilesAsyncStorage, file);

                    const { isFile, isDirectory, ...fileMeta } = file;
                    fileAudioData = processFileData({ ...fileMeta, ...metaInfo.data });

                    if (fileAudioData) {
                        files[fileAudioData.audioId] = fileAudioData;
                    }
                }

                resolve(files);
            })
            .catch((err) => {
                resolve({
                    error: {
                        message: err.message,
                        code: err.code
                    }
                });
            });
    });
}

/**
 * Function to get a list of files from the private storage location
 * @param {object} audioFilesAsyncStorage
 */
async function getPrivateAudioFiles(audioFilesAsyncStorage) {
    return new Promise((resolve, reject) => {
        RNFS.readDir(privateStorageDirectory)
            .then(async (result) => {
                const files = {};
                let metaInfo, fileAudioData;
                for (let file of result) {
                    metaInfo = await retrieveMetadata(audioFilesAsyncStorage, file);

                    const { isFile, isDirectory, ...fileMeta } = file;
                    fileAudioData = processFileData({ ...fileMeta, ...metaInfo.data });

                    if (fileAudioData) {
                        files[fileAudioData.audioId] = fileAudioData;
                    }
                }

                resolve(files);
            })
            .catch((err) => {
                resolve({
                    error: {
                        message: err.message,
                        code: err.code
                    }
                });
            });
    });
}

/**
 * Get a list of files and directories from both public and private locations
 */
export async function getAudioFiles() {
    let allFiles = {};
    let audioFilesAsyncStorage = {};
    // get the files from the asyncStorage, we will use this to not
    // "get" metadata if we already have them for the respective file
    try {
        let asyncPlaybacks = await getKeyVal('playbacks');
        audioFilesAsyncStorage = JSON.parse(asyncPlaybacks);
    } catch (e) {
        console.log(e);
    }

    const publicFiles = await getPublicAudioFiles(audioFilesAsyncStorage);
    if (!publicFiles.error) {
        allFiles = {...publicFiles};
    }

    const privateFiles = await getPrivateAudioFiles(audioFilesAsyncStorage);
    if (!privateFiles.error) {
        allFiles = {...allFiles, ...privateFiles};
    }

    return allFiles;
}

// delete files in the document path
export function deleteAudioFile(filePath) {
    return new Promise((resolve, reject) => {
        return RNFS.unlink(filePath)
            .then(() => {
                console.log(`FILE "${filePath}" DELETED`);
                resolve(true);
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch((err) => {
                resolve({
                    error: {
                        message: err.message,
                        code: err.code
                    }
                });
            });
    });
}

// move files from one location to another
export function moveFile(sourcePath, destinationPath) {
    return new Promise((resolve, reject) => {

        RNFS.moveFile(sourcePath, destinationPath)
            .then(() => {
                console.log(`FILE "${sourcePath}" MOVED to ${destinationPath}`);
                resolve({
                    success:true,
                    destinationPath,
                    moveTime: Date.now()
                });
            })
            // `moveFile` will throw an error, if the item to move does not exist
            .catch((err) => {
                console.log(err)
                resolve({
                    error: {
                        message: err.message,
                        code: err.code
                    }
                });
            });
    });
}

/**
 * Function to move a file to our storage directory location
 * @param {string} filePath
 * @param {string} storageLocation
 */
export async function moveFileToStorageDir(filePath, storageLocation) {
    const fileName = filePath.split('/').pop();
    const destinationPath = (storageLocation === 'private' ? privateStorageDirectory : publicStorageDirectory) + fileName;
    return moveFile(filePath, destinationPath);
}

/**
 * Function to rename a file in-place
 * @param {string} filePath
 * @param {string} newName
 */
export async function renameFile(filePath, newName) {
    const oldName = filePath.split('/').pop();
    const destinationPath = filePath.replace(oldName, newName);
    return moveFile(filePath, destinationPath);
}