import React from 'react';
import { NavigationActions, navigation } from 'react-navigation'
import { View } from 'react-native';
import { Header, Text } from 'react-native-elements';


const AppHeader = ({ goBack }) => {
    const centerComponent = <Text h2 style={{ color: '#fff' }}> XCZLD </Text>;
    const leftComponent = { icon: 'chevron-left', color: '#fff', onPress: () => { console.log('goback', goBack); goBack()} };

    return (<View>
        <Header
            leftComponent={ leftComponent }
            centerComponent={ centerComponent }
            backgroundColor="#009688"/>
    </View>);
}

module.exports = AppHeader;
