/**
 *
 */

import React, {Component} from 'react';
import PhoneNumberInput from './PhoneNumberInput';
import VerificationCodeInput from './VerificationCodeInput';
import RequisitionHauler from "./RequisitionHauler";

import {StackNavigator} from 'react-navigation';

const AppNavigator = StackNavigator({
  SignIn: {screen: PhoneNumberInput},
  Verify: {screen: VerificationCodeInput},
  Requisition: {screen: RequisitionHauler},
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