/**
 *
 */

import React, {Component} from 'react';
import UserSignin from './UserSignin';
import LocationSelector from "./LocationSelector";
import UserRegistration from "./UserRegistration";
import MoverHome from "./MoverHome";

import {StackNavigator} from 'react-navigation';
import DetailEntry from "./DetailEntry";

const AppNavigator = StackNavigator({
  SignIn: {screen: UserSignin},
  SignUp: {screen: UserRegistration},
  SelectLocation: {screen: LocationSelector},
  EnterDetails: {screen: DetailEntry},
  MoverHome: {screen: MoverHome}
}, {
  mode: 'modal',
  navigationOptions: {
    header: null,
  },
});

export default class App extends Component<{}> {

  render() {
    return (
        <AppNavigator/>
    );
  }
}