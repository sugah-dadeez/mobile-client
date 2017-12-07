/**
 * RestClient Component
 */


import {
  ToastAndroid
} from 'react-native';


const hostname = "10.0.2.2:8080";// 10.0.2.2	is an alias to the loopback interface, (i.e., 127.0.0.1)
//35.227.123.46

export default class RestClient {

  static session_token = null;

  static signup(credentials, callback) {

    fetch(`http://${hostname}/auth/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    }).then((response) => response.json()).then((responseJSON) => {

      callback();
    }).catch((error) => {
      ToastAndroid.show("Error! Bleep! Bloop! Blop!", ToastAndroid.CENTER)
    });
  }

  static login(credentials, callback) {

    fetch(`http://${hostname}/auth/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    }).then((response) => response.json()).then((responseJSON) => {

      if ("token" in responseJSON) {
        this.session_token = responseJSON.token
        ToastAndroid.show(`Yahtzee!`, ToastAndroid.CENTER)
        callback();
      } else {
        ToastAndroid.show(`hmmm... I don't think that's right.`, ToastAndroid.CENTER);
      }
    }).catch((error) => {
      ToastAndroid.show("Error! Bleep! Bloop! Blop!", ToastAndroid.CENTER)
    });

  }

  static call(method, resource, callback, data) {

    if (this.session_token == null) {
      ToastAndroid.show("You Are Not Signed In", ToastAndroid)
      return;
    }

    fetch(`http://${hostname}${resource}`, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `bearer ${this.session_token}`
      }, body: JSON.stringify(data)
    }).then(response => {


      return response.json()

    }).then(responseJSON => {

      if (callback) {
        callback(responseJSON);
      }
    }).catch((error) => {
      ToastAndroid.show(`Error! Bleep! Bloop! Blop:${method},${resource}`, ToastAndroid.CENTER)
    });

  }
}