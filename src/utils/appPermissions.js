import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';

const evaluateResults = (result) => {
    switch (result) {
        case RESULTS.UNAVAILABLE:
        case RESULTS.DENIED:
        case RESULTS.BLOCKED:
            return false;
            return false;
        case RESULTS.GRANTED:
            return true;
            return true;
    }
}

export async function checkRecordAudioPermission() {
    try {
        const result = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
        return evaluateResults(result);
    } catch (err) {
        console.log('An error occured while checking for mic permission.');
        console.error(err);
        return false;
    }
}

export async function requestRecordAudioPermission() {
    try {
        const result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO,
            {
                title: 'Microphone Permission',
                message: 'TW Audio Maker needs access to your microphone to function.',
                buttonNeutral: 'Ask me again',
                buttonNegative: 'Deny',
                buttonPositive: 'Allow',
            },
        );
        return evaluateResults(result);
    } catch (err) {
        console.log('An error occured while asking for mic permission.');
        console.error(err);
        return false;
    }
}

export async function checkExtStorageReadPermission() {
    try {
        const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        return evaluateResults(result);
    } catch (err) {
        console.log('An error occured while checking for external storage read permission.');
        console.error(err);
        return false;
    }
}

export async function requestExtStorageReadPermission() {
    try {
        const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            {
                title: 'Storage Read Permission',
                message: 'TW Audio Maker needs read access to your storage.',
                buttonNeutral: 'Ask me again',
                buttonNegative: 'Deny',
                buttonPositive: 'Allow',
            },
        );
        return evaluateResults(result);
    } catch (err) {
        console.log('An error occured while asking for external storage read permission.');
        console.error(err);
        return false;
    }
}

export async function checkExtStorageWritePermission() {
    try {
        const result = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        return evaluateResults(result);
    } catch (err) {
        console.log('An error occured while checking for external storage write permission.');
        console.error(err);
        return false;
    }
}

export async function requestExtStorageWritePermission() {
    try {
        const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Storage Write Permission',
                message: 'TW Audio Maker needs read access to your storage.',
                buttonNeutral: 'Ask me again',
                buttonNegative: 'Deny',
                buttonPositive: 'Allow',
            },
        );
        return evaluateResults(result);
    } catch (err) {
        console.log('An error occured while asking for external storage write permission.');
        console.error(err);
        return false;
    }
}