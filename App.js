/**
 *
 */

import React, {Component} from 'react';
import UserSignin from './UserSignin';
import LocationSelector from "./LocationSelector";
import UserRegistration from "./UserRegistration";
import MoverHome from "./MoverHome";
import BidView from "./ViewBids";

import {StackNavigator} from 'react-navigation';
import DetailEntry from "./DetailEntry";
import DriverHome from "./DriverHome";

const AppNavigator = StackNavigator({
  SignIn: {screen: UserSignin},
  SignUp: {screen: UserRegistration},
  SelectLocation: {screen: LocationSelector},
  EnterDetails: {screen: DetailEntry},
  MoverHome: {screen: MoverHome},
  ViewBids: {screen: BidView},
  DriverHome: {screen: DriverHome}
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