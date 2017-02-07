import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

export default class PhotoFB extends Component {
  constructor(props){
    super(props);
    this.state = {
      photo: null,
    }
  }

  componentWillMount(){
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.3/${user.userId}/picture?width=200&redirect=false&access_token=${user.token}`;

    fetch(api)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        photo:{
          url   : responseData.data.url,
          height: responseData.data.height,
          width : responseData.data.width,
        },
      });
    })
    .done();
  }

  render(){
    if(this.state.photo == null) return this.renderLoading();
    var photo = this.state.photo;
    return (
      <View style={styles.avatar}>
        <Image style={photo && {
              height: photo.height,
              width: photo.width,
              borderRadius:photo.height / 2,
              borderColor:"gray",
              borderWidth:1
            }
          }
          source={{uri: photo && photo.url}}
        />
      </View>
    );
  }

  renderLoading(){
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
