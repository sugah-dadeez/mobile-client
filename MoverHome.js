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


const JobDisplay = ({job}) => (

    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
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

    </View>
);

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

  updateData = (userData) => {
    this.setState({jobs: userData.jobs});
    ToastAndroid.showWithGravity(JSON.stringify(this.state.jobs), ToastAndroid.SHORT, ToastAndroid.CENTER);

  };

  render() {
    return (
        <View>
          <View style={{padding: 20}}>
            <Button
                title={'Post a Haul Job!'}
                onPress={() => {
                  this.props.navigation.navigate("SelectLocation");
                }}/>
          </View>
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
                          job={item.job}/></View>)
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
