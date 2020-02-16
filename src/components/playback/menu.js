import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { TouchableMenuItem } from '../common/touchableMenuItem';

export default function Menu(props) {
    const { isModalVisible, toggleModal, name } = props;
    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => toggleModal(!isModalVisible)}
        >
            <View style={styles.modalViewStyle}>
                <Text style={styles.menuTitle} numberOfLines={1}>{name}</Text>
                <TouchableMenuItem
                    onPress={() => console.log('Share clicked.')}
                >
                    <Icon
                        name="share"
                        size={32}
                        color="black"
                    />
                    <Text style={styles.menuItemText}>Share</Text>
                </TouchableMenuItem>
                <TouchableMenuItem
                    onPress={() => console.log('Rename clicked.')}
                >
                    <Icon
                        name="rename-box"
                        size={32}
                        color="black"
                    />
                    <Text style={styles.menuItemText}>Rename</Text>
                </TouchableMenuItem>
                <TouchableMenuItem
                    onPress={() => console.log('Move clicked.')}
                >
                    <Icon
                        name="folder-move"
                        size={32}
                        color="black"
                    />
                    <Text style={styles.menuItemText}>Move</Text>
                </TouchableMenuItem>
                <TouchableMenuItem
                    onPress={() => console.log('Details clicked.')}
                >
                    <Icon
                        name="ballot"
                        size={32}
                        color="black"
                    />
                    <Text style={styles.menuItemText}>Details</Text>
                </TouchableMenuItem>
                <TouchableMenuItem
                    onPress={() => console.log('Delete clicked.')}
                >
                    <Icon
                        name="delete-empty"
                        size={32}
                        color="black"
                    />
                    <Text style={styles.menuItemText}>Delete</Text>
                </TouchableMenuItem>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    kebabStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingLeft: 10
    },
    modalViewStyle: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFF',
        padding: 20
    },
    menuTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    menuItemText: {
        paddingTop: 5,
        fontSize: 18,
        marginLeft: 30
    }
});