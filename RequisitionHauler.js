/**
 * VerificationCodeInput Component
 */

import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

import MapView from 'react-native-maps';
import PlacesAutoComplete from './PlacesAutoComplete';

/**
 *
 */
export default class RequisitionHauler extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 40.75522,
        longitude: -73.95929,
        latitudeDelta: 0.05,
        longitudeDelta: 0.02,
      }
    }
  }

  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.02,
            }
          });
        },
        (error) => {

        },
        {enableHighAccuracy: false, timeout: 2000, maximumAge: 1000}
    );
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    return (
        <View style={{flex: 1}}>
          <View style={{
            backgroundColor: '#F5FCFF',
            height: 100,
            justifyContent: 'center',

          }}>
            <PlacesAutoComplete/>
          </View>
          <View style={styles.container}>
            <MapView
                style={styles.map}
                region={this.state.region}/>
          </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({

  container: {
    ...StyleSheet.absoluteFillObject,
    top: 100,
    height: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});


