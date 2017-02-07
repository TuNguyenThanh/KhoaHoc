
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert
} from 'react-native';

var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
import PhotoFB from '../Components/PhotoFB.js'
import InfoFB  from '../Components/InfoFB.js'

export default class LoginFB extends Component {
  constructor(props){
    super(props);
    this.state = {
      user : null,
    }
  }

  render() {
    var _this = this;
    return (
      <View >
        <View>
          { _this.state.user && <PhotoFB user={_this.state.user} /> }
        </View>
        <View style={{marginTop:10}}>
          { _this.state.user && <InfoFB user={_this.state.user} /> }
        </View>

        <View style={styles.loginContainer}>
          <FBLogin
            ref={(fbLogin) => { this.fbLogin = fbLogin }}
            permissions={["public_profile","email","user_friends"]}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
            onLogin={function(data){
              console.log("Logged in!");
              console.log(data.credentials);
              _this.setState({ user : data.credentials });
            }}
            onLogout={function(){
              console.log("Logged out.");
              userId = null;
              _this.setState({ user : null });
            }}
            onLoginFound={function(data){
              console.log("Existing login found.");
              console.log(data);
              _this.setState({ user : data.credentials });
            }}
            onLoginNotFound={function(){
              console.log("No user logged in.");
              _this.setState({ user : null });
            }}
            onError={function(data){
              console.log("ERROR");
              console.log(data);
            }}
            onCancel={function(){
              console.log("User cancelled.");
            }}
            onPermissionsMissing={function(data){
              console.log("Check permissions!");
              console.log(data);
            }}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  loginContainer: {
    height:40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10
  }
});
