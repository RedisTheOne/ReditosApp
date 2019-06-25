import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';

const dataItem = props => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.touch}>
      <Text style={styles.text}>{props.placeData}->{props.ibm}</Text>
      </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
  text: {
  
  }, touch: {
    alignItems: "center",
    margin: 2,
    padding: 7,
    width: "100%",
    backgroundColor: "#eee"
  }
});

export default dataItem;