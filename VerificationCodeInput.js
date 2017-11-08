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
  }

  /**
   *
   * @param number
   */
  onChange(number) {
    //TODO:
  }

  /**
   *
   * @returns {XML}
   */
  render() {

    return (
        <View style={styles.container}>
          <TextInput
              maxLength={6}
              keyboardType={"phone-pad"}
              style={{width: 200, textAlign: 'center'}}
              placeholder="Enter Your Verification Code"
              onChangeText={(number) => this.onChange(number)}
              value={this.state.number}/>
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
