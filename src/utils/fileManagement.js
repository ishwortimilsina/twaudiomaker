import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import RNMediaMetadataRetriever from 'react-native-media-metadata-retriever';

export const storageDirectory = RNFS.ExternalStorageDirectoryPath + '/recordings/music recordings/';

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

                duration = (duration && Number(duration) == duration) ? Number(duration) : 0
                
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

// get a list of files and directories in the document path
export async function getAudioFilesList() {
    return new Promise((resolve, reject) => {

        RNFS.readDir(storageDirectory)
        .then(async (result) => {
            const files = [];
            let metaInfo;
            for (let file of result) {
                // fetch metadata if possible
                metaInfo = await getMetadata(file.path);
                if (metaInfo.error) {
                    console.log(metaInfo.error);
                }

                let { isFile, isDirectory, ...fileMeta } = file;
                
                files.push({ ...fileMeta, ...metaInfo.data });
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

// delete files in the document path
export function deleteAudioFile(fileName) {
    return new Promise((resolve, reject) => {
        // file to delete
        const path = storageDirectory + fileName;

        return RNFS.unlink(path)
            .then(() => {
                console.log(`FILE "${fileName}" DELETED`);
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
 */
export async function moveFileToStorageDir(filePath) {
    const fileName = filePath.split('/').pop();
    const destinationPath = storageDirectory + fileName;
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