import React, { Component } from "react";
import username from './username';
import {Alert, StyleSheet, View, Modal, Button, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
      search: "",
      searched: []
    }
  }

  change = (txt) => {
    if(txt !== "") {
      this.setState({search: txt, searched: []});
      this.state.members.forEach(member => {
        if(txt.toLowerCase().indexOf(member.username.toLowerCase()) !== -1) {
          let joined = this.state.searched.concat(member.username);
          this.setState({searched: joined});
        }
      })
    } else {
      this.setState({search: txt});
    }
    
  }

  componentDidMount() {
    fetch('https://ancient-wave-97718.herokuapp.com/members')
    .then(res => res.json())
    .then(arr => this.setState({members: arr}))
    .catch(err => alert(err));
  }

  render() {
    let output = this.state.searched.forEach(search => (
      <View>
        <Text>{search}</Text>
      </View>
    ));
    return(
      <View style={styles.view}> 
        <TextInput value={this.state.search} onChangeText={this.change} style={{width: "80%", borderBottomColor: "#333", marginTop: 30, borderBottomWidth: 1}} />
        <ScrollView
        style={{width: "80%"}}>
          {output}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  }
});