/**
 * KhoaHoc React Native App
 * Create by ThanhTu
 * @Copyright 2016
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  Navigator,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  Alert
} from 'react-native';
var {width, height} = Dimensions.get('window');

import Main         from './Components/Main.js';
import Main2        from './Components/Main2.js';
import Menu         from './Components/Menu.js';
import FullList     from './Components/FullList.js';
import Detail       from './Components/Detail.js';
import Register     from './Components/Register.js';
import Company      from './Components/Company.js';
import Tabbar       from 'react-native-tabbar';
import SideMenu     from 'react-native-side-menu';
import Search       from './Components/Search.js';
import ListRegister from './Components/ListRegister.js';
import LoginFB      from './Components/LoginFB.js';
import Comment      from './Components/Comment.js';
import TabNavigator from 'react-native-tab-navigator';
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedTab: 'home',
      user: null
    }
  }

  _toggle(){
    this.setState({
      isOpen : !this.state.isOpen,
    })
  }

  _updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  _renderScene(route, navigator){
    switch (route.name) {
      case "main":return (
        <SideMenu
          isOpen={this.state.isOpen}
          onChange={(isOpen) => this._updateMenuState(isOpen)}
          menu={
            <Menu navigator={navigator}
              menuItemTitleClick={(idChuDeKH)=> {
                navigator.push({name:"list", passProps:{
                  idChuDeKH: idChuDeKH
                }})
              }}

              menuItemAllClick={(allKhoahoc)=>{
                navigator.push({name:"mainItemClick", passProps:{
                  allKhoahoc: allKhoahoc
                }})
              }}

              mangMenu={"aaaaaa"}
            />
          }
        >
          <Main
            seeAll={(idChuDeKH)=>{navigator.push({name:"list", passProps:{
              idChuDeKH: idChuDeKH
            }})}}

            itemClick={(data)=>{navigator.push({name:"detail", passProps:{
              data: data
            }})}}

            itemTopClick={(idNganhHot)=> {navigator.push({name:"list", passProps:{
              idChuDeKH: idNganhHot
            }})}}

            menuClick={()=> {this._toggle()}}
          />
        </SideMenu>
      );break

      case "mainItemClick":return (
        <Main2
          allKhoahoc={route.passProps.allKhoahoc}
          back={()=>{navigator.pop()}}
          seeAll={(idChuDeKH)=> {navigator.push({name:"list", passProps:{
            idChuDeKH: idChuDeKH
          }})}}
          itemClick={(data) => {navigator.push({name:"detail", passProps:{
            data: data
          }})}}
        />
      );break

      case "list":return (
        <FullList
          back={()=>{navigator.pop()}}
          itemClick={(data)=>{navigator.push({name:"detail", passProps:{
            data: data
          }})}}
          idChuDeKH={route.passProps.idChuDeKH}
        />
      );break

      case "detail":return (
        <Detail
          back={()=>{navigator.pop()}}
          registerClick={(idKH)=>navigator.push({name:"register",passProps:{
            idKH: idKH
          }})}
          danhgiaClick={(idKH)=> navigator.push({name:"comment",passProps:{
            idKH: idKH
          }})}
          data={route.passProps.data}
        />
      );break

      case "register":return (
        <Register
          back={()=>{navigator.pop()}}
          idKH={route.passProps.idKH}
        />
      );break

      case "company":return (
        <Company />
      );break

      case "comment":return (
        <Comment
          back={()=>{navigator.pop()}}
          idKH={route.passProps.idKH}
        />
      );break

      default: return (
        <SideMenu
          isOpen={this.state.isOpen}
          onChange={(isOpen) => this._updateMenuState(isOpen)}
          menu={
            <Menu navigator={navigator}
              menuItemTitleClick={(idChuDeKH)=> {
                navigator.push({name:"list", passProps:{
                  idChuDeKH: idChuDeKH
                }})
              }}
              menuItemAllClick={(allKhoahoc)=>{
                navigator.push({name:"mainItemClick", passProps:{
                  allKhoahoc: allKhoahoc
                }})
              }}
            />
          }
        >
          <Main
            seeAll={(idChuDeKH)=>{navigator.push({name:"list", passProps:{
              idChuDeKH: idChuDeKH
            }})}}

            itemClick={(data)=>{navigator.push({name:"detail", passProps:{
              data: data
            }})}}

            itemTopClick={(idNganhHot)=> {navigator.push({name:"list", passProps:{
              idChuDeKH: idNganhHot
            }})}}

            menuClick={()=> {this._toggle()}}
          />
        </SideMenu>
      );
    }
  }

  _renderScene2(route, navigator){
    switch (route.name) {
      case "search":return (
        <Search
          itemLvClick={(data)=>{navigator.push({name:"detail", passProps:{
            data: data
          }})}}
        />
      );break

      case "detail":return (
        <Detail
          back={()=>{navigator.pop()}}
          registerClick={(idKH)=>navigator.push({name:"register",passProps:{
            idKH: idKH
          }})}

          danhgiaClick={(idKH)=> navigator.push({name:"comment",passProps:{
            idKH: idKH
          }})}
          data={route.passProps.data}
        />
      );break

      case "register":return (
        <Register
          back={()=>{navigator.pop()}}
          idKH={route.passProps.idKH}
        />
      );break

      case "comment":return (
        <Comment
          back={()=>{navigator.pop()}}
          idKH={route.passProps.idKH}
        />
      );break

      default: return(
        <Search
          itemLvClick={(data)=>{navigator.push({name:"detail", passProps:{
            data: data
          }})}}
        />
      );
    }
  }

  _renderScene3(route, navigator){
    console.log(this.state.user);
    switch (route.name) {
      case "listregister":return (
        <ListRegister
          user={this.state.user}
          itemLvClick={(data)=>{navigator.push({name:"detail", passProps:{
            data: data
          }})}}
        />
      );break

      case "detail":return (
        <Detail
          back={()=>{navigator.pop()}}
          registerClick={(idKH)=>navigator.push({name:"register",passProps:{
            idKH: idKH
          }})}
          danhgiaClick={(idKH)=> navigator.push({name:"comment",passProps:{
            idKH: idKH
          }})}
          data={route.passProps.data}
        />
      );break

      case "register":return (
        <Register
          back={()=>{navigator.pop()}}
          idKH={route.passProps.idKH}
        />
      );break

      case "comment":return (
        <Comment
          back={()=>{navigator.pop()}}
          idKH={route.passProps.idKH}
        />
      );break

      default: return(
        <ListRegister
          itemLvClick={(data)=>{navigator.push({name:"detail", passProps:{
            data: data
          }})}}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator tabBarStyle={{backgroundColor:'#354e9a', marginTop:-50}}>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="Trang chủ"
            titleStyle={{color:'white'}}
            selectedTitleStyle={{color:'white'}}
            renderIcon={() => <Image
               style={styles.itemMenu} source={require('./Public/Images/home.png')}/>}
            renderSelectedIcon={() => <Image
               style={styles.itemMenu2} source={require('./Public/Images/home.png')}/>}
            onPress={() => this.setState({ selectedTab: 'home' })}>
            <Navigator
              initialRoute={{name:"main"}}
              renderScene={(this._renderScene.bind(this))}
            />
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'search'}
            title="Tìm kiếm"
            titleStyle={{color:'white'}}
            selectedTitleStyle={{color:'white'}}
            renderIcon={() => <Image
               style={styles.itemMenu} source={require('./Public/Images/search.png')}/>}
            renderSelectedIcon={() => <Image
               style={styles.itemMenu2} source={require('./Public/Images/search.png')}/>}
            onPress={() => this.setState({ selectedTab: 'search' })}>
            <Navigator
              initialRoute={{name:"search"}}
              renderScene={(this._renderScene2.bind(this))}
            />
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'listRegister'}
            title="Khoá học"
            titleStyle={{color:'white'}}
            selectedTitleStyle={{color:'white'}}
            renderIcon={() => <Image
               style={styles.itemMenu} source={require('./Public/Images/list.png')}/>}
            renderSelectedIcon={() => <Image
               style={styles.itemMenu2} source={require('./Public/Images/list.png')}/>}
            onPress={() => {this.setState({ selectedTab: 'listRegister' });
              this._checkLoginFB();
            } }>

            <Navigator
              initialRoute={{name:"listregister"}}
              renderScene={(this._renderScene3.bind(this))}
            />
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'loginFB'}
            title="Đăng nhập"
            titleStyle={{color:'white'}}
            selectedTitleStyle={{color:'white'}}
            renderIcon={() => <Image
               style={styles.itemMenu} source={require('./Public/Images/user.png')}/>}
            renderSelectedIcon={() => <Image
               style={styles.itemMenu2} source={require('./Public/Images/user.png')}/>}
            onPress={() => this.setState({ selectedTab: 'loginFB' })}>

            <View style={styles.loginFB}>
              <LoginFB />
            </View>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }

  _checkLoginFB(){

    var _this = this;
    FBLoginManager.getCredentials(function(error, data){
      if (!error) {
        var id = data.credentials.userId;
        var token = data.credentials.token;
        // Alert.alert(
        //   'Alert Title',
        //   'ko error',
        //   [
        //     {text: 'OK', onPress: () => console.log('OK Pressed')},
        //   ]
        // )

        fetch("https://graph.facebook.com/v2.3/"+id+"?fields=name,email&access_token="+token)
        .then((response)=> response.json())
        .then((responseJson) => {
          console.log(responseJson);
          _this.setState({
            user : responseJson
          })
        })
        .catch((error)=> {
          console.error(error);
        });

      }else{
        _this.setState({ user : null})
        // Alert.alert(
        //   'Alert Title',
        //   'error',
        //   [
        //     {text: 'OK', onPress: () => console.log('OK Pressed')},
        //   ]
        // )
      }
    });
  }

}

const styles = StyleSheet.create({
  itemMenu:{
    width: 20,
    height: 20,
    tintColor:'white'
  },

  itemMenu2:{
    width: 20,
    height: 20,
    tintColor:'#581845'
  },

  container: {
    flex:1,
    backgroundColor: '#354e9a'
  },

  content:{
    width: width,
    height: height - ((Platform.OS === 'ios') ? 50 : 70),
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  menu:{
    width:30,
    height:30,
    tintColor:'white'
  },

  bg:{
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'blue',
    marginBottom: (Platform.OS === 'ios') ? 0 : 20,
  },

  loginFB:{
    backgroundColor:'white',
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  }

})
