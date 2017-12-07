/**
 * UserRegistration Component
 */

import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Dimensions,
  CheckBox,
  ToastAndroid
} from 'react-native';

import RestClient from './RestClient'

/**
 *
 */
export default class UserRegistration extends React.Component {
  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);
    this.phoneRegexStr = "\\d\\d\\d -\\d\\d\\d\ -\\d\\d\\d\\d";

    this.state = {
      number: "",
      ready: false,
      password1: "",
      password2: "",
    };
  }

  /**
   *
   * @param number
   */
  onChangeNumber(number) {

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

  onSignup() {

    if (this.state.password2 !== this.state.password1) {
      ToastAndroid.showWithGravity("Those Passwords Don't Match!", ToastAndroid.SHORT, ToastAndroid.CENTER);
      return;
    }
    if (this.state.password1.length < 8) {
      ToastAndroid.showWithGravity("That Password is Too Short!", ToastAndroid.SHORT, ToastAndroid.CENTER);
      return;
    }

    if (!this.state.ready) {
      return;
    }

    RestClient.signup({
      "username": this.state.number,
      "password": this.state.password1,
      "is_verified": false,
      "is_driver": false
    }, () => {
      this.props.navigation.navigate("SignIn")
    })
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
              onChangeText={(number) => this.onChangeNumber(number)}
              value={this.state.number}/>

          <TextInput
              maxLength={30}
              style={{width: 175, textAlign: 'center'}}
              placeholder="Password"
              secureTextEntry={true}

              onChangeText={(password) => this.setState({password1: password})}
              value={this.state.password1}/>

          <TextInput
              maxLength={30}
              style={{width: 175, textAlign: 'center'}}
              placeholder="Re-Enter Password"
              secureTextEntry={true}

              onChangeText={(password) => this.setState({password2: password})}
              value={this.state.password2}
          />

          {/*<CheckBox/><Text>I'm a Mover</Text>*/}

          <Button disabled={!this.state.ready}
                  title={"Signup"}
                  onPress={() => this.onSignup()}/>


          <View style={styles.getOuttaHere}>

            <Text style={{fontWeight: 'bold'}}>Already have an Account?</Text>
            <Button disabled={false}
                    title={"Go To Login!"}
                    onPress={() => this.props.navigation.navigate("SignIn")}/>
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
  getOuttaHere: {
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
