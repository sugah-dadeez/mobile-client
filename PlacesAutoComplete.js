import React from 'react';

import {StyleSheet, ToastAndroid} from 'react-native';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export default class PlacesAutoComplete extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
        <GooglePlacesAutocomplete
            placeholder={this.props.placeholder}
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            listViewDisplayed='true'
            renderDescription={row => row.description}
            fetchDetails={true}

            onPress={this.props.onSelect}

            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyAiHoGb-PqaBAO_-V62R_LMDfXurlAVbjE',
              language: 'en' // language of the results
              //types: '(cities)' // default: 'geocode'
            }}

            // GooglePlacesSearchQuery={{
            //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            //   rankby: 'distance',
            //   types: 'food'
            // }}

            styles={{
              textInputContainer: {
                borderTopWidth: 0,
                borderBottomWidth: 0,
                backgroundColor: 'transparent'
              },
              textInput: {
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                height: 40,
                color: '#5d5d5d',
                fontSize: 18
              },
              listView: this.props.listView,
              predefinedPlacesDescription: {
                color: '#1faadb'
              },
            }}
            currentLocation={false}
        />);
  }
}