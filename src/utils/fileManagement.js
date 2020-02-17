import RNFS from 'react-native-fs';

const storageDirectory = RNFS.ExternalStorageDirectoryPath + '/recordings/music recordings/';

// get a list of files and directories in the document path
export function getAudioFilesList() {
    return new Promise((resolve, reject) => {
        RNFS.readDir(storageDirectory)
            .then((result) => {
                resolve(result);
                // result[0] && RNFS.readFile(result[0].path, "base64")
                //     .then((res) => console.log(res))
                //     .catch((err) => console.log(err));
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