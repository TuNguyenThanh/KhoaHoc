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
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');

//Custom Size Decive
if (PixelRatio.get() === 2){//4, 4S, 5, 5c, 5s, 6, 320 dpi
  marTop = 4;
  size15 = 15;
  size18 = 18;
  size21 = 21;
  size23 = 23;
}else if (PixelRatio.get() === 3){// 6 plus, 480 dpi
  marTop = 4;
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

export default class ListRegister extends Component {
  constructor(props){
    super(props);
    this.state = {
      txtKeySearch: '',
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2})
    };
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
        <View style={styles.img}>
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
        </View>
        {/*Detail KhoaHoc*/}
        <View style={styles.detail}>
          <Text style={styles.tenKhoaHoc}>
            {tenKhoaHoc}
          </Text>
          <View style={styles.viewDetail}>
            <View style={styles.left}>
              <Image
                style={styles.iconDetailKH}
                source={require('../Public/Images/Marker.png')}
              />
              <Image
                style={styles.iconDetailKH}
                source={require('../Public/Images/Calendar.png')}
              />
              <Image
                style={styles.iconDetailKH}
                source={require('../Public/Images/Learn.png')}
              />
            </View>
            <View style={styles.right}>
              <Text style={styles.textDetailKH}>{item.diadiemhoc}</Text>
              <Text style={styles.textDetailKH}>{item.ngaykhaigiang.substr(0,10)}</Text>
              <Text style={styles.textDetailKH}>{hoconline}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }


  render() {
    return (
      <View style={styles.bg}>
        {/*Navigation*/}
        <View style={styles.nav}>
          <View>
            <Text style={styles.title}>Khoá học đã đăng ký</Text>
          </View>
        </View>
        <View >
          {
            this.props.user != null &&
            <ListView style={styles.lst}
              dataSource={this.state.dataSource}
              renderRow={this.createRow.bind(this)}
            />
          }
          {
            this.props.user == null &&
            <View style={[styles.lst, {alignItems:'center', justifyContent:'center'}]}>
              <Text style={{textAlign:'center'}}>Vui lòng Đăng nhập để xem các khoá học đã đăng ký</Text>
            </View>
          }
        </View>
      </View>
    );
  }
  //  onEndReached={this._onEndReached.bind(this)}
  //  onEndReachedThreshold ={10}

  _onEndReached(){
    // fetch("http://pttkht.esy.es/getLimit.php?page="+ (this.state.page + 1))
    // .then((response)=> response.json())
    // .then((responseJson) => {
    //   if (responseJson.length != 0){
    //     mang = mang.concat(responseJson);
    //     console.log({mang});
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(mang),
    //       page: this.state.page + 1
    //     });
    //   }
    // })
    // .catch((error)=> {
    //   console.error(error);
    // });

    //----
    mang2 = [
      {
        "idKH":"IT1",
        "image": "http://www.consultingvietnam.vn/wp-content/uploads/2016/06/sang-tao-khoa-hoc-consultingvietnam.jpg",
        "tenKH":"Microsoft Excel Advanced - Theo Phương Pháp Online 73",
        "ngay":"08/12/2016",
        "diadiem":"TP Hồ Chí Minh",
        "hinhthuc":"Học Online",
        "sale":"-10%",
        "gioiThieuKH":"Bạn chưa biết làm thế nào để chuyển những nội dung đào tạo cần thiết vào tài liệu, tạo ra niềm vui và sự hứng thú học hỏi cho học viên?",
        "noidungKH":"Thong tin noi dung khoa hoc",

        "TrungTam":
        {
          "logo":"https://staticedm.r.worldssl.net/uploads/images/courses/avatar_khoapham.jpg",
          "tenTrungTam":"Trung tam tin hoc KhoaPham",
          "diaChiTrungTam":"A8 Tower, 55 Trương Quốc Dung, P.10, Quận Phú Nhuận, TP Hồ Chí Minh  Người liên hệ: Trần Thị Thu Hằng - Bộ phận tư vấn"
        }
      },
      {
        "idKH":"IT2",
        "image": "https://newagesoldier.com/wp-content/uploads/2015/11/android-app-banner.jpg",
        "tenKH":"Android",
        "ngay":"08/12/2016",
        "diadiem":"TP Hồ Chí Minh",
        "hinhthuc":"Học Online",
        "sale":"-15%",
        "gioiThieuKH":"Bạn chưa biết làm thế nào để chuyển những nội dung đào tạo cần thiết vào tài liệu, tạo ra niềm vui và sự hứng thú học hỏi cho học viên?",
        "noidungKH":"Thong tin noi dung khoa hoc",

        "TrungTam":
        {
          "logo":"https://staticedm.r.worldssl.net/uploads/images/courses/avatar_khoapham.jpg",
          "tenTrungTam":"Trung tam tin hoc KhoaPham",
          "diaChiTrungTam":"A8 Tower, 55 Trương Quốc Dung, P.10, Quận Phú Nhuận, TP Hồ Chí Minh  Người liên hệ: Trần Thị Thu Hằng - Bộ phận tư vấn"
        }
      },
      {
        "idKH":"IT3",
        "image": "http://www.consultingvietnam.vn/wp-content/uploads/2016/06/sang-tao-khoa-hoc-consultingvietnam.jpg",
        "tenKH":"iOS",
        "ngay":"09/12/2016",
        "diadiem":"TP Hồ Chí Minh",
        "hinhthuc":"Học Online",
        "sale":"-55%",
        "gioiThieuKH":"Bạn chưa biết làm thế nào để chuyển những nội dung đào tạo cần thiết vào tài liệu, tạo ra niềm vui và sự hứng thú học hỏi cho học viên?",
        "noidungKH":"Thong tin noi dung khoa hoc",

        "TrungTam":
        {
          "logo":"https://staticedm.r.worldssl.net/uploads/images/courses/avatar_khoapham.jpg",
          "tenTrungTam":"Trung tam tin hoc KhoaPham",
          "diaChiTrungTam":"A8 Tower, 55 Trương Quốc Dung, P.10, Quận Phú Nhuận, TP Hồ Chí Minh  Người liên hệ: Trần Thị Thu Hằng - Bộ phận tư vấn"
        }
      }
    ]
    mang = mang.concat(mang2)
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(mang),
    });
  }


  componentDidMount(){
    fetch("http://khoahoc.nhodalat.com/daotao")
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
    backgroundColor:'white',
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
    marginLeft: ((width / 2) - (width / 2)),
    marginTop:20,
    width:width,
    textAlign:'center',
    fontSize:size21,
    color:'white',
  },

  lst:{
    width: width,
    height: ((height - 64 ) - 0 ) - ((Platform.OS === 'ios') ? 50 : 70),
  },

  row:{
    width: width - 16,
    height: (height / 5) + 8,
    marginTop:8,
    marginRight:8,
    marginLeft:8,
    flexDirection:'row',
    borderColor: 'gray',
    borderWidth:1
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
    fontSize:size15,
    fontWeight:'bold',
    marginLeft:8,
    marginRight:8,
    marginTop:8
  },
  viewDetail:{
    flex:2/3,
    flexDirection:'row',
  },

  left:{
    flex:1/7,
  },

  right:{
    flex:6/7,
  },

  iconDetailKH:{
    width:size21,
    height:size21,
    marginLeft:5,
    tintColor:'gray',
    marginTop:marTop - 2
  },

  textDetailKH:{
    color:'gray',
    fontSize:size15,
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

})
