import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';

export async function checkRecordAudioPermission() {
    try {
        const result = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);

        switch (result) {
            case RESULTS.UNAVAILABLE:
                console.log('This feature is not available (on this device / in this context)');
                return false;
            case RESULTS.DENIED:
                console.log('The permission is not given but requestable');
                return false;
            case RESULTS.GRANTED:
                console.log('The permission is granted');
                return true;
            case RESULTS.BLOCKED:
                console.log('The permission is denied and not requestable anymore');
                return true;
        }
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
        console.log(result)
        switch (result) {
            case RESULTS.UNAVAILABLE:
                console.log('This feature is not available on this device.');
                return false;
            case RESULTS.DENIED:
                console.log('The permission has been denied but requestable');
                return false;
            case RESULTS.GRANTED:
                console.log('The permission has been granted');
                return true;
            case RESULTS.BLOCKED:
                console.log('The permission has been denied and not requestable anymore');
                return true;
        }
    } catch (err) {
        console.log('An error occured while asking for mic permission.');
        console.error(err);
        return false;
    }
}