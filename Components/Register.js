import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  PixelRatio,
  ScrollView
} from 'react-native';
var {height, width} = Dimensions.get('window');
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');

if (PixelRatio.get() === 2){//4, 4S, 5, 5c, 5s, 6, 320 dpi
  size21 = 21;
  size23 = 23;
}else if (PixelRatio.get() === 3){// 6 plus, 480 dpi
  size21 = 23;
  size23 = 25;
}else if (PixelRatio.get() === 3.5){//Nexus 6
  size21 = 21;
  size23 = 23;
}

if (width >= 768){
  size21 = 33;
  size23 = 25;
}

/*********
 id khoa hoc : {this.props.idKH[0]}
*/

export default class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      txtName: '',
      txtPhone:'',
      txtEmail:'',
      user : null,
    }

    var _this = this;
    FBLoginManager.getCredentials(function(error, data){
      if (!error) {
        id = data.credentials.userId;
        var token = data.credentials.token;
        console.log(data.credentials);

        fetch("https://graph.facebook.com/v2.3/"+id+"?fields=name,email&access_token="+token)
        .then((response)=> response.json())
        .then((responseJson) => {
          console.log(responseJson);
          _this.setState({
            user : responseJson,
            txtName: responseJson.name,
            txtEmail: responseJson.email
          })

        })
        .catch((error)=> {
          console.error(error);
        });

      }else{
        _this.setState({ user : null})
      }
    });
  }

  _validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  _checkInput(){
    if (this.state.txtName == ''){
      Alert.alert(
        'Thông báo',
        'Vui lòng nhập Họ & tên',
        [
          {text: 'Đồng ý', onPress: () => console.log('OK Pressed')},
        ]
      )
      return false;
    }else{
      if (this.state.txtPhone == ''){
        Alert.alert(
          'Thông báo',
          'Vui lòng nhập số điện thoại',
          [
            {text: 'Đồng ý', onPress: () => console.log('OK Pressed')},
          ]
        )
        return false;
      }else{
        if(this.state.txtEmail == ''){
          Alert.alert(
            'Thông báo',
            'Vui lòng nhập địa chỉ email',
            [
              {text: 'Đồng ý', onPress: () => console.log('OK Pressed')},
            ]
          )
          return false;
        }else{
          if (!this._validateEmail(this.state.txtEmail)) {
            // not a valid email
            Alert.alert(
              'Thông báo',
              'Địa chỉ email không đúng',
              [
                {text: 'Đồng ý', onPress: () => console.log('OK Pressed')},
              ]
            )
            return false;
          } else {
            // valid email
            return true;
          }
        }
      }
    }
  }

  _register(){
    if (this._checkInput() == true){
      //Success

      //Check profile fb login
      if (this.state.user != null){
        fetch('http://khoahoc.nhodalat.com/dangkimoi', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            daotao: this.props.idKH[0],
            name: this.state.txtName,
            phone: this.state.txtPhone,
            email: this.state.txtEmail,
            fb: id,
          })
        })
        .then((response) =>
          {
          //{console.log(JSON.parse(JSON.stringify(response))._bodyText);
            get = JSON.parse(JSON.stringify(response))._bodyText;
            if (get == 'thành công'){
              Alert.alert(
                'Đăng ký thành công',
                this.state.txtName + ", bạn đã đăng ký khoá học " + this.props.idKH[1] + " thành công!" ,
                [
                  {
                    text: 'Đồng ý', onPress: this.props.back
                  },
                ]
              )
            }else{
              Alert.alert(
                'Đăng ký thất bại',
                "Yêu cầu đăng ký khoá học " + this.props.idKH[1] + " thất bại!" ,
                [
                  {
                    text: 'Đồng ý', onPress: () => {this.props.back}
                  },
                ]
              )
            }
          }
        )
        .then((responseJson) => {
          //console.log(responseJson);
        })
        .catch((error) => {
          console.error(error);
        })
      }
      else{
        // Alert.alert(
        //   'Vui long login FB',
        //   'hay login nhe',
        //   [
        //     {text: 'OK', onPress: () => console.log('OK Pressed')},
        //   ]
        // )
        fetch('http://khoahoc.nhodalat.com/dangkimoi', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            daotao: this.props.idKH[0],
            name: this.state.txtName,
            phone: this.state.txtPhone,
            email: this.state.txtEmail,
            fb: '',
          })
        })
        .then((response) =>
          {
          //{console.log(JSON.parse(JSON.stringify(response))._bodyText);
            get = JSON.parse(JSON.stringify(response))._bodyText;
            if (get == 'thành công'){
              Alert.alert(
                'Đăng ký thành công',
                this.state.txtName + ", bạn đã đăng ký khoá học " + this.props.idKH[1] + " thành công!" ,
                [
                  {
                    text: 'Đồng ý', onPress: () => {this.props.back}
                  },
                ]
              )
            }else{
              Alert.alert(
                'Đăng ký thất bại',
                "Yêu cầu đăng ký khoá học " + this.props.idKH[1] + " thất bại!" ,
                [
                  {
                    text: 'Đồng ý', onPress: () => {this.props.back}
                  },
                ]
              )
            }
          }
        )
        .then((responseJson) => {
          console.log(responseJson);

        })
        .catch((error) => {
          console.error(error);
        })
      }
      // Alert.alert(
      //   'Đăng ký thành công',
      //   this.state.txtName + ", bạn đã đăng ký khoá học " + this.props.idKH[1] + " thành công!" ,
      //   [
      //     {
      //       text: 'Đồng ý', onPress: this.props.back
      //     },
      //   ]
      // )
    }else{
      //error
    }
  }

  render() {
    if(this.props.idKH[1].length > 50){
      tenKH = this.props.idKH[1].substr(0, 50)+"...";
    }else{
      tenKH = this.props.idKH[1];
    }

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
            <Text style={styles.title}>Đăng ký</Text>
          </View>
        </View>

        {/*Container*/}

        <ScrollView>

        <View style={styles.container}>
          {/*Register From*/}
          <View style={styles.card}>
            <Text style={styles.title1}>
              {tenKH}
            </Text>

            <Fumi
              style={styles.input}
              label={'Họ và tên'}
              labelStyle={{ color: 'gray' }}
              inputStyle={{ color: 'gray' }}
              iconClass={FontAwesomeIcon}
              iconName={'user-circle'}
              iconColor={'gray'}
              onChangeText={(txtName) => this.setState({txtName})}
              value={this.state.txtName}
            />

            <Fumi
              style={styles.input}
              label={'Số điện thoại'}
              labelStyle={{ color: 'gray' }}
              inputStyle={{ color: 'gray' }}
              iconClass={FontAwesomeIcon}
              iconName={'phone'}
              iconColor={'gray'}
              onChangeText={(txtPhone) => this.setState({txtPhone})}
              value={this.state.txtPhone}
              keyboardType={'numeric'}
            />
            <Fumi
              style={styles.input}
              label={'Email'}
              labelStyle={{ color: 'gray' }}
              inputStyle={{ color: 'gray' }}
              iconClass={FontAwesomeIcon}
              iconName={'envelope'}
              iconColor={'gray'}
              onChangeText={(txtEmail) => this.setState({txtEmail})}
              value={this.state.txtEmail}
              keyboardType={'email-address'}
            />

            {/*Register*/}
            <TouchableOpacity style={styles.btnRegister}
              onPress={this._register.bind(this)}
            >
              <Text style={styles.textRegister}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>

        </ScrollView>
      </View>
    );
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

  container:{
    backgroundColor:'white',
    width: width ,
    height: height - 64
  },

  card: {
    padding: 16,
  },

  input: {
    borderWidth:1,
    borderColor:'gray',
    marginTop: 4,
    height:55
  },

  title1: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#354e9a',
    fontSize: size21,
    opacity: 0.8,
  },

  btnRegister:{
    borderWidth:1,
    borderColor:'gray',
    marginTop: 4,
    height:55,
    backgroundColor:'#354e9a',
    alignItems:'center',
    justifyContent:'center',
    borderColor:'gray',
    borderWidth:1,
  },

  textRegister:{
    color:'#F5FCFF',
    fontSize:size23
  },


});
