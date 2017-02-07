import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  PixelRatio,
  ScrollView
} from 'react-native';
var {width, height} = Dimensions.get('window');
//Custom Size Decive
if (PixelRatio.get() === 2){//4, 4S, 5, 5c, 5s, 6, 320 dpi
  size18 = 18;
  size21 = 21;
}else if (PixelRatio.get() === 3){// 6 plus, 480 dpi
  size18 = 21;
  size21 = 23;
}else if (PixelRatio.get() === 3.5){//Nexus 6
  size18 = 18;
  size21 = 21;
}

if (width >= 768){
  size18 = 31;
  size21 = 33;
}

export default class Company extends Component {
  render() {
    return (
      <ScrollView >
        <View style={styles.bg}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image style={styles.headerLeft}
                source={{uri: this.props.info.logo}}
              />
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.text}>
                {this.props.info.name}
              </Text>
            </View>
          </View>

          <View style={styles.body}>
            <Text style={styles.textInfo}>
              {this.props.info.address}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bg:{
    flex:1
  },

  header:{
    flexDirection:'row',
    width:width,
    height:height / 5
  },

  headerLeft:{
    flex:1/3,
  },

  headerRight:{
    flex:2/3,
    alignItems:'center',
    justifyContent:'center'
  },

  text:{
    fontSize: size21,
    textAlign:'left',
    fontWeight:'bold',
    color:'#354e9a',
    marginLeft:8,
    marginRight:8
  },

  body:{
    backgroundColor:'#F5FCFF'
  },

  textInfo:{
    marginLeft:8,
    marginRight:8,
    marginTop:8,
    fontSize: size18,
    textAlign:'left',
  }
})
