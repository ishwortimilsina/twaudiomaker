import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Record from './record';
import { Audio } from 'expo-av';

export default function Home(props) {
    const [ havePermission, setPermissionStatus ] = useState(false);

    // Ask for the user's permission to use the phone's mic
    // update 'havePermission' state value
    useEffect(() => {
        Audio.requestPermissionsAsync()
            .then((perm) => {
                if (perm.status !== 'denied') {
                    setPermissionStatus(true);
                } else {
                    setPermissionStatus(false);
                }
            })
            .catch(err => {
                console.log('An error occured whhile asking for permission.')
                console.log(err);
            })
    }, []);

    return (
        <View style={styles.container}>
            {
                havePermission
                    ? (
                        <View>
                            <Record />
                        </View>
                ) : (
                    <Text>The app needs to have permission to use the mic to be functional.</Text>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        flex: 1,
        backgroundColor: '#fff',
    }
});