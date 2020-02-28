import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerN } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import StoreProvider from './src/store/storeProvider';
import Main from './src';
import CustomDrawerContent from './src/navigation/drawerContent';
import * as Colors from './src/themes/Colors';

const Drawer = createDrawerNavigator();

export default function App() {

    return (
        <SafeAreaProvider>
            <StoreProvider>
                <NavigationContainer style={styles.container}>
                    <Drawer.Navigator
                        drawerStyle={{
                            backgroundColor: Colors.background_dark,
                            width: 350,
                            flex: 1
                        }}
                        drawerContent={(props) => (
                            <CustomDrawerContent
                                contentContainerStyle={{
                                    flex: 1
                                }}
                                {...props}
                            />
                        )}
                    >
                        <Drawer.Screen name="Home" component={Main} />
                    </Drawer.Navigator>
                </NavigationContainer>
            </StoreProvider>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background_dark
    },
});
