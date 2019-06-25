import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const listItem = (props) => (
    <View style={styles.listItem}>
        <TouchableOpacity onPress={props.onItemPressed}><Text>{props.placeName}</Text></TouchableOpacity >
    </View>
);

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        marginBottom: 5,
        padding: 10,
        backgroundColor: "#eee"
    }
});

export default listItem;