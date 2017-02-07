import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ListView,
  ScrollView
} from 'react-native';
var {width, height} = Dimensions.get('window');

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
        <TouchableOpacity onPress={this.props.itemClick.bind(this)}>
          <Image style={styles.imgKhoaHoc}
            source={{uri: 'http://www.consultingvietnam.vn/wp-content/uploads/2016/06/sang-tao-khoa-hoc-consultingvietnam.jpg'}}
          >
            <View style={styles.viewKhoaHoc}>
              <Text style={styles.titleKhoaHoc}>Khoa hoc React Native</Text>
            </View>
          </Image>
        </TouchableOpacity>
      </View>
    );
  }

  render(){
    return(
      <View style={styles.bg}>
        {/*Navigation*/}
        <View style={styles.nav}>
          <TouchableOpacity onPress={this.props.menuClick}>
            <Image style={styles.menu}
              source={require('../Public/Images/menu.png')}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>Trang chủ</Text>
          </View>
        </View>

        {/*Body*/}
        <ScrollView>
          {/*ListView - horizontal*/}
          <View style={styles.khoahoc}>
            <View style={styles.headerkhoahoc}>
              <Text style={styles.tenkhoahoc}>IT - CNTT</Text>
              <TouchableOpacity onPress={this.props.seeAll.bind(this)}>
                <Text style={styles.seeAll}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            <ListView style={styles.lst}
              horizontal={true}
              dataSource={this.state.dataSource}
              renderRow={this.createRow.bind(this)}
            />
          </View>

          {/*ListView - horizontal*/}
          <View style={styles.khoahoc}>
            <View style={styles.headerkhoahoc}>
              <Text style={styles.tenkhoahoc}>Tiếng Anh</Text>
              <TouchableOpacity onPress={this.props.seeAll.bind(this)}>
                <Text style={styles.seeAll}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            <ListView style={styles.lst}
              horizontal={true}
              dataSource={this.state.dataSource}
              renderRow={this.createRow.bind(this)}
            />
          </View>

          {/*ListView - horizontal*/}
          <View style={styles.khoahoc}>
            <View style={styles.headerkhoahoc}>
              <Text style={styles.tenkhoahoc}>Kinh tế - Quản lý</Text>
              <TouchableOpacity onPress={this.props.seeAll.bind(this)}>
                <Text style={styles.seeAll}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            <ListView style={styles.lst}
              horizontal={true}
              dataSource={this.state.dataSource}
              renderRow={this.createRow.bind(this)}
            />
          </View>

          {/*ListView - horizontal*/}
          <View style={styles.khoahoc}>
            <View style={styles.headerkhoahoc}>
              <Text style={styles.tenkhoahoc}>Kỹ năng mềm</Text>
              <TouchableOpacity onPress={this.props.seeAll.bind(this)}>
                <Text style={styles.seeAll}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            <ListView style={styles.lst}
              horizontal={true}
              dataSource={this.state.dataSource}
              renderRow={this.createRow.bind(this)}
            />
          </View>

        </ScrollView>
      </View>
    );
  }

  componentDidMount(){
    mang = ["IT", "Kinh Doanh","Khoa Hoc","Luat","Noi Tro"]
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(mang)
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
    backgroundColor: '#00ba99',
    flexDirection: 'row'
  },

  menu:{
    width:23,
    height:23,
    marginTop:23,
    marginLeft:10
  },

  title:{
    marginLeft:20,
    marginTop:25,
    fontSize:21,
    color:'white',
    fontWeight:'bold',
  },

  tenkhoahoc:{
    color:'black',
    fontSize:18,
    fontWeight:'bold',
    marginLeft:8,
    marginTop:8,
    flex:1/2,
  },

  seeAll:{
    color:'black',
    fontSize:15,
    fontWeight:'bold',
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
    height: height / 3,
    backgroundColor:'white'
  },

  lst:{
    marginTop:8,
    marginBottom:8
  },

  row:{
    backgroundColor:'white',
    width: width - 60,
    borderRadius: 4,
    borderColor: 'black',
    marginLeft:8,
  },

  textMenu:{
    color:'black',
    fontSize:18,
    fontWeight:'bold'
  },

  imgKhoaHoc:{
    width: width - 60,
    height: (height / 3) - 42,
    borderRadius: 5,
    borderColor: 'black'
  },

  viewKhoaHoc:{
    marginTop: ((height / 3) - 42 ) - (height / 15),
    backgroundColor: '#00ba99',
    opacity: 0.9,
    height: height / 15,
    width:width - 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius:5,
    borderBottomLeftRadius:5,
  },

  titleKhoaHoc:{
    color:'white',
    fontSize:18,
    fontWeight:'bold',
  }






});
