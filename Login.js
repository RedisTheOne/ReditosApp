import React, { Component } from "react";
import { StyleSheet, Modal, TextInput, View, Button, Text, Image, TouchableOpacity} from "react-native";
import username from './username';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalvisible: true,
      signUp: false,
      members: [],
      username: '',
      password: ''
    }
  }

  changeU = (txt) => {
    this.setState({username: txt});
  }

  changeP = (txt) => {
    this.setState({password: txt});
  }

  submit = () => {
    const u = this.state.username;
    const p = this.state.password;
    let check = false;
    this.state.members.map(member => {
      if(member.username === u && member.password === p) {
        this.setState({modalvisible: false});
        check = true;
      }
    });
    if(!check) {
      alert('Incorrect username or password!');
    } else {
      username.push({name: u});
    }
  }

  create = () => {
    fetch('https://ancient-wave-97718.herokuapp.com/members')
      .then((res) => res.json())
      .then((text) => {
        const username = this.state.username;
        const password = this.state.password;
        let check = true;
        text.forEach((t) => {
          if(username === t.username) {
            check = false;
          }
        });
        if(check) {
          if(username !== "" && password !== "") {
            fetch(`https://ancient-wave-97718.herokuapp.com/members/add/${username}/${password}`, {
              method: "POST",
            }).then(res => {
              this.setState({signUp: false, modalvisible: false});
            })
            .catch(err => alert(err));
          }
        } else {
          alert('Username already exist!');
        }
      })
      .catch((err) => alert(err));
  }

  componentDidMount() {
    fetch('https://ancient-wave-97718.herokuapp.com/members')
    .then(res => res.json())
    .then(arr => this.setState({members: arr}))
    .catch(err => alert(err));
  }

  makeSignUp = () => {
    this.setState({signUp: true});
  }

  render() {
    return (
      <Modal
        animationType = "fade"
        transparent={false}
        visible={this.state.modalvisible}
        onRequestClose={() => console.log(123)}>
          <View style={styles.view}>
            <Image source={require('./logo.png')} style={{width: 150, height: 150}} />
            <Text style={{fontSize: 30}}>REDDITOS</Text>
            <View  style={{margin: 20}}>
              <TextInput onChangeText={this.changeU} value={this.state.username} placeholder="Username:" style={{margin: 10, width: 250, borderColor: '#333', borderBottomWidth: 1}} />
              <TextInput onChangeText={this.changeP} value={this.state.password} secureTextEntry={true} placeholder="Password:" style={{margin: 10, width: 250, borderColor: '#333', borderBottomWidth: 1}} />
              <Button onPress={this.submit} color="#333" title="Submit" style={{margin: 10, width: 250}} />
              <TouchableOpacity onPress={this.makeSignUp} style={{marginTop: 20}}>
                <Text>Don't have an account? Sign up now!</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            animationType = "slide"
            transparent={false}
            visible={this.state.signUp}
            onRequestClose={() => this.setState({signUp: false})}>
              <View style={styles.view}>
                <Image source={require('./logo.png')} style={{width: 150, height: 150}} />
                <Text style={{fontSize: 30}}>Sign Up</Text>
                <View  style={{margin: 20}}>
                  <TextInput onChangeText={this.changeU} value={this.state.username} placeholder="Username:" style={{margin: 10, width: 250, borderColor: '#333', borderBottomWidth: 1}} />
                  <TextInput onChangeText={this.changeP} value={this.state.password} secureTextEntry={true} placeholder="Password:" style={{margin: 10, width: 250, borderColor: '#333', borderBottomWidth: 1}} />
                  <Button onPress={this.create} color="#333" title="Submit" style={{margin: 10, width: 250}} />
                </View>
              </View>
            </Modal>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  }
});