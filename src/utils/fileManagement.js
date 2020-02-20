import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import RNMediaMetadataRetriever from 'react-native-media-metadata-retriever';

const storageDirectory = RNFS.ExternalStorageDirectoryPath + '/recordings/music recordings/';

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
            //bits_per_sample     35-36

            buffer = Buffer.from(result, 'ascii').toString('hex').match(/.{1,2}/g);
            const chunk_size = parseInt(buffer.slice(4, 8).reverse().join(""), 16);
            const sample_rate = parseInt(buffer.slice(24, 28).reverse().join(""), 16);
            const num_channels = parseInt(buffer.slice(22, 24).reverse().join(""), 16);
            const bits_per_sample = parseInt(buffer.slice(34, 36).reverse().join(""), 16);

            const duration = parseInt(chunk_size / (sample_rate * num_channels * (bits_per_sample / 8))) * 1000;
            resolve({
                sample_rate,
                num_channels,
                bits_per_sample,
                duration
            });
        })
        .catch((err) => {
            console.log(err.message);
            resolve({
                sample_rate: null,
                num_channels: null,
                bits_per_sample: null,
                duration: 0
            })
        });
    });
}

const getMetadata = (path) => {
    return new Promise((resolve, reject) => {
        RNMediaMetadataRetriever.getMetadata(path)
            .then((info) => {
                const { duration, ...restInfo } = info;
                resolve({
                    error: null,
                    data: {
                        duration: (duration && Number(duration) == duration) ? Number(duration) : 0
                    }
                });
            })
            .catch((error) => {
                resolve({
                    error: error,
                    data: {
                        duration: 0
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
                files.push({ ...file, ...metaInfo.data });
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
export function moveFile(fileName, destinationPath) {
    return new Promise((resolve, reject) => {
        const sourcePath = storageDirectory + fileName;
        const fullDestinationPath = destinationPath + '/' + fileName;

        RNFS.moveFile(sourcePath, fullDestinationPath)
            .then(() => {
                console.log(`FILE "${fileName}" MOVED to ${destinationPath}`);
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