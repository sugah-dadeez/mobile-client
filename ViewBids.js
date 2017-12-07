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

class BidDisplay extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (

        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          padding: 15
        }}>


          <Text style={{fontSize: 14, fontWeight: 'bold'}}>{'Driver Phone Number:'}</Text>
          <Text
              style={{fontSize: 18}}>
            {this.props.bid.driver.username}
          </Text>

          <Text style={{fontSize: 14, fontWeight: 'bold'}}>{'Amount:'}</Text>
          <Text
              style={{fontSize: 18}}>
            ${this.props.bid.amount}
          </Text>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Button
                style={{
                  paddingTop: 20,
                  fontSize: 14,
                  fontWeight: 'bold',
                }}

                title={'Select Bid!'}
                onPress={() => {
                  RestClient.call('PATCH', `/job/${this.props.jobId}`, ((response) => {

                    this.props.navigation.navigate("MoverHome")

                  }), {
                    winning_bid: this.props.bid.id
                  });
                }}/>
          </View>
        </View>);
  }
}

export default class MoverHome extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      bids: [],
      jobId: 1

    };


    RestClient.call('GET', `/job/${this.props.navigation.state.params.jobId}?history=true`, this.updateData);
  }

  updateData = (jobData) => {


    ToastAndroid.showWithGravity(JSON.stringify(jobData), ToastAndroid.SHORT, ToastAndroid.CENTER);

    this.setState({
      bids: jobData.bids,
      jobId: jobData.id
    });
  };

  render() {
    return (
        <View>
          <FlatList
              data={this.state.bids.map((item) => ({
                bid: item,
                key: item.id
              }))}
              renderItem={({item}) => {
                return (
                    <View style={{padding: 5}}>
                      <BidDisplay
                          bid={item.bid}
                          jobId={this.state.jobId}
                          navigation={this.props.navigation}
                      /></View>)
              }}/>
        </View>);
  }
}

