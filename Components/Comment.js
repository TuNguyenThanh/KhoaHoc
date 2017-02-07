import React , { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
var {width, height} = Dimensions.get('window');
import  Rating from 'react-native-easy-rating'
import { GiftedChat } from 'react-native-gifted-chat';
import dismissKeyboard from 'dismissKeyboard';
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');

export default class Comment extends Component{
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      star : 0,
      user: null,
      photo: null,
      idLoginFB: null,
      page : 1
    };

    this.onSend = this.onSend.bind(this);

    var _this = this;
    FBLoginManager.getCredentials(function(error, data){
      if (!error) {
        var id = data.credentials.userId;
        var token = data.credentials.token;

        fetch("https://graph.facebook.com/v2.3/"+id+"?fields=name,email&access_token="+token)
        .then((response)=> response.json())
        .then((responseJson) => {
          console.log(responseJson);
          _this.setState({
            user : responseJson,
            idLoginFB: id
          })
        })
        .catch((error)=> {
          console.error(error);
        });

        //fech link avatar
        fetch("https://graph.facebook.com/v2.3/"+id+"/picture?width=200&redirect=false&access_token="+token)
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData.data.url);
          _this.setState({
            photo:{
              url : responseData.data.url,
            }
          });
        })
        .done();
      }else{
        _this.setState({ user : null})
      }
    });
  }

  componentWillMount(){
    this.setState({
      star : 3,
    });
  }

  render(){
    return (
      <View style={styles.bg}>
        {/*Navigation*/}
        <View style={styles.nav}>
          <TouchableOpacity onPress={this.props.back}>
            <Image style={styles.menu}
              source={require('../Public/Images/back.png')}
            />
          </TouchableOpacity>
          <View >
            <Text style={styles.title}>Đánh giá</Text>
          </View>
        </View>

        {/*Danh gia*/}
        <TouchableOpacity onPress={()=> dismissKeyboard()}>
          <View style={styles.viewDanhGia}>
            <Text style={styles.titleKH}>{this.props.idKH[1]}</Text>
          </View>

          <View style={{width: width, height: 40, flexDirection:'row'}}>
            <View style={{flex:1.2/4,justifyContent:'center', marginLeft:10}}>
              <Text style={styles.danhgia}>Đánh giá: </Text>
            </View>

            <View style={{flex:1.6/4, justifyContent:'center'}}>
              <Rating
                rating={this.state.star}
                max={5}
                iconWidth={24}
                iconHeight={24}
                iconSelected={require('../Public/Images/icon_star_selected.png')}
                iconUnselected={require('../Public/Images/icon_star_unselected.png')}
                onRate={(rating) =>
                  {
                    this.setState({star: rating});
                    Alert.alert(
                      'Đánh giá',
                      'Bạn đã đánh giá khoá học '+ rating + ' sao',
                      [
                        {text: 'Đồng ý', onPress: () => console.log('OK Pressed')},
                      ]
                    )
                    // if (this.state.user === null){
                    //   Alert.alert(
                    //     'Thông báo',
                    //     'Bạn cần đăng nhập để đánh giá Khoá học',
                    //     [
                    //       {text: 'Đồng ý', onPress: () => console.log('OK Pressed')},
                    //     ]
                    //   )
                    // }else{
                    //   this.setState({star: rating});
                    //   Alert.alert(
                    //     'Đánh giá',
                    //     'Bạn đã đánh giá khoá học '+ rating + ' sao',
                    //     [
                    //       {text: 'Đồng ý', onPress: () => console.log('OK Pressed')},
                    //     ]
                    //   )
                    // }
                  }
                }
              />
            </View>
            <View style={{flex:1.2/4, justifyContent:'center'}}>
              <Text style={styles.rankPoint}>3.5</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/*Comment View*/}
        <View style={{flex:1}}>
          {
            this.state.user !== null &&
            <GiftedChat
              messages={this.state.messages}
              onSend={this.onSend}
              //loadEarlier={true}
              //onLoadEarlier={this.load(this.props.idKH[0])}
              user={{
                _id: this.state.idLoginFB,
              }}
            />
          }
          {
            this.state.user === null &&
            <View style={styles.viewTB}>
              <Text style={styles.text}>Vui lòng Đăng nhập để bình luận...</Text>
            </View>
          }
        </View>
      </View>
    );
  }

  // load(id){
  //   console.log("loadmore");
  //   fetch("http://khoahoc.nhodalat.com/xembinhluan?id_daotao="+id+"&page=2")
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     var arrMessages = responseJson;
  //
  //     var arrload = [];
  //     for (i = 0; i < arrMessages.length; i++) {
  //       if (arrMessages[i].id_fb == null){
  //         idUser = arrMessages[i].id_user;
  //       }else{
  //         idUser = arrMessages[i].id_fb;
  //       }
  //       let mess = {
  //         _id: i,
  //         text: arrMessages[i].noidung,
  //         user: {
  //           _id: idUser,
  //           avatar: arrMessages[i].image,
  //         }
  //       };
  //       arrload.push(mess);
  //     }
  //
  //     //arr = arr.concat(arrload);
  //     this.setState({
  //       messages: arrload
  //     });
  //   })
  //   .catch((error)=> {
  //     console.error(error);
  //   });
  // }


  //chua send ngay gio tao messages
  //Con thieu get tat ca messages ve
  onSend(messages = []) {
    console.log(messages[0].user._id);

    //insert db:
    // console.log(messages[0].text);
    // console.log(messages[0].createdAt);
    console.log("------------");
    console.log(this.state.idLoginFB);
    //console.log(this.state.user.name);
    // console.log(this.state.photo.url);

    fetch('http://khoahoc.nhodalat.com/binhluan', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8; application/json',
      },
      body: JSON.stringify({
        noidung : messages[0].text,
        id_fb : '673591389475632',//messages[0].user._id,
        id_daotao : this.props.idKH[0],
      })
    })
    .then((response) => {
      console.log(response);
      console.log(JSON.parse(JSON.stringify(response))._bodyText);
      get = JSON.parse(JSON.stringify(response))._bodyText;
      if (get == 'success'){
        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, messages),
          };
        });
      }else{
        console.log("error chat");
      }
    })
    .then((responseJson) => {
      //console.log(responseJson);
    })
    .catch((error) => {
      console.error(error);
    })
  }



  componentDidMount() {
    fetch("http://khoahoc.nhodalat.com/xembinhluan?id_daotao="+this.props.idKH[0]+"&page=" + this.state.page)
    .then((response) => response.json())
    .then((responseJson) => {
      arrMessages = responseJson;

       console.log(arrMessages);
      //
      // console.log(arrMessages[0].id);
      // console.log(arrMessages[0].noidung);
      // console.log(arrMessages[0].id_fb);
      // console.log(arrMessages[0].id_user);
      // console.log(arrMessages[0].image);

      arr = [];
      for (i = 0; i < arrMessages.length; i++) {
        if (arrMessages[i].id_fb == null){
          idUser = arrMessages[i].id_user;
        }else{
          idUser = arrMessages[i].id_fb;
        }

        let mess = {
          _id: i,//arrMessages[i].id,
          text: arrMessages[i].noidung,
          //createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: idUser,
            //name: 'ThanhTu',
            avatar: arrMessages[i].image,
          }
        };
        arr.push(mess);
      }

      console.log(arr);
      this.setState({
        messages: arr
      });


    })
    .catch((error)=> {
      console.error(error);
    });
  }

}

const styles = StyleSheet.create({
  bg:{
    flex:1,
    backgroundColor:'white'
  },

  nav:{
    width: width,
    height: 64,
    backgroundColor: '#354e9a',
    flexDirection: 'row'
  },

  menu:{
    width:size23,
    height:size23,
    marginTop:20,
    marginLeft:10
  },

  title:{
    marginLeft: (width / 2) - (23 + 10 + 50),
    marginTop:20,
    width:100,
    textAlign:'center',
    fontSize:size21,
    color:'white',
  },

  titleKH:{
    width:width,
    height:60,
    fontSize:23,
    textAlign:'center',
    color:'gray',
  },

  viewDanhGia:{
    marginTop:10,
    width: width,
    height: 50,
  },

  danhgia:{
    color: 'gray',
    fontSize: 18,
  },

  text:{
    textAlign:'center',
    fontSize:15
  },

  viewTB:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },

  rankPoint:{
    color:'#354e9a',
    textAlign:'left',
    fontSize:18,
  }

})
