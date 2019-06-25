import React, { Component } from "react";
import { StyleSheet, View, Modal, Text } from "react-native";
import Get from './Get';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Insert from './Add';
import MyArticles from './MyArticles';
import Login from './Login';
import Search from './Search';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';

export class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Login />
        <Get />
      </View>
    );
  }
}

export class Add extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Insert />
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: Home,
    Search,
    Add: Add,
    MyArticles: MyArticles
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home`;
        } else if (routeName === 'Add') {
          iconName = `ios-add`;
        } else if (routeName === 'MyArticles') {
          iconName = `ios-folder`;
        }  else if (routeName === 'Search') {
          iconName = `ios-search`;
        } 

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);


export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: "#f3f3f3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  }
});
