import React, { memo } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

const Container = ({ children }) => (
    <View style={styles.container} behavior="padding">
        {children}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default memo(Container);
