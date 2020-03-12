import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, View, ToastAndroid } from 'react-native';

import { Button } from '../common';
import Colors from '../../themes/Colors';
import { renameFile } from '../../utils/fileManagement';

export default function RenameModal(props) {
    const { audioName, audioUri } = props.item;
    const [ name, extension ] = audioName.split('.');
    const [ value, changeValue ] = useState(name);
    const [ hasInputChanged, changeHasInputChanged ] = useState(false);
    const [ renameFailed, changeRenameFailed ] = useState(false);

    // For theming purposes
    styles.textInput = {
        ...styles.textInput,
        borderColor: Colors.background_dark
    };

    const onInputChange = (value) => {
        if (!hasInputChanged) {
            changeHasInputChanged(true);
        }
        changeValue(value);
    };

    const onSubmit = async () => {
        const newName = value + "." + extension;
        const result = await renameFile(audioUri, newName);
        if (result.success) {
            props.toggleModal();
            ToastAndroid.show('File renamed.', ToastAndroid.SHORT);
        } else {

        }
    };

    return (
        <>
            <Text style={styles.modalTitle}>Rename</Text>
            {
                renameFailed ? (
                    <Text style={styles.errorMsg}>
                        Renaming failed.
                    </Text>
                ) : (
                    <>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={onInputChange}
                            value={value}
                        />
                        <View style={styles.buttonsContainer}>
                            <Button
                                style={styles.buttonStyle}
                                buttonText="Cancel "
                            />
                            <Button
                                style={styles.buttonStyle}
                                buttonText="OK "
                                disabled={!hasInputChanged}
                                onPress={onSubmit}
                            />
                        </View>
                    </>
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    textInput: {
        height: 40,
        borderColor: Colors.background_dark,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#FFF'
    },
    buttonsContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    errorMsg: {
        fontSize: 16,
        paddingLeft: 20
    }
});