/**
 * PhoneNumberInput Component
 */

import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button
} from 'react-native';


/**
 *
 */
export default class PhoneNumberInput extends React.Component {
  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);
    this.phoneRegexStr = "\\d\\d\\d -\\d\\d\\d\ -\\d\\d\\d\\d";

    this.state = {
      number: "",
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

  onSubmit() {

    const {navigate} = this.props.navigation;

    navigate("Verify");

    /* 10.0.2.2	is a special alias to the loopback interface,
       (i.e., 127.0.0.1 on your development machine) */
    // fetch("http://10.0.2.2:5000/api/phone-registration", {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     PhoneNumber: this.state.number
    //   })
    // }).then(() => {
    //       return navigate("Verify");
    //     }
    // ).catch((error) => {
    //   //test
    //   console.error(error);
    //
    // });

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
              placeholder="Enter Your Phone Number"
              onChangeText={(number) => this.onChange(number)}
              value={this.state.number}/>
          <Button disabled={!this.state.ready}
                  title={"Submit"}
                  onPress={() => this.onSubmit()}/>
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
