
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  Dimensions
} from 'react-native';
var {width, height} = Dimensions.get('window');
//Custom Size Decive
if (PixelRatio.get() === 2){//4, 4S, 5, 5c, 5s, 6, 320 dpi
  size15 = 15;
}else if (PixelRatio.get() === 3){// 6 plus, 480 dpi
  size15 = 18;
}else if (PixelRatio.get() === 3.5){//Nexus 6
  size15 = 21;
}

if (width >= 768){
  size15 = 23;
}

export default class InfoFB extends Component {
  constructor(props){
    super(props);
    this.state = {
      info: null,
    }
  }

  componentWillMount(){
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.3/${user.userId}?fields=name,email&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          info : {
            name : responseData.name,
            email: responseData.email,
          },
        });
      })
      .done();
  }

  render(){
    var info = this.state.info;
    return (
      <View>
      {/*
        <Text style={styles.name}>{ info && this.props.user.userId }</Text>
      */}
        <Text style={styles.name}>{ info && info.name }</Text>
        <Text style={styles.name}>{ info && info.email }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name:{
    marginTop:10,
    textAlign:'center',
    color:'#354e9a',
    fontSize:size15,
    fontWeight:'bold'
  }
});
