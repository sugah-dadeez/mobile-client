import React from 'react';
import RestClient from './RestClient';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ToastAndroid,
  Dimensions,
  Button,
  TimePickerAndroid,
  TouchableOpacity,
  Keyboard

} from 'react-native';

import TimeEntry from './TimeEntry';

const InputField = ({inputLabel}) => (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <Text style={styles.label}>{inputLabel}</Text>
      <TextInput style={styles.input}/>
    </View>
);

const AddressDisplay = ({address, addressDescription}) => (
    <View>
      <Text style={{fontSize: 14, fontWeight: 'bold'}}>{addressDescription}</Text>
      <Text
          style={{fontSize: 18}}
          numberOfLines={3}>
        {address}
      </Text>
    </View>
);


export default class DetailEntry extends React.Component {

  constructor(props) {
    super(props);

    this.maxAmountRegexStr = /^\$?[0-9]+(\.[0-9][0-9])?$/;

    this.state = {
      formattedAmount: "$0.00",
      jobStartByTime: "",
      finishByTime: "",
      locations: this.props.navigation.state.params.locations
    };
  }

  setTimeSelected(timeType) {
    return (time) => this.setState(prevState => {
      prevState[timeType] = time;
      return prevState;
    })
  }

  onChangeAmount(amount) {
    if (amount[0] !== '$') {
      amount = '$' + amount
    }
    this.setState({formattedAmount: amount});
  }

  onConfirmJob = () => {

    data = {
      is_active: true,
      square_feet: 100,
      pickup_address: this.state.locations.pickup.formatted_address,
      dropoff_address: this.state.locations.dropoff.formatted_address
    };

    RestClient.call('POST', '/job/', (response) => {
      this.props.navigation.navigate("MoverHome");
    }, data);
  };

  render() {
    return (
        <View style={styles.container}>
          <View style={{paddingBottom: 50}}>
            <AddressDisplay
                addressDescription={'Pickup:'}
                address={this.state.locations.pickup.formatted_address}/>
            <AddressDisplay
                addressDescription={'Dropoff:'}
                address={this.state.locations.dropoff.formatted_address}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={styles.label}>{'Square Feet:'}</Text>
            <TextInput style={styles.input}
                       keyboardType={"numeric"}/>
          </View>
          <TimeEntry
              inputLabel={'Job Start Time:'}
              onTimeSelected={this.setTimeSelected('jobStartByTime')}/>

          <TimeEntry
              inputLabel={'Finish By:'}
              onTimeSelected={this.setTimeSelected('finishByTime')}/>

          {/*<View style={{*/}
          {/*paddingTop: 30,*/}
          {/*flexDirection: 'row',*/}
          {/*alignItems: 'center',*/}
          {/*justifyContent: 'center',*/}
          {/*}}>*/}
          {/*/!*<Text style={styles.label}>{'Max Price:'}</Text>*!/*/}
          {/**/}
          {/*/!*<TextInput style={{fontSize: 30, width: 150, textAlign: 'center'}}*!/*/}
          {/*/!*keyboardType={"numeric"}*!/*/}
          {/*/!*onChangeText={amount => this.onChangeAmount(amount)}*!/*/}
          {/*/!*clearTextOnFocus={true}*!/*/}
          {/*/!*value={this.state.formattedAmount}/>*!/*/}
          {/*</View>*/}
          <Button
              title={"Confirm The Damn Thing!"}
              onPress={() => this.onConfirmJob()}/>
        </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',

  },
  label: {
    fontSize: 18,
    textAlign: 'left'
  },
  input: {
    fontSize: 18,
    width: 100,
    textAlign: 'center'
  }
});


