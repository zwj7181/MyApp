import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from '../../components/NavigationBar';;

export default class AboutUs extends Component {

  render() {
      return (
        <View style={styles.container}>

          <NavigationBar
            title='关于我们'
            //titleTextColor=''
            leftImageSource={require('../../images/back.png')}
            leftItemFunc={() => this.props.navigator.pop()}
            //rightItemFunc={this.rightItemAction.bind(this)}
          />

        <ScrollView contentContainerStyle={styles.content}>

            <View style={styles.logoView}>
              <Image source={require('../../images/weibo.png')} style={styles.logo} />
              <Text style={styles.title}>RGMIS_APP</Text>
              <Text>当前版本 V1.0.0</Text>
            </View>

            <View>
              <Text style={styles.title}>产品功能介绍：</Text>
              <Text style={styles.text}>
                　　使用React Native，你可以使用标准的平台组件，例如iOS的UITabBar或安卓的Drawer。 这使你的app获得平台一致的视觉效果和体验，并且获得最佳的性能和流畅性。
                使用对应的React component，就可以轻松地把这些原生组件整合到你的React Native应用中</Text>
                <Text style={styles.text}>
                  　　使用React Native，你可以使用标准的平台组件，例如iOS的UITabBar或安卓的Drawer。 这使你的app获得平台一致的视觉效果和体验，并且获得最佳的性能和流畅性。
                  使用对应的React component，就可以轻松地把这些原生组件整合到你的React Native应用中</Text>
                <Text style={styles.text}>
                  　　使用React Native，你可以使用标准的平台组件，例如iOS的UITabBar或安卓的Drawer。 这使你的app获得平台一致的视觉效果和体验，并且获得最佳的性能和流畅性。
                  使用对应的React component，就可以轻松地把这些原生组件整合到你的React Native应用中</Text>
            </View>

            <Text style={styles.text}>联系方式：020-88888888</Text>
            <View style={styles.copyright}>
              <Text style={[styles.title,{paddingBottom: 10}]}>使用条款和隐私政策</Text>
              <Text>熊大公司  版权所有</Text>
              <Text>Copyright @ 2015-2020  xiongda.</Text>
              <Text>All Rights Reserved.</Text>
            </View>

          </ScrollView>
        </View>
      )
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    //flex:1,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  logoView: {
    alignItems: 'center',
  },
  title: {
    color: '#3393F2',
    fontSize: 15,
  },
  text: {
    paddingTop: 10,
    paddingBottom: 10,
    lineHeight: 22
    // fontWeight: '300'
  },
  logo: {
    width: 80,
    height: 80,
    margin: 30,
  },
  copyright: {
    paddingVertical: 15,
    alignItems: 'center',
  }
});
