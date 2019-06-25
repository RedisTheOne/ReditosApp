import React, { Component } from "react";
import GetSingle from './GetSingle';
import { ActivityIndicator, StyleSheet, View, Modal, Button, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";

export default class Get extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      article: {},
      fetch: false,
      modalvisible: false
    }
  }

  click = (i) => {
    this.setState({article: this.state.articles[i]}, () => {
      this.setState({modalvisible: true});
    });
  }

  componentDidMount() {
    setInterval(() => {
      fetch('https://ancient-wave-97718.herokuapp.com/articles')
      .then(res => res.json())
      .then(arr => this.setState({articles: arr.reverse(), fetch: true}));
    }, 500);
  }


  render() {
    let output = this.state.articles.map((article, i) => (
      <TouchableOpacity style={styles.view} onLongPress={() => this.click(i)}>
        <Text style={{color: "white", fontSize: 30, width: "50%"}}>{article.title}</Text>
        <Text style={{color: "white", width: "50%"}}>{article.body}</Text>
        <Text style={{color: "white", fontSize: 25, width: "50%"}}>By: {article.author}</Text>
      </TouchableOpacity >
    ));
    let trueOutput = <ActivityIndicator size="large" color="#333" />;
    if(this.state.fetch) {
      trueOutput = <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={styles.ScrollView}>{output}</ScrollView>;
    }
    return (
      <View>
        <Modal
        animationType = "slide"
        transparent={false}
        visible={this.state.modalvisible}
        onRequestClose={() => {
          this.setState({modalvisible: false});
        }}
        >
          <View style={styles.modal}>
            <GetSingle article={this.state.article} />
          </View>
        </Modal>
        <View style={{flex: 1, width: "100%", justifyContent: 'center', alignItems: 'center'}}>
          {trueOutput}
        </View>
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
    width: "80%"
  },
  ScrollView: {
    marginTop: 10,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

});
