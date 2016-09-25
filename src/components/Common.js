/**
 * Created by gatt on 2016/6/6.
 */
import React, {
    Component
} from 'react';
import ReactNative, {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';

export default class Common {
    static renderLoading(text) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#f00" />
                <Text style={styles.loadingText}>{text}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#f00'
    }
})
