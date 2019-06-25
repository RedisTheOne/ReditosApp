import React, { Component } from "react";
import GetSingle from './GetSingle';
import username from './username';
import { ActivityIndicator, StyleSheet, Image, View, Modal, Button, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";

export default class MyArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      article: {},
      fetch: false,
      modalvisible: false,
      username: username[0].name,
      modalvisible: false,
      id: 0
    }
  }

  click = (id) => {
    this.setState({modalvisible: true, id});
  }

  delete = () => {
    fetch('https://ancient-wave-97718.herokuapp.com/article/delete', {
      method: 'POST',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        id: this.state.id
      })
    }).catch((err) => alert(err));
    this.setState({modalvisible: false});
  }

  componentDidMount() {
    setInterval(() => {
      fetch('https://ancient-wave-97718.herokuapp.com/article/' + this.state.username)
      .then(res => res.json())
      .then(arr => this.setState({articles: arr.reverse(), fetch: true}));
    }, 500);
  }


  render() {
    let output = this.state.articles.map((article, i) => (
      <View style={styles.view} onLongPress={() => this.click(i)}>
        <TouchableOpacity onPress={() => this.click(article._id)}>
          <Text style={{color: "white", marginLeft: "95%"}}>X</Text>
        </TouchableOpacity>
        <Text style={{color: "white", fontSize: 30, width: "80%"}}>{article.title}</Text>
        <Text style={{color: "white", width: "80%"}}>{article.body}</Text>
      </View>
    ));
    let trueOutput = <ActivityIndicator size="large" color="#333" />;
    if(this.state.fetch) {
      trueOutput = <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={styles.ScrollView}>
      <View style={{display: "flex", flexDirection: "row"}}>
        <View style={{flex: 1}}>
          <Image style={{width: 100, height: 100, margin: 10}} source={require('./avatar.jpg')} />
        </View>
        <View style={{flex: 2}}>
          <Text style={{fontSize: 30, margin: 10, fontFamily: 'roboto', textAlign: 'center'}}>User: {this.state.username}</Text>
          <Text style={{fontSize: 30, margin: 10, fontFamily: 'roboto', textAlign: 'center'}}>Posts: {this.state.articles.length}</Text>
        </View>
      </View>
      {output}
      </ScrollView>;
    }
    return (
      <View style={{background: "white", flex: 1, justifyContent: 'center', textAlign: 'center', alignItems: 'center'}}>
        {trueOutput}
        <Modal
        animationType = "slide"
        transparent={false}
        visible={this.state.modalvisible}
        onRequestClose={() => this.setState({modalvisible: false})}>
          <View style={styles.modal}>
            <Text style={{fontSize: 20}}>Are you sure?</Text>
            <Button onPress={this.delete} style={{width: 250, margin: 20}} color="red" title="DELETE" />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#333",
    color: 'white',
    marginTop: 10,
    padding: 20,
  },
  ScrollView: {
    width: "80%",
    margin: 40
  },
  modal: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  }
});
