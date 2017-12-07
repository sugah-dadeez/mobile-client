/**
 * UserSignin Component
 */

import React from 'react';
import RestClient from './RestClient';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Dimensions,
  Keyboard
} from 'react-native';


/**
 *
 */
export default class UserSignin extends React.Component {
  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);
    this.phoneRegexStr = "\\d\\d\\d -\\d\\d\\d\ -\\d\\d\\d\\d";

    this.state = {
      number: "",
      password: "",
      ready: false
    };
  }

  /**
   *
   * @param number
   */
  onChange(number) {

    if (number.length === 3 || number.length === 7) {
      if (number.length > this.state.number.length) {
        number += "-";
      }
      if (number.length < this.state.number.length) {
        number = number.slice(0, -1);
      }
    }

    const re = new RegExp(this.phoneRegexStr.slice(0, 2 * number.length).replace(/\s/g, ''));

    if (re.test(number)) {

      this.setState({
        number: number,
        ready: number.length === 12
      });

    }
  }

  onLogin() {

    Keyboard.dismiss();
    RestClient.login({
      username: this.state.number,
      password: this.state.password
    }, () => {
      return this.props.navigation.navigate("MoverHome");
    })
  }

  onDoSignup() {
    this.props.navigation.navigate("SignUp")
  }

  /**
   *
   * @returns {XML}
   */
  render() {

    return (
        <View style={styles.container}>
          <TextInput
              maxLength={12}
              keyboardType={"phone-pad"}
              style={{width: 175, textAlign: 'center'}}
              placeholder="Phone Number"
              onChangeText={(number) => this.onChange(number)}
              value={this.state.number}/>

          <TextInput
              maxLength={30}
              style={{width: 175, textAlign: 'center'}}
              placeholder="Password"
              secureTextEntry={true}

              onChangeText={(password) => this.setState({password: password})}
              value={this.state.password}/>

          <Button disabled={!this.state.ready}
                  title={"Login"}
                  onPress={() => this.onLogin()}/>

          <View style={styles.signupArea}>

            <Text style={{fontWeight: 'bold'}}>New User?</Text>
            <Button disabled={false}
                    title={"Sign up Now!"}
                    onPress={() => this.onDoSignup()}/>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  signupArea: {
    position: 'absolute',
    height: 100,
    left: 0,
    right: 0,
    top: (Dimensions.get('window').height - 150),
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
