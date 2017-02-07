import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
  PixelRatio
} from 'react-native';
var {width, height} = Dimensions.get('window');
import Info    from '../Components/Info.js';
import Company from '../Components/Company.js';
var ScrollableTabView = require('react-native-scrollable-tab-view');

if (PixelRatio.get() === 2){//4, 4S, 5, 5c, 5s, 6, 320 dpi
  marTop = 9;
  size12 = 12;
  size15 = 15;
  size18 = 18;
  size21 = 21;
  size23 = 23;
}else if (PixelRatio.get() === 3){// 6 plus, 480 dpi
  marTop = 11;
  size12 = 15;
  size15 = 18;
  size18 = 21;
  size21 = 23;
  size23 = 25;
}else if (PixelRatio.get() === 3.5){//Nexus 6
  size12 = 12;
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

export default class Detail extends Component {
  render() {
    return(
      <View style={styles.bg}>
        {/*Container*/}
        <View style={styles.container}>
          {/*Banner*/}
          <Image style={styles.banner}
            source={{uri: this.props.data.image}}
          >
            <View style={{flexDirection:'row', width:width, height:64}}>
              <View style={{flex:1/2}}>
                {/*Back Button*/}
                <TouchableOpacity onPress={this.props.back}>
                  <Image style={styles.imgBack}
                    source={require('../Public/Images/back.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{flex:1/2}}>
                {/*Image Sale*/}
                <Image
                  style={styles.imgSales}
                  source={require('../Public/Images/sale.png')}
                >
                  <Text style={styles.textSale}>{this.props.data.sale}</Text>
                </Image>
              </View>
            </View>

            {/*View Detail*/}
            <View style={{width: width,height: (height/3)*1.8/5, flexDirection:'row',marginTop: (height/3) - 64 - ((height/3)*1.8/5), borderColor:'gray', borderBottomWidth:1, borderTopWidth:1}}>
              {/*Detail Left*/}
              <View style={{flex:1/2, flexDirection:'row', backgroundColor:'white', opacity:0.9}}>
                <View style={{flex:1/5}}>
                  <Image
                    style={styles.imgDetailKH}
                    source={require('../Public/Images/Calendar.png')}
                  />
                  <Image
                    style={styles.imgDetailKH}
                    source={require('../Public/Images/Marker.png')}
                  />
                </View>
                <View style={{flex:4/5}}>
                  <Text style={styles.textDetailKH}>{this.props.data.ngay}</Text>
                  <Text style={styles.textDetailKH}>{this.props.data.diadiem}</Text>
                </View>
              </View>
              {/*Detail Right*/}
              <View style={{flex:1/2, flexDirection:'row', backgroundColor:'white', opacity:0.9}}>
                <View style={{flex:1/5}}>
                  <Image
                    style={styles.imgDetailKH}
                    source={require('../Public/Images/Learn.png')}
                  />
                  <Image
                    style={styles.imgDetailKH}
                    source={require('../Public/Images/coin.png')}
                  />
                </View>
                <View style={{flex:4/5}}>
                  <Text style={styles.textDetailKH}>{this.props.data.hinhthuc}</Text>
                  <Text style={styles.textDetailKH}>{"7.500.000 VND"} </Text>
                </View>
              </View>
            </View>

          </Image>

          {/*Body*/}
          <View style={styles.body}>
            <ScrollableTabView
              tabBarBackgroundColor={'#F5FCFF'}
              tabBarActiveTextColor={'#354e9a'}
              tabBarInactiveTextColor={'#354e9a'}
              tabBarUnderlineStyle={{backgroundColor:'#354e9a'}}
              tabBarTextStyle={{fontSize: size18}}
            >
              <Info tabLabel="Giới thiệu"
                info={this.props.data.gioiThieuKH}
                title={"Giới Thiệu Khóa Học"}
              />

              <Info tabLabel="Nội dung"
                info={this.props.data.noidungKH}
                title={"Nội dung Khóa Học"}
              />

              <Company tabLabel="Chúng tôi" info={this.props.data.TrungTam}/>
            </ScrollableTabView>
          </View>

          {/*Register*/}
          <View style={styles.viewRegister}>
            <View style={styles.btnView}>
              <TouchableOpacity style={styles.btnRegister}
                onPress={this.props.registerClick.bind(this,
                  [this.props.data.idKH,this.props.data.tenKH])
                }
              >
                <Text style={styles.textRegister}>Đăng ký</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.btnView}>
              <TouchableOpacity style={styles.btnRegister}
                onPress={this.props.danhgiaClick.bind(this,
                  [this.props.data.idKH,this.props.data.tenKH])}
              >
                <Text style={styles.textRegister}>Đánh giá</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg:{
    flex: 1,
    backgroundColor:'#F5FCFF'
  },

  imgBack:{
    width:size23,
    height:size23,
    marginTop:23,
    marginLeft:10
  },

  container:{
    width: width,
    height: height
  },

  banner:{
    width: width,
    height: height / 3,
  },

  body:{
    width: width,
    height: ((height - (height / 3)) - 20) - 50 - ((Platform.OS === 'ios') ? 25 : 50)
  },

  viewRegister:{
    width: width,
    height: 40,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
  },

  btnView:{
    flex:1/2,
    height:40,
    alignItems:'center',
    justifyContent:'center'
  },

  btnRegister:{
    backgroundColor:'#f69d35',
    width: width / 3,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 10,
    borderWidth:1,
    borderColor:'gray'
  },

  textRegister:{
    color:'white',
    fontSize:size23,
    fontWeight:'bold',
  },

  imgSales:{
    width: width/5 + 30,
    height:(height / 3) / 5,
    marginLeft:(width/2)/2 + 10,
    justifyContent:'center',
    alignItems:'center',
    tintColor:'#354e9a'
  },

  textSale:{
    width:(width - 60)/3,
    textAlign:'center',
    color:'white',
    fontSize:size18,
    fontWeight:'bold',
    backgroundColor:'transparent'
  },

  imgDetailKH:{
    width:size21,
    height:size21,
    marginLeft:5,
    marginTop: marTop - ((Platform.OS === 'ios') ? 3 : 0),
    tintColor:'#354e9a'
  },

  textDetailKH:{
    marginTop:marTop,
    fontWeight:'bold',
    color:'#354e9a',
    fontSize:size15
  },

});
