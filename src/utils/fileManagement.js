import RNFS from 'react-native-fs';

// get a list of files and directories in the document path
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

// delete files in the document path
export function deleteAudioFile(fileName) {
    return new Promise((resolve, reject) => {
        // file to delete
        const path = RNFS.DocumentDirectoryPath + '/' + fileName;

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