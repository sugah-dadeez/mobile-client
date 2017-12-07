/**
 * LocationSelector Component
 */

import React from 'react';
import {StyleSheet, View, TextInput, Text, ToastAndroid, Dimensions, Button} from 'react-native';

import MapView from 'react-native-maps';
import PlacesAutoComplete from './PlacesAutoComplete';


const InputField = ({inputLabel}) => (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <Text style={{fontSize: 22, textAlign: 'right'}}>{inputLabel}</Text>
      <TextInput style={{width: 135, fontSize: 22, textAlign: 'center'}}/>
    </View>
);

/**
 *
 */
export default class LocationSelector extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mapRegion: {
        latitude: 40.75522,
        longitude: -73.95929,
        latitudeDelta: 0.05,
        longitudeDelta: 0.02,
      },

      locations: {
        pickup: null,
        dropoff: null
      },

      markers: {}
    }
  }

  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            mapRegion: {
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

  /*
    type is : 'pickup' or 'dropoff'
   */
  setLocation(type) {
    return (data, details) => { // 'details' is provided when fetchDetails = true


      this.setState(prevState => {
        prevState.locations[type] = details;
        return prevState;
      })
    }
  }

  /*
   ...
   "geometry" : {
    "location" : {
       "lat" : 37.4224764,
       "lng" : -122.0842499
    },
    ...
   */
  getMarkers() {
    markers = [];

    for (locationType in this.state.locations) {

      location = this.state.locations[locationType];
      if (location !== null) {

        markers.push({
          latlng: {
            latitude: location.geometry.location.lat,
            longitude: location.geometry.location.lng
          },
          identifier: locationType,
          title: locationType,
          description: location.formatted_address
        });
      }
    }

    //this._mapView.fitToSuppliedMarkers(markers, false);
    return markers;
  }

  goNext = () => {
    this.props.navigation.navigate("EnterDetails", {locations: this.state.locations});
  };

  /**
   *
   * @returns {XML}
   */
  render() {
    return (
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>

          <View style={{
            height: 100
          }}>
            <PlacesAutoComplete
                placeholder={'Pickup Location'}
                listView={styles.placesOverlay}
                onSelect={this.setLocation('pickup')}/>

            <PlacesAutoComplete
                placeholder={'Dropoff Location'}
                listView={styles.placesOverlay}
                onSelect={this.setLocation('dropoff')}/>
          </View>


          <View style={styles.container}>
            <MapView
                ref={component => {
                  this._mapView = component
                }}
                style={styles.map}
                region={this.state.mapRegion}>

              {this.getMarkers().map((marker, i) => (
                  <MapView.Marker
                      key={i}
                      coordinate={marker.latlng}
                      title={marker.title}
                      description={marker.description}
                  />
              ))}

            </MapView>
          </View>


          <View style={styles.nextArea}>
            {(this.state.locations.pickup && this.state.locations.dropoff) ?
                <Button disabled={false}
                        title={"Do The Next Thing!"}
                        onPress={this.goNext}/>
                : (this.state.locations.pickup || this.state.locations.dropoff) &&
                <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>
                  Select Pickup and Dropoff Locations!</Text>}
          </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  placesOverlay: {
    position: 'absolute',
    top: 50,
    zIndex: 10,
    backgroundColor: 'white',
  },
  nextArea: {
    position: 'absolute',
    height: 150,
    left: 0,
    right: 0,
    top: (Dimensions.get('window').height - 200),
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  }
});