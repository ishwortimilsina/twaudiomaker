import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from "react-native-modal";

import PlaybackMenu from './playbackMenu';
import DetailsMenu from './detailsMenu';

export default function Menu(props) {
    const { isModalVisible, toggleModal, item } = props;
    const [ activeMenu, setActiveMenu ] = useState('main');

    useEffect(() => {
        if (!isModalVisible) {
            setActiveMenu('main');
        }
    }, [isModalVisible]);

    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => toggleModal(!isModalVisible)}
        >
            <View style={styles.modalViewStyle}>
                {
                    activeMenu === 'details' ? (
                        <DetailsMenu
                            item={item}
                        />
                    ) : (
                        <PlaybackMenu
                            toggleModal={toggleModal}
                            name={item.audioName}
                            audioId={item.audioId}
                            setActiveMenu={setActiveMenu}
                        />
                    )
                }
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalViewStyle: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFF',
        padding: 20
    }
});