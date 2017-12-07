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
          <Text>
            {(job.winner_id) ? 'This Haul Auction Is Over' : 'The Bids Are Comin In!'}</Text>
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
                title={'View Bids'}
                onPress={() => {
                  this.props.navigation.navigate("ViewBids", {jobId: job.id})
                }}/>
          </View>
        </View>);
  }
}

/**
 *
 */
export default class MoverHome extends React.Component {
  constructor(props) {
    super(props);

    RestClient.call('GET', '/user/', this.updateData);
    this.state = {
      ready: false,
      jobs: []
    }
  }

  /**
   *
   * @param userData
   */

  updateData = (userData) => {
    this.setState({jobs: userData.jobs});
  };

  render() {
    return (
        <View>
          {(this.state.jobs.length === 0) &&
          <View style={{padding: 40}}>
            <Text style={{
              fontSize: 24,
              textAlign: 'center'
            }}>
              It Doesn't Look Like You've Done Anything Yet...
            </Text>
          </View>}
          <View style={{padding: 20}}>
            <Button
                title={'Post a Haul Job!'}
                onPress={() => {
                  this.props.navigation.navigate("SelectLocation");
                }}/>
          </View>
          <ScrollView>
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
          </ScrollView>
        </View>);
  }
}

const
    styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      }
    });
