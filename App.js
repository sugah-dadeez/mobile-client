/**
 *
 */

import React, {Component} from 'react';
import PhoneNumberInput from './PhoneNumberInput';
import VerificationCodeInput from './VerificationCodeInput';
import {StackNavigator} from 'react-navigation';

const AppNavigator = StackNavigator({
  SignIn: {screen: PhoneNumberInput},
  Verify: {screen: VerificationCodeInput},
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