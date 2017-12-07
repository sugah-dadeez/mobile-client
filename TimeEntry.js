import React from 'react';
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

import DateTimePicker from 'react-native-modal-datetime-picker';

export default class TimeEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formattedTime: "",
      timePickerVisible: false
    }
  }

  onTimePicked = (timestamp) => {

    let hoursStr = `${timestamp.getHours() % 13}`;
    let minutesStr = `${timestamp.getMinutes()}`;
    let suffix = timestamp.getHours() > 12 ? 'PM' : 'AM';

    if (minutesStr < 10) {
      minutesStr = "0" + minutesStr;
    }

    this.setState({formattedTime: `${hoursStr}:${minutesStr} ${suffix}`});
    this.props.onTimeSelected(timestamp);
    this.hideTimePicker();
  };

  hideTimePicker() {
    this.setState({timePickerVisible: false});
  }

  showTimePicker() {
    this.setState({timePickerVisible: true});
    Keyboard.dismiss();
  }


  render() {
    return (<View
        style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

      <Text style={styles.label}>{this.props.inputLabel}</Text>
      <TextInput style={styles.input}
                 onFocus={() => this.showTimePicker()}
                 value={this.state.formattedTime}/>

      <DateTimePicker
          mode={'time'}
          isVisible={this.state.timePickerVisible}
          onConfirm={this.onTimePicked}
          onCancel={() => this.hideTimePicker()}/>
    </View>)
  }
}


const styles = StyleSheet.create({
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


