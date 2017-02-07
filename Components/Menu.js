import React , {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ListView,
  Dimensions,
  PixelRatio,
} from 'react-native';
var {width, height} = Dimensions.get('window');
import Accordion from 'react-native-accordion';

//Custom Size Decive
if (PixelRatio.get() === 2){//4, 4S, 5, 5c, 5s, 6, 320 dpi
  size12 = 12;
  size18 = 18;
}else if (PixelRatio.get() === 3){// 6 plus, 480 dpi
  size18 = 21;
  size12 = 18;
}else if (PixelRatio.get() === 3.5){//Nexus 6
  size18 = 23;
  size12 = 21;
}

if (width >= 768){
  size18 = 31;
  size12 = 27;
}

export default class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2})
    };
  }

  createRow(item){    
    var header = (
      <View style={styles.row}>
        <Text style={styles.textMenu}>{item.name}</Text>
      </View>
    );

    var content = (
      <View style={{backgroundColor:'#354e9a'}}>
        <TouchableOpacity onPress={this.props.menuItemAllClick.bind(this, [item.id, item.name])}>
          <Text style={[styles.textMenuDetail, {marginLeft:35}]}>Tất cả</Text>
        </TouchableOpacity>

        <ListView style={styles.listview}
          dataSource={
            new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}).cloneWithRows(item.khoahoc)}
          renderRow={this._createRow2.bind(this)}
        />
      </View>
    );

    return (
      <Accordion
        header={header}
        content={content}
        easing="easeOutCubic"
      />
    );
  }

  _createRow2(item){
    return(
      <View style={styles.rowDetail}>
        <TouchableOpacity onPress={this.props.menuItemTitleClick.bind(this, [item.id, item.name,"menu"])}>
          <Text style={styles.textMenuDetail}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.bg}>
        <ListView style={styles.lst}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this.createRow.bind(this)}
        />
      </View>
    );
  }


  componentWillMount(){
    fetch("http://khoahoc.nhodalat.com/nganh")
    .then((response) => response.json())
    .then((responseJson) => {
      mang = responseJson;
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
    flex:1,
    backgroundColor:'#354e9a'
  },

  lst:{
    height: height - 64,
    marginTop:64,
    backgroundColor:'#354e9a'
  },

  row:{
    height:40,
    backgroundColor:'#354e9a',
    marginLeft:20,
    alignItems:'flex-start',
    justifyContent:'center',
  },

  textMenu:{
    color:'white',
    fontSize:size18,
    fontWeight:'bold'
  },

  rowDetail:{
    height:30,
    marginTop:10,
    marginLeft:20,
    alignItems:'flex-start',
    justifyContent:'center',
  },

  textMenuDetail:{
    color:'white',
    fontSize:size12,
    fontWeight:'bold'
  },

  listview:{
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor:'#354e9a',
  }
});
