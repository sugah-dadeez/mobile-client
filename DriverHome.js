import React from 'react';
import RestClient from './RestClient';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Dimensions,
  Keyboard,
  ToastAndroid,
  ScrollView,
  FlatList
} from 'react-native';


class JobDisplay extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      bidAmount: "0"
    }
  }

  render() {

    let job = this.props.job;

    return (
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          padding: 15
        }}>

          <Text style={{fontSize: 14, fontWeight: 'bold'}}>{'Pickup From:'}</Text>
          <Text
              style={{fontSize: 18}}
              numberOfLines={3}>
            {job.pickup_address}
          </Text>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>{'Dropoff At:'}</Text>
          <Text
              style={{fontSize: 18}}
              numberOfLines={3}>
            {job.dropoff_address}
          </Text>

          <Text
              style={{
                fontSize: 18,
                paddingTop: 10
              }}>
            {job.square_feet} Square Feet
          </Text>

          <View style={{
            paddingTop: 30,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
            <TextInput
                style={{width: 100}}
                placeholder={'Enter a Bid'}
                value={this.state.bidAmount}
                keyboardType={'numeric'}
                onChangeText={(amount) => this.setState({bidAmount: amount})}/>
            <Button
                style={{
                  fontSize: 14,
                }}
                disabled={!(this.state.bidAmount > 0)}
                title={'Bid Now!'}
                onPress={() => {
                  RestClient.call('POST', `/job/${job.id}/bid/`, (response) => {
                        ToastAndroid.show("Your Bid Has Been Processed", ToastAndroid.CENTER)
                      },
                      {amount: this.state.bidAmount})
                }}/>
          </View>
        </View>);

  }
}

/**
 *
 */
export default class DriverHome extends React.Component {
  constructor(props) {
    super(props);

    RestClient.call('GET', '/job/', this.updateData);
    this.state = {
      ready: false,
      jobs: []
    }
  }

  /**
   * {
        "bids": [],
        "id": 2,
        "is_driver": true,
        "is_verified": true,
        "jobs": [],
        "username": "703-732-7111"
    }
   * @param userData
   */

  updateData = (jobsData) => {

    this.setState({jobs: jobsData});

  };

  render() {
    return (
        <View>

          <FlatList
              data={this.state.jobs.map((item) => ({
                job: item,
                key: item.id
              }))}
              key={'id'}
              renderItem={({item}) => {


                return (

                    <View style={{padding: 5}}>
                      <JobDisplay
                          job={item.job}
                          navigation={this.props.navigation}/></View>)

              }}/>
        </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
