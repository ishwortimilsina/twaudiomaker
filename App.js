import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';

import Main from './src';
import CustomDrawerContent from './src/navigation/drawerContent';
import * as Colors from './src/themes/Colors';

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator                
                drawerContent={(props) => <CustomDrawerContent contentContainerStyle={{
                    backgroundColor: Colors.background_light,
                    width: 300,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flex: 1
                }} {...props} />}
            >
                <Drawer.Screen name="Home" component={Main} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
