import AsyncStorage from '@react-native-community/async-storage';

/**
 * Function to save a key, value pair in the asyncstorage
 * @param {string} key
 * @param {any} value
 */
export const saveKeyVal = async (key, value) => {
    try {
        const saveVal = typeof value === 'string' ? value : JSON.stringify(value);
        await AsyncStorage.setItem(key, saveVal);
    } catch (ex) {
        console.log(ex);
    }
};

/**
 * Function to read value of a key in the asyncstorage
 * @param {string} key
 */
export const getKeyVal = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (ex) {
        console.log(ex);
    }
};