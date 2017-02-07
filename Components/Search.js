import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ListView,
  Platform,
  Alert,
  PixelRatio
} from 'react-native';
var {width, height} = Dimensions.get('window');
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';

//Custom Size Decive
if (PixelRatio.get() === 2){//4, 4S, 5, 5c, 5s, 6, 320 dpi
  marTop = 4;
  size15 = 15;
  size18 = 18;
  size21 = 21;
  size23 = 23;
}else if (PixelRatio.get() === 3){// 6 plus, 480 dpi
  marTop = 4,
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

export default class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      txtKeySearch: '',
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}),
      dataSourceKey: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}),
      page: 1,
      choose: 'tatca'
    }
  }

  _search(key){
    if (this.state.txtKeySearch != ''){
      fetch("http://khoahoc.nhodalat.com/searchbyname?name="+this.state.txtKeySearch)
      .then((response) => response.json())
      .then((responseJson) => {
        mangFilter = responseJson;
        console.log(mangFilter);
        if (mangFilter.length != 0){
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(mangFilter)
          });
        }else{
          if (this.state.choose == 'tatca'){
            Alert.alert(
              'Thông báo',
              "Không tìm thấy khoá học " + key,
              [
                {text: 'Đồng ý', onPress: () => console.log('OK Pressed')},
              ]
            )
          }else{
            Alert.alert(
              'Thông báo',
              "Không tìm thấy khoá học ở " + key,
              [
                {text: 'Đồng ý', onPress: () => console.log('OK Pressed')},
              ]
            )
          }

          //Khong co khoa hoc tim kiem
          // this.setState({
          //   dataSource: this.state.dataSource.cloneWithRows(mang)
          // });
        }
      })
      .catch((error)=> {
        console.error(error);
      });
    }
  }

  _onTextSearchChange(keySearch){
    console.log(keySearch);
    if (keySearch == ''){
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(mang)
      });
    }
  }

  _choose(){
    Alert.alert(
      'Tuỳ chọn tìm kiếm',
      null,
      [
        {text: 'Tất cả', onPress: () => {this.setState({choose : 'tatca',txtKeySearch:''})}},
        {text: 'Hồ Chí Minh', onPress: () => {this.setState({choose : 'HCM', txtKeySearch:'Hồ Chí Minh'})}},
        {text: 'Hà Nội', onPress: () =>  {this.setState({choose : 'HN',
        txtKeySearch:'Hà Nội'})}},
        {text: 'Hải Phòng', onPress: () =>  {this.setState({choose : 'HP',
        txtKeySearch:'Hải Phòng'})}},
        {text: 'Đà Nẵng', onPress: () =>  {this.setState({choose : 'DN',
        txtKeySearch:'Đà Nẵng'})}},
        {text: 'Cần Thơ', onPress: () =>  {this.setState({choose : 'CT',
        txtKeySearch:'Cần Thơ'})}},
      ]
    )
  }

  render() {
    switch (this.state.choose) {
      case 'tatca':
        keyChoose = 'Tất cả';
        break;
      case 'HCM':
        keyChoose = 'Hồ Chí Minh';
        break;
      case 'HN':
        keyChoose = 'Hà Nội';
        break;
      case 'HP':
        keyChoose = 'Hải Phòng';
        break;
      case 'DN':
        keyChoose = 'Đà Nẵng';
        break;
      case 'CT':
        keyChoose = 'Cần Thơ';
        break;
      default:
        keyChoose = 'Tất cả';
    }

    return (
      <View style={styles.bg}>
        <View style={[styles.nav,{flexDirection:'row'}]}>
          <View style={{flex:5/10}}>
            <Text style={styles.title}>Tìm kiếm</Text>
          </View>
          <View style={{flex:5/10}}>
            <TouchableOpacity style={styles.btnList}
              onPress={() => {this._choose()}}
            >
              <Text style={{color:'white', fontSize:18}}>{keyChoose}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.search}>
          <Fumi
            style={styles.input}
            label={'Nhập từ khoá...'}
            labelStyle={{ color: 'gray' }}
            inputStyle={{ color: 'gray' }}
            iconClass={FontAwesomeIcon}
            iconName={'search'}
            iconColor={'gray'}
            onChangeText={(txtKeySearch) => {this.setState({txtKeySearch}); this._onTextSearchChange(txtKeySearch);    } }
            value={this.state.txtKeySearch}
          />

          <TouchableOpacity style={styles.btnSearch}
            onPress={this._search.bind(this, this.state.txtKeySearch)}
          >
            <Text style={styles.textSearch}>Tìm kiếm</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>

        <ListView style={styles.lst}
          dataSource={this.state.dataSource}
          renderRow={this.createRow.bind(this)}
          onEndReached={this._onEndReached.bind(this)}
          onEndReachedThreshold ={10}
        />
      </View>
    );
  }

  _onEndReached(){
    if (this.state.txtKeySearch == ''){
      fetch("http://khoahoc.nhodalat.com/search?page="+ (this.state.page + 1))
      .then((response)=> response.json())
      .then((responseJson) => {
        if (responseJson.length != 0){
          mang = mang.concat(responseJson);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(mang),
            page: this.state.page + 1
          });
        }
      })
      .catch((error)=> {
        console.error(error);
      });
    }
  }

  createRow(item){
    var tenKhoaHoc;
    if(item.title.length > 28){
      tenKhoaHoc = item.title.substr(0, 28)+"...";
    }else{
      tenKhoaHoc = item.title;
    }

    if(item.hoconline === 1){
      hoconline = "Học online";
    }else{
      hoconline = "Học tại trung tâm";
    }

    return(
      <TouchableOpacity style={styles.row}
        onPress={this.props.itemLvClick.bind(this, item)}
      >
        {/*Image KhoaHoc*/}
        <Image style={styles.img}
          source={{uri: item.image}}
        >
          <Image
            style={styles.imgSales}
            source={require('../Public/Images/sale2.png')}
          >
            <Text style={styles.textSale}>-{item.promotion}%</Text>
          </Image>
        </Image>


        {/*Detail KhoaHoc*/}
        <View style={styles.detail}>
          <Text style={styles.tenKhoaHoc}>
            {tenKhoaHoc}
          </Text>
          <View style={styles.viewDetail}>
            <View style={styles.left}>
              <Image
                style={styles.detailKH}
                source={require('../Public/Images/Marker.png')}
              />
              <Image
                style={styles.detailKH}
                source={require('../Public/Images/Calendar.png')}
              />
              <Image
                style={styles.detailKH}
                source={require('../Public/Images/Learn.png')}
              />
            </View>
            <View style={styles.right}>
              <Text style={styles.textDetailKH}>{item.diadiemhoc}</Text>
              <Text style={styles.textDetailKH}>{item.ngaykhaigiang.substr(0, 10)}</Text>
              <Text style={styles.textDetailKH}>{hoconline}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  componentDidMount(){
    fetch("http://khoahoc.nhodalat.com/search?page="+this.state.page)
    .then((response) => response.json())
    .then((responseJson) => {
      mang = responseJson;
      console.log(mang);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(mang)
      });
    })
    .catch((error)=> {
      console.error(error);
    });
  }
}

