import React, { Component } from "react";
import username from './username';
import {Alert, StyleSheet, View, Modal, Button, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";

export default class Insert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: username[0].name,
      body: '',
      title: ''
    }
  }
  click = () => {
    const author = this.state.author;
    const body = this.state.body;
    const title = this.state.title;
    if(body !== "" && title !== "") {
      fetch(`https://ancient-wave-97718.herokuapp.com/articles/add/${title}/${author}/${body}`, {
        method: 'POST'
      });
      Alert.alert('Added!');
      this.setState({body: "", title: ""});
    }
  }

  changeBody = (txt) => {
    this.setState({body: txt});
  }

  changeTitle = (txt) => {
    this.setState({title: txt});
  }

  render() {
    return(
      <View>
        <TextInput value={this.state.title} onChangeText={this.changeTitle} style={{borderBottomColor: 'black', marginBottom: 15, borderBottomWidth: 1, width: 300}} placeholder="Title:" />
        <TextInput multiline={true} value={this.state.body} onChangeText={this.changeBody} style={{borderBottomColor: 'black', marginBottom: 15, borderBottomWidth: 1, width: 300}} placeholder="Body:" />
        <Button title="Add" style={{width: 250}} onPress={() => this.click()} />
      </View>
    );
  }
}