import React from 'react';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export default class PlacesAutoComplete extends React.Component {

  render() {
    return (
        <GooglePlacesAutocomplete
            placeholder='Enter Location'
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            listViewDisplayed='true'
            renderDescription={row => row.description}
            fetchDetails={true}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyAiHoGb-PqaBAO_-V62R_LMDfXurlAVbjE',
              language: 'en', // language of the results
              types: '(cities)' // default: 'geocode'
            }}

            // GooglePlacesSearchQuery={{
            //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            //   rankby: 'distance',
            //   types: 'food'
            // }}

            styles={{
              textInputContainer: {
                backgroundColor: 'rgba(0,0,0,0)',
                borderTopWidth: 0,
                borderBottomWidth:0
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                color: '#5d5d5d',
                fontSize: 16
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              },
            }}
            currentLocation={false}
        />);
  }
}