import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ListView,
  Platform,
  PixelRatio
} from 'react-native';
var {width, height} = Dimensions.get('window');

//Custom Size Decive
if (PixelRatio.get() === 2){//4, 4S, 5, 5c, 5s, 6, 320 dpi
  size10 = 10;
  size12 = 12;
  size15 = 15;
  size18 = 18;
  size21 = 21;
  size23 = 23;
}else if (PixelRatio.get() === 3){// 6 plus, 480 dpi
  marTop = (Platform.OS === 'ios') ? 11 : 5;
  if (Platform.OS === 'ios'){
    size10 = 18;
    size12 = 15;
    size15 = 21;
    size18 = 25;
    size21 = 23;
    size23 = 25;
  }else{
    size10 = 18;
    size12 = 15;
    size15 = 18;
    size18 = 23;
    size21 = 23;
    size23 = 25;
  }
}else if (PixelRatio.get() === 3.5){//Nexus 6
  size10 = 10;
  size12 = 12;
  size15 = 15;
  size18 = 18;
  size21 = 21;
  size23 = 23;
}

if (width >= 768){
  size10 = 10;
  size12 = 12;
  size15 = 15;
  size18 = 18;
  size21 = 21;
  size23 = 23;
}

export default class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}),
    };
  }

  createRow(item){
    return(
      <View style={styles.row}>
        <View style={styles.headerkhoahoc}>
          <Text style={styles.tenkhoahoc}>{item.name}</Text>
          <TouchableOpacity onPress={this.props.seeAll.bind(this, [item.id, item.name,"all"])}>
            <Text style={styles.seeAll}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <ListView style={styles.lst2}
          horizontal={true}
          dataSource={
            new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}).cloneWithRows(item.daotao)}
          renderRow={this.createRow2.bind(this)}
        />
      </View>
    );
  }

  render(){
    return(
      <View style={styles.bg}>
        {/*Navigation*/}
        <View style={styles.nav}>
          <TouchableOpacity onPress={this.props.back}>
            <Image style={styles.menu}
              source={require('../Public/Images/back.png')}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>{this.props.allKhoahoc[1]}</Text>
          </View>
        </View>

        {/*Body*/}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.createRow.bind(this)}
        />
      </View>
    );
  }

  createRow2(item){
    if(item.title.length > 50){
      tenKhoaHoc = item.title.substr(0, 50)+"...";
    }else{
      tenKhoaHoc = item.title;
    }

    if(item.trungtam.name.length > 30){
      tenTrungTam = item.trungtam.name.substr(0, 30)+"...";
    }else{
      tenTrungTam = item.trungtam.name;
    }

    if(item.hoconline === 1){
      hoconline = "Học online";
    }else{
      hoconline = "Học tại trung tâm";
    }

    splitted = item.ngaykhaigiang.substr(0, 10).split("-");
    ngay = splitted[2];
    thang = splitted[1];
    nam = splitted[0];

    return(
      <View style={styles.row2}>
        <TouchableOpacity onPress={this.props.itemClick.bind(this, item)}>
          {/*View 1*/}
          <Image style={styles.imgKhoaHoc}
            source={{uri: item.image}}
          >
            <Image
              style={styles.imgSales}
              source={require('../Public/Images/sale.png')}
            >
              <Text style={styles.textSale}>-{item.promotion}%</Text>
            </Image>
          </Image>

          {/*View 2*/}
          <View style={styles.viewKhoaHoc}>
            <Text style={styles.titleKhoaHoc}>{tenKhoaHoc}</Text>
          </View>

          {/*View 3*/}
          <View style={styles.viewThongTin}>
            <View style={styles.left}>
              <Image
                style={styles.iconDetailKH}
                source={require('../Public/Images/Calendar.png')}
              />
              <Image
                style={styles.iconDetailKH}
                source={require('../Public/Images/Marker.png')}
              />
              <Image
                style={styles.iconDetailKH}
                source={require('../Public/Images/Learn.png')}
              />
            </View>
            <View style={styles.right}>
              <Text style={styles.textDetailKH}>{ngay}-{thang}-{nam}</Text>
              <Text style={styles.textDetailKH}>{item.diadiemhoc}</Text>
              <Text style={styles.textDetailKH}>{hoconline}</Text>
            </View>
          </View>

          {/*View 4*/}
          <View style={styles.viewTrungTam}>
            <Image style={styles.logo}
              source={{uri: item.trungtam.logo}}
            />
            <View style={styles.tenTrungTam}>
              <Text style={styles.textTrungTam}>
                {tenTrungTam}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount(){
    // fetch("http://khoahoc.nhodalat.com/chude")
    // .then((response) => response.json())
    // .then((responseJson) => {
    //   mang = responseJson;
    //   //console.log(mang);
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(mang)
    //   });
    // })
    // .catch((error)=> {
    //   console.error(error);
    // });
    fetch("http://khoahoc.nhodalat.com/new?nganh="+this.props.allKhoahoc[1])
    .then((response) => response.json())
    .then((responseJson) => {
      mang = responseJson;
      //console.log(mang[0].khoahoc);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(mang[0].khoahoc)
      });
    })
    .catch((error)=> {
      console.error(error);
    });
  }
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
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
    marginLeft:20,
    marginTop:20,
    fontSize:size23,
    color:'white',
  },

  tenkhoahoc:{
    color:'#354e9a',
    fontSize:size18,
    marginLeft:8,
    marginTop:8,
    flex:1/2,
  },

  seeAll:{
    color:'black',
    fontSize:size15,
    marginRight:8,
    marginTop:8,
    textAlign:'right',
    flex:1/2,
  },

  headerkhoahoc:{
    flexDirection:'row',
  },

  khoahoc:{
    width: width,
    height: height / 1.5,
    backgroundColor:'white'
  },

  lst:{
    width: width,
    height: (height - 64 ) - ((Platform.OS === 'ios') ? 50 : 70),
    backgroundColor:'red'
  },

  lst2:{
    marginTop:8,
  },

  row:{
    marginTop:8,
    height: (height / 1.5) + 16,
    width: width,
  },

  row2:{
    width: width - 60,
    marginLeft:8,
  },

  textMenu:{
    color:'black',
    fontSize:size18,
  },

  imgKhoaHoc:{
    width: width - 60,
    height: (height / 3) - 42,
    borderColor: 'black',
  },

  imgSales:{
    width:(width - 60)/2.2,
    height:((height / 3) - 42) / 3,
    marginLeft:((width - 60) - ((width - 60)/3)),
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

  viewKhoaHoc:{
    backgroundColor: 'white',
    height: height / 10,
    width:width - 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth:1,
    borderRightWidth:1,
    borderBottomWidth:1,
    borderColor:'#D8D8D8'
  },

  viewThongTin:{
    opacity: 0.9,
    height: height / 7,
    width:width - 60,
    flexDirection:'row',
    borderColor:'#D8D8D8',
    borderLeftWidth:1,
    borderRightWidth:1
  },

  iconDetailKH:{
    width:((height / 7)/3) - 8,
    height: ((height / 7)/3) - 8,
    marginLeft:6,
    marginTop:6,
    tintColor:'gray'
  },

  left:{
    backgroundColor:'white',
    flex:1/10,
  },

  right:{
    backgroundColor:'white',
    flex:9/10
  },

  viewTrungTam:{
    opacity: 0.9,
    height: height / 10 - (Platform.OS === 'ios' ? 0: 4),
    width:width - 60,
    flexDirection:'row',
    borderColor:'#D8D8D8',
    borderLeftWidth:1,
    borderRightWidth:1,
    borderTopWidth:1,
    borderBottomWidth:1,
  },

  titleKhoaHoc:{
    color:'gray',
    fontSize:size18,
    fontWeight:'bold',
    textAlign:'center'
  },

  textDetailKH:{
    marginTop:Platform.OS === 'ios' ? 6 : 5,
    marginLeft:6,
    fontSize:((height / 7)/3) - 12,
    color:'gray'
  },

  logo:{
    marginTop:6,
    marginBottom:6,
    marginLeft:6,
    width: height / 10 - 12,
    height:height / 10 - 14
  },

  tenTrungTam:{
    flex:4/5,
    alignItems:'center',
    justifyContent:'center',
  },

  textTrungTam:{
    color:'gray',
    fontSize:Platform.OS === 'ios' ?size18:size15,
    textAlign:'center',
    marginLeft:8,
    marginRight:8
  },
});
