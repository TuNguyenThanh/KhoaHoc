import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  PixelRatio,
  Dimensions
} from 'react-native';
var {height, width} = Dimensions.get('window');
var HTMLView = require('react-native-htmlview');

//Custom Size Decive
if (PixelRatio.get() === 2){//4, 4S, 5, 5c, 5s, 6, 320 dpi
  size15 = 15;
  size18 = 18;
  size21 = 21;
  size23 = 23;
}else if (PixelRatio.get() === 3){// 6 plus, 480 dpi
  size15 = 18;
  size18 = 21;
  size21 = 23;
  size23 = 25;
}else if (PixelRatio.get() === 3.5){//Nexus 6
  size15 = 15;
  size18 = 18;
  size21 = 21;
  size23 = 23;
}

if (width >= 768){
  size15 = 25;
  size18 = 31;
  size21 = 33;
  size23 = 25;
}
/*
<ScrollView >
  <View style={styles.bg}>
    <Text style={styles.h1}>
      {this.props.title}
    </Text>
    <Text style={styles.text}>
      {this.props.info}
    </Text>
  </View>
</ScrollView>
*/
export default class Info extends Component {
  render() {
    var htmlContent = this.props.info;//'<p><a href="http://jsdf.co">&hearts; nice job!</a></p>'
    return (
      <ScrollView >
        <View style={styles.bg}>
          <Text style={styles.h1}>
            {this.props.title}
          </Text>
          <HTMLView
            value={htmlContent}
            stylesheet={styles}
          />
        </View>
      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({
  bg:{
    backgroundColor:'#F5FCFF',
    marginLeft:8,
    marginRight:8
  },

  text:{
    marginTop:20,
    marginLeft:8,
    marginRight:8,
    fontSize:size15,
    textAlign:'justify'
  },

  h1:{
    paddingLeft:8,
    fontSize:size18,
    color:'#f69d35',
    fontWeight:'bold',
    paddingTop:20
  },
});
