import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSafeArea } from 'react-native-safe-area-context';

import usePermission from './components/hooks/usePermissions';
import Home from './components/Home';
import CustomDrawerContent from './navigation/drawerContent';
import Colors from './themes/Colors';
import { StateContext } from './AppContext';

const Drawer = createDrawerNavigator();

export default function Main(props) {
    // just so that this component re-renders during theme change
    const { theme } = useContext(StateContext);
    const havePermission = usePermission();

    const safeAreaInsets = useSafeArea();
    const viewStyle = {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: Colors.background_dark,
        paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right
    };

    return (
        <View style={viewStyle}>
            {havePermission
                ? (
                    <NavigationContainer style={{ flex: 1 }}>
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
                            <Drawer.Screen name="Home" component={Home} />
                        </Drawer.Navigator>
                    </NavigationContainer>
                )
                : <Text>The app needs to have permission to use the mic to be functional.</Text>
            }
        </View>
    )
}