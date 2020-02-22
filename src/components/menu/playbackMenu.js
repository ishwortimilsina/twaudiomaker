import React, { useContext } from 'react';
import { Text, StyleSheet, Alert } from 'react-native';

import { TouchableMenuItem } from '../common/touchableMenuItem';
import { deleteAudioFile } from '../../utils/fileManagement';
import { ActionContext } from '../../AppContext';

export default function PlaybackMenu(props) {
    const { toggleModal, name, audioId, setActiveMenu } = props;
    const { removeAudioFromStore } = useContext(ActionContext);

    // Delete the audio file, and update the store
    const onDeleteConfim = async () => {
        const result = await deleteAudioFile(name);
        if (result.error) {
            console.log(result.error.message);
        } else {
            removeAudioFromStore(audioId);
        }
    };

    // on Delete menu item press, ask for confimation. If confirmed,
    // call onDeleteConfirm to actually delete the file
    const onDeletePress = () => {
        console.log('Delete clicked.');
        Alert.alert(
            'Confirm',
            `Are you sure you want to delete "${name}"?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => toggleModal(false),
                    style: 'cancel',
                },
                {
                    text: 'YES',
                    onPress: onDeleteConfim
                },
            ],
            {cancelable: true},
        );
    };

    return (
        <>
            <Text style={styles.menuTitle} numberOfLines={1}>{name}</Text>
            <TouchableMenuItem
                onPress={() => console.log('Share clicked.')}
                itemIconName="share"
                itemText="Share"
            />
            <TouchableMenuItem
                onPress={() => console.log('Rename clicked.')}
                itemIconName="rename-box"
                itemText="Rename"
            />
            <TouchableMenuItem
                onPress={() => console.log('Move clicked.')}
                itemIconName="folder-move"
                itemText="Move"
            />
            <TouchableMenuItem
                onPress={() => {
                    console.log('Details clicked.');
                    setActiveMenu('details');
                }}
                itemIconName="ballot"
                itemText="Details"
            />
            <TouchableMenuItem
                onPress={onDeletePress}
                itemIconName="delete-empty"
                itemText="Delete"
            />
        </>
    )
}

const styles = StyleSheet.create({
    menuTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    }
});