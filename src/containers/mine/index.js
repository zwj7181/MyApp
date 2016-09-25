/**
 *
 * @authors jun (https://github.com/zwjun)
 * @date    2016-08-02 16:21:29
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  Modal,
  StyleSheet,
  Platform,
  BackAndroid,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  Dimensions,StatusBar
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from '../../components/NavigationBar';

import Section from '../../components/Section.js';
import Cell from '../../components/Cell';
import Button from '../../components/Button';

import AboutUs from './AboutUs';
import UserInformation from './UserInformation';
import Setting from './Setting';
import Test from './Test';
const Touchable = Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback;
//TouchableNativeFeedback嵌套image导致图片不显示，而其他的两个touchable没有这个问题。

export default class SettingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      name: "蛋蛋的忧伤",
      itro: "Hello World!!! TouchableNativeFeedback嵌套image导致图片不显示，而其他的两个touchable没有这个问题",
      pic: null,
    };
  }
  componentDidMount() {
    this.setState({
      pic: require('../../images/cartoon_01.jpg'),
    })
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  rightItemAction() {
    alert("右侧按钮点击了");
  }
  leftItemAction() {
    alert("左侧按钮点击了");
  }
  exit() {
    Alert.alert(
      '确定要退出应用吗？',
      null,
      [{
        text: '取消'
      }, {
        text: '确定', onPress: () => BackAndroid.exitApp()
      }]
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title='设置'
          leftImageSource={require('../../images/back.png')}
          rightItemTitle='按钮'
          rightTextColor='#3393F2'
          leftItemFunc={this.leftItemAction.bind(this)}
          rightItemFunc={this.rightItemAction.bind(this)}
        />
      <Image
        style={styles.background}
        source={require('../../images/setting_background1.jpg')}>
        <TouchableOpacity style={styles.picTouchable}
          onPress={() => {
            this.props.navigator.push({
              component: UserInformation,
            })
          }}
        ><Text>图片加载失败...</Text>
          <Image source={this.state.pic} style={styles.pic}/>
        </TouchableOpacity>
        <View>
          <Text
            style={{fontSize: 17, color: '#333', textAlign:'center'}}>
            {this.state.name}
          </Text>
          <Text numberOfLines={2}>{this.state.itro}</Text>
        </View>
      </Image>
        <Section style={{paddingTop: 10}}>
          <Cell
            label="设置"
            icon={{name: 'ios-cog', size: 28, color: '#2196f3'}}
            onPress={() => {
              this.props.navigator.push({
                component: Setting
              })
            }}
          />
        </Section>
        <Section style={{paddingTop: 10}}>
          <Cell
            label="检查更新"
            icon={{name: 'ios-clock', size: 25, color: '#ff00f6'}}
            onPress = {() => {
              this.setModalVisible(true)
            }}
          />
          <Cell
            label="关于我们"
            icon={{name: 'ios-information-circle', size: 25, color: '#0dbd0d'}}
              onPress={() => {
                this.props.navigator.push({
                    component: AboutUs,
                });
              }}
          />
        </Section>
        <View style={{padding: 10}}>
            <Button  type="danger" onPress={() => this.exit()}>
              退出登录
            </Button>
        </View>
        {this.renderModal()}

        {/*测试入口*/}
        <View style={{padding: 10}}>
            <Button  type="primary"
              onPress={() => {
                this.props.navigator.push({
                    component: Test,
                });
              }}>
              Test Button
            </Button>
        </View>
      </View>
    );
  }
  //弹窗
  renderModal() {
    return(
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {this.setModalVisible(!this.state.modalVisible)}}
      >
        <View style={styles.modalBackgroundView}>
          <TouchableOpacity style={styles.modalBackgroundTouchble}
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}
          />
          <View style={styles.modalView}>
            <View style={styles.modalTextView}>
              <Text style={styles.modalText}>当前版本为：1.0.0 </Text>
              <Text style={styles.textColor}>有（无）版本更新</Text>
            </View>
            <View style={{width: width - 100, height: line, backgroundColor: '#ccc'}}/>
            <View style={styles.modalButtonView}>
              <Touchable underlayColor="rgba(0, 0, 0, 0.5)"
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}
              >
                <View style={styles.modalButton}>
                  <Text style={styles.textColor}>取消</Text>
                </View>
              </Touchable>
              <View style={{height: 45, width: line, backgroundColor: '#ccc'}} />
              <Touchable underlayColor="rgba(0, 0, 0, 0.5)"
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}
              >
                <View style={styles.modalButton}>
                  <Text style={styles.textColor}>更新</Text>
                </View>
              </Touchable>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
};

const {height, width} = Dimensions.get('window');
const line = StyleSheet.hairlineWidth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  leftButtonIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#ccf',
  },
  background: {
    width: width,
    height: 180,
    //resizeMode: 'stretch',
    //contain stretch cover
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  picTouchable: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 5,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pic: {
    position: 'absolute',
    top: 0,
    width: 100,
    height: 100,
    borderRadius: 50,
    //marginVertical: 5,
  },
  //modalstyle
  modalView: {
    position: 'absolute',
    top: height / 2 - 100,
    width: width - 100,
    marginHorizontal: 50,
    //height: 200,
    borderRadius: 3,
    backgroundColor: '#fcfcfc',
  },
  modalBackgroundView: {
    backgroundColor: 'rgba(0, 0, 0, .5)'
  },
  modalBackgroundTouchble: {
    width: width,
    height: height,
    //backgroundColor: 'rgba(0, 0, 0, .3)'
  },
  modalTextView: {
    alignItems: 'center',
    marginVertical: 20,
  },
  modalText: {
    fontSize: 18,
    color: '#3393F2',
    marginBottom: 10,
  },
  modalButtonView: {
    flexDirection: 'row',
  },
  modalButton: {
    flex: 1,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColor: {
    color: '#333',
  }
});
