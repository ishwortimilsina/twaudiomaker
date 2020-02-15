import RNFS from 'react-native-fs';

// get a list of files and directories in the main bundle
export function getAudioFilesList() {
    return new Promise((resolve, reject) => {
        RNFS.readDir(RNFS.DocumentDirectoryPath)
            .then((result) => {
                resolve(result);
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