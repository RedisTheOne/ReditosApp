import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Modal, Alert, TouchableHighlight } from 'react-native';

import PlaceData from './PlaceData';
import ModalActivisation from './ModalActivisation';

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      i: 0,
      kg: "",
      height: "",
      ibm: 0,
      ibms: [],
      values: [],
      modalVisible: false,
      selectedIbm: null,
      selectedData: null
    }
  }

  placeNameChanged = (val) => {
    this.setState({value: val});
  }

  placeNameChanged1 = (val) => {
    this.setState({kg: val});
  }

  placeNameChanged2 = (val) => {
    this.setState({height: val});
  }

  submit = () => {
    this.setState(prevState => {
      return {
        values: prevState.values.concat(prevState.value),
        
      }
    });
    this.setState({ibm: parseFloat(this.state.kg) / parseFloat(this.state.height) / parseFloat(this.state.height)});
    this.setState(prevState => {
      return {
        ibms: prevState.ibms.concat(prevState.ibm),
      }
      this.setState({ibm: 0});
    });
  }

  placeDeletedHandler = index => {
    this.setState(prevState => {
      return {
        values: prevState.values.filter((place, i) => {
          return place.key !== prevState.selectedPlace;
        }), ibms: prevState.ibms.filter((place, i) => {
          return i !== index;;
        }), 
      };
    });
    this.setState({
      modalVisible: false
    });
  };

  modalClosedHandler = () => {
    this.setState({
      modalVisible: false
    });
  };

  placeSelectedHandler = key => {
    this.setState(prevState => {
      return {
        selectedData: prevState.values.find(place => {
          return place.key === key;
        }), selectedIbm: prevState.ibms.find(place => {
          return place.key === key;
        })
      };
    });
    this.setState({
      modalVisible: true
    });
  }

  render() {
    return(
      <View style={styles.view} >
        <ModalActivisation
        onItemDeleted={this.placeDeletedHandler}
        onModalClosed={this.modalClosedHandler}
        selectedIbm={this.state.selectedIbm}
        selectedData={this.state.selectedData}
        modalVisible={this.state.modalVisible}
        />
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <TextInput style={styles.input} value={this.state.value} onChangeText={this.placeNameChanged} placeholder="Name" />
       
        <TextInput style={styles.input} value={this.state.kg} onChangeText={this.placeNameChanged1} placeholder="Weight(KG)" />
      
        <TextInput style={styles.input} value={this.state.height} onChangeText={this.placeNameChanged2} placeholder="Height(CM)" />
        
        <Button title="Add" style={styles.button} onPress={this.submit} />
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <ScrollView style={styles.scroll} >
        <PlaceData
        values = {this.state.values}
        onItemSelected = {this.placeSelectedHandler}
        ibms={this.state.ibms}
        />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    width: "95%",
    height: "95%"
  }, input: {
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
  }, button: {
    width: "60%",
  }, listItem: {
    fontSize: 20,
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1
  }, scroll: {
    height: "30%",
    width: "100%"
  }
});