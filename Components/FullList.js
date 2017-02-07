import React , {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ListView,
  Platform,
  PixelRatio
} from 'react-native';
var {width, height} = Dimensions.get('window');

if (PixelRatio.get() === 2){//4, 4S, 5, 5c, 5s, 6, 320 dpi
  marTop = 9;
  size15 = 15;
  size18 = 18;
  size21 = 21;
  size23 = 23;
}else if (PixelRatio.get() === 3){// 6 plus, 480 dpi
  marTop = 11;
  size15 = 18;
  size18 = 21;
  if (Platform.OS === 'ios'){
    size21 = 23;
  }else{
    size21 = 21;
  }
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

export default class FullList extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}),
      page: 1,
      page2: 1,
    };
  }

  createRow(item){
    if(item.title.length > 30){
      tenKhoaHoc = item.title.substr(0, 30)+"...";
    }else{
      tenKhoaHoc = item.title;
    }

    if(item.hoconline === 1){
      hoconline = "Học online";
    }else{
      hoconline = "Học tại trung tâm";
    }

    if(item.diadiemhoc.length > 15){
      diadiemhoc = item.diadiemhoc.substr(0, 15)+"..";
    }else{
      diadiemhoc = item.diadiemhoc;
    }

    splitted = item.ngaykhaigiang.substr(0, 10).split("-");
    ngay = splitted[2];
    thang = splitted[1];
    nam = splitted[0];

    return(
      <View style={styles.row}>
        <TouchableOpacity onPress={this.props.itemClick.bind(this, item)}>
          <Image style={styles.imgKhoaHoc}
            source={{uri: item.image}}
          >
            <Image style={styles.imgSales}
              source={require('../Public/Images/sale.png')}
            >
              <Text style={styles.textSale}>-{item.promotion}%</Text>
            </Image>

            {/*View Detail*/}
            <View style={styles.viewKhoaHoc}>
              <Text style={styles.titleKhoaHoc}>
                {tenKhoaHoc}
              </Text>
              <View style={{flexDirection:'row', flex:1}}>
                <View style={{flex:1/2, flexDirection:'row'}}>
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
                    <Text style={styles.textDetailKH}>{ngay}-{thang}-{nam}</Text>
                    <Text style={styles.textDetailKH}>{diadiemhoc}</Text>
                  </View>
                </View>

                <View style={{flex:1/2,flexDirection:'row'}}>
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
                    <Text style={styles.textDetailKH}>{hoconline}</Text>
                    <Text style={styles.textDetailKH}>{item.price} VND</Text>
                  </View>
                </View>
              </View>
            </View>
          </Image>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return(
      <View style={styles.bg}>
        {/*Navigation*/}
        <View style={styles.nav}>
          <TouchableOpacity onPress={this.props.back}>
            <Image style={styles.menu}
              source={require('../Public/Images/back.png')}
            />
          </TouchableOpacity>
          <View >
            <Text style={styles.title}>
              {this.props.idChuDeKH[1]}
            </Text>
          </View>
        </View>

        {/*Container*/}
        <View style={styles.container}>
          <ListView style={styles.lst}
            dataSource={this.state.dataSource}
            renderRow={this.createRow.bind(this)}
            onEndReached={this._onEndReached.bind(this)}
            onEndReachedThreshold ={10}
          />
        </View>
      </View>
    );
  }

  _onEndReached(){
    if (this.props.idChuDeKH[2] == 'all'){
      //Top 5 khoa hoc theo chu de //tinhocvanphong
      //Giong Fullist
      //http://khoahoc.nhodalat.com/chudebyparam?page=1&name=Tin
      fetch("http://khoahoc.nhodalat.com/chudebyparam?page="+(this.state.page2 + 1)+"&name="+this.props.idChuDeKH[1])
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.length != 0){
          mang = mang.concat(responseJson);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(mang),
            page2: this.state.page2 + 1
          });
        }
      })
      .catch((error)=> {
        console.error(error);
      });

    }else{
      if (this.props.idChuDeKH[2] == 'menu'){
        fetch("http://khoahoc.nhodalat.com/chudebyparam?page="+(this.state.page2 + 1)+"&name="+this.props.idChuDeKH[1])
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.length != 0){
            mang = mang.concat(responseJson);
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(mang),
              page2: this.state.page2 + 1
            });
          }
        })
        .catch((error)=> {
          console.error(error);
        });
      }else{
        fetch("http://khoahoc.nhodalat.com/top5?page="+(this.state.page + 1 )+"&nganh="+this.props.idChuDeKH[1])
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
  }

  componentDidMount(){
    if (this.props.idChuDeKH[2] == 'all'){
      //Top 5 khoa hoc theo chu de //tinhocvanphong
      //Giong Fullist
      //http://khoahoc.nhodalat.com/chudebyparam?page=1&name=Tin
      fetch("http://khoahoc.nhodalat.com/chudebyparam?page="+this.state.page2+"&name="+this.props.idChuDeKH[1])
      .then((response) => response.json())
      .then((responseJson) => {
        mang = responseJson;
        console.log(responseJson);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(mang)
        });
      })
      .catch((error)=> {
        console.error(error);
      });

    }else{
      if (this.props.idChuDeKH[2] == 'menu'){
        fetch("http://khoahoc.nhodalat.com/chudebyparam?page="+this.state.page2+"&name="+this.props.idChuDeKH[1])
        .then((response) => response.json())
        .then((responseJson) => {
          mang = responseJson;
          console.log(responseJson);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(mang)
          });
        })
        .catch((error)=> {
          console.error(error);
        });
      }else{
        fetch("http://khoahoc.nhodalat.com/top5?page="+this.state.page+"&nganh="+this.props.idChuDeKH[1])
        .then((response) => response.json())
        .then((responseJson) => {
          mang = responseJson;
          console.log(responseJson);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(mang)
          });
        })
        .catch((error)=> {
          console.error(error);
        });
      }
    }
  }
}

