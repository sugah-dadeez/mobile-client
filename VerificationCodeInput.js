/**
 * VerificationCodeInput Component
 */

import React from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';

/**
 *
 */
export default class VerificationCodeInput extends React.Component {
  /**
   *
   * @param props
   */
  constructor(props) {

    super(props);

    this.codeRegexStr = "\\d\\d\\d\\d\\d";
    this.attemptedCodes = new Set();

    this.state = {
      accessCode: ""
    };

  }

  /**
   *
   * @param accessCode
   */
  onChange(accessCode) {
    this.state.number
    const re = new RegExp(this.codeRegexStr.slice(0, 2 * number.length).replace(/\s/g, ''));

    if (re.test(accessCode)) {
      this.setState({
        accessCode: accessCode,
      });
    }

    if (accessCode.length === 5 && !this.attemptedCodes.has(accessCode)) {

      fetch("http://10.0.2.2:5000/api/verify-phone", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          AccessCode: this.state.number
        })
      }).then(
          (response) => {
            return navigate("Verify");
          }
      ).catch((error) => {

        console.error(error);
      });
    }

    this.attemptedCodes.add(accessCode)

  }

  /**
   *
   * @returns {XML}
   */
  render() {

    return (
        <View style={styles.container}>
          <TextInput
              maxLength={5}
              keyboardType={"numeric"}
              style={{width: 200, textAlign: 'center'}}
              placeholder="Enter Your Verification Code"
              onChangeText={(accessCode) => this.onChange(accessCode)}
              value={this.state.accessCode}/>
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
});
