import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import DataItem from "../IBMCalculator/DataItem";

const placeData = props => {
  const dataOutput = props.values.map((value, i) => (
    <DataItem
      key = {i}
      placeData = {value}
      ibm = {props.ibms[i]}
      onItemPressed={() => props.onItemSelected(i)}
    />
  ));return <View style={styles.listConntainer}>{dataOutput}</View>
}

const styles = StyleSheet.create({
  listConntainer: {
    width: "100%"
  }
});

export default placeData;