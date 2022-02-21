import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';


export default function MyLoading() {
    return(
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:10
      },
});
