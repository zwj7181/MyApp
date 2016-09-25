
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  InteractionManager,
  StatusBar,
  Platform,
} from 'react-native';

/**
视频
**/
export default class Video extends Component{

  componentDidMount(){
    InteractionManager.runAfterInteractions(()=>{
      //
      console.log('InteractionManager....MyMessage');
    });
  }

  render(){
    const{navigator}=this.props;
      console.log('InteractionManager....render');
    return(
      <View style={styles.container}>
        <StatusBar
         backgroundColor='#ce3d3a'
         barStyle='light-content'
         animated={true}
         hidden={false}
        />
        {Platform.OS =='ios' ? <View style={{height:20,backgroundColor:'#ce3d3a'}}/> :null}
        <View style={styles.itemLayout}><Text>视频区域</Text></View>
     </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  itemLayout:{flex:1,alignItems:'center',justifyContent:'center'}
});
