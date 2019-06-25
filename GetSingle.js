import React, { Component } from "react";
import { StyleSheet, View, Modal, Button, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";

export default class GetSingle extends React.Component {
  render() {
    return(
      <View style={{backgroundColor: "#333", width: "100%", height: "100%", flex: 1, justifyContent: 'center', textAlign: 'center', alignItems: 'center'}}>
        <Text style={{textAlign: 'center', borderTopColor: 'white', borderTopWidth: 1 , fontSize: 30, padding: 5, color: 'white', width: "80%"}}>{this.props.article.title}</Text>
        <Text style={{textAlign: 'center', color: 'white', margin: 5,width: "80%", fontSize: 20}}>{this.props.article.body}</Text>
        <Text style={{textAlign: 'center', width: "80%", padding: 5,textAlign:'center', borderBottomColor: 'white', borderBottomWidth: 1 , fontSize: 25, color: 'white'}}>By: {this.props.article.author}</Text>
      </View>
    );
  }
}