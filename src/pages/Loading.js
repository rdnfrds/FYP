import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

// create a component
const Loading = () => {
    return (
        <View style={styles.container}>
           <ActivityIndicator size="large" />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor:'red'
    },
});
export default Loading;