const styles = StyleSheet.create({
  bg:{
    backgroundColor:'#F5FCFF',
    flex:1
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
    marginLeft:20,
    marginTop:20,
    fontSize:size21,
    color:'white',
  },

  search:{
    height:60,
    width: width,
    flexDirection:'row',
    zIndex:1
  },

  input: {
    flex:3/4,
  },

  btnSearch:{
    flex:1/4,
    height:40,
    marginTop:10,
    marginRight:8,
    backgroundColor:'#354e9a',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:2
  },

  textSearch:{
    fontSize:size15,
    color:'white',
  },

  line:{
    width: width,
    height:1,
    backgroundColor:'#354e9a',
  },

  lst:{
    zIndex:1,
    width: width,
    height: ((height - 64 ) - 60 - 2 ) - ((Platform.OS === 'ios') ? 50 : 70),
  },

  row:{
    width: width - 16,
    height: (height / 5) + 8,
    marginTop:8,
    marginRight:8,
    marginLeft:8,
    flexDirection:'row',
    borderColor:'gray',
    borderWidth:1,
    zIndex:1,
  },

  img:{
    flex:1/3,
    borderColor:'gray',
    borderRightWidth:1,
  },

  detail:{
    flex:2/3,
    backgroundColor:'white',
    opacity:1,
  },

  tenKhoaHoc:{
    color:'gray',
    fontSize:size18,
    fontWeight:'bold',
    marginLeft:8,
    marginRight:8,
    marginTop:8
  },

  trungTam:{
    color:'#F5FCFF',
    fontSize:size18,
    fontWeight:'bold',
    marginLeft:8,
    marginRight:8,
    marginTop:8
  },

  moTa:{
    color:'#F5FCFF',
    fontSize:15,
    fontWeight:'bold',
    marginLeft:8,
    marginRight:8,
    marginTop:8
  },

  viewDetail:{
    flex:2/3,
    flexDirection:'row',
    backgroundColor:'white',
  },

  left:{
    flex:1/7,
  },

  right:{
    flex:6/7,
  },

  detailKH:{
    width:size21,
    height:size21,
    marginLeft:5,
    tintColor:'gray',
    marginTop:marTop - 2
  },

  textDetailKH:{
    color:'gray',
    fontSize:size15,
    marginLeft:5,
    marginTop:marTop - ((Platform.OS === 'ios') ? 0 : 3)
  },

  imgSales:{
    width: width/5 ,
    height:((height / 5) + 8)/4,
    marginLeft:0,
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

  btnList:{
    width:width/2-8,
    height: 40,
    alignItems:'center',
    justifyContent:'center',
    marginTop:15,
    borderColor:'white',
    borderWidth:1
  }

})