const styles = StyleSheet.create({
  bg:{
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
    marginLeft: (width / 2) - (10 + size23 + (width / 2.8)),
    marginTop:20,
    width:(width / 1.4),
    textAlign:'center',
    fontSize:size23,
    color:'white',
  },

  container:{
    backgroundColor: 'white',
    width: width,
    height: (height - 64) - ((Platform.OS === 'ios') ? 50 : 70),
    marginBottom:8
  },

  lst:{
    width: width,
    height: (height - 64 ) - ((Platform.OS === 'ios') ? 50 : 70),
  },

  row:{
    backgroundColor:'white',
    width: width - 16,
    height: (height / 3) + 8,
    borderRadius: 4,
    borderColor: 'black',
    marginTop:8,
    marginRight:8,
    marginLeft:8,
  },

  imgKhoaHoc:{
    width: width - 16,
    height: (height / 3) + 8,
    borderRadius: 4,
    borderColor: 'black',
    borderWidth:1,
    borderColor:'#D8D8D8',
  },

  viewKhoaHoc:{
    marginTop: ((height / 3) + 8) - (height / 6.5) - (((height / 3) - 42) / 3),
    backgroundColor: 'white',
    opacity: 1,
    height: (height / 6.5),
    width: width - 16,
    borderColor:'#D8D8D8',
    borderWidth:1,
  },

  titleKhoaHoc:{
    width: width - 16 - 10,
    height: (height / 7)/2 - ((height / 7)/4),
    color:'gray',
    fontSize:size18,
    fontWeight:'bold',
    marginTop:4,
    marginLeft:5,
  },

  viewDetail:{
    width: width - 16,
    height: (height / 7)/2 + ((height / 7)/4),
    flexDirection: 'row'
  },

  left:{
    flex:1/7,
  },

  right:{
    flex:6/7,
  },

  imgDetailKH:{
    width:size21,
    height:size21,
    marginLeft:5,
    marginTop:marTop - 3,
    tintColor:'gray'
  },

  textDetailKH:{
    marginTop:marTop - ((Platform.OS === 'ios') ? 0 : 3),
    color:'gray',
    fontSize:size15 - ((Platform.OS === 'ios') ? 0 : 2)
  },

  imgSales:{
    width: (width - 16)/2.5,
    height:((height / 3) - 42) / 3,
    marginLeft:((width - 16) - ((width - 16)/3)),
    justifyContent:'center',
    alignItems:'center',
    tintColor:'#354e9a'
  },

  textSale:{
    width:(width - 16)/2.2,
    textAlign:'center',
    color:'white',
    fontSize:size18,
    fontWeight:'bold',
    backgroundColor:'transparent'
  },

});
