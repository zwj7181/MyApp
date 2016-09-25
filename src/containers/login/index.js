import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Platform,
    TouchableHighlight,
    TouchableNativeFeedback,
    ActivityIndicator,
    Navigator,
    Dimensions,
    TouchableOpacity,
    Modal,
    Image,
    Text,
    StatusBar,
} from 'react-native';

let Touchable = (Platform.OS === 'ios') ? TouchableHighlight : TouchableNativeFeedback;

import {connect} from 'react-redux';//将我们的页面和action链接起来
import {bindActionCreators} from 'redux';//将要绑定的actions和dispatch绑定到一起
import * as actionCreators from './../../actions/loginActions';//导入需要绑定的actions

import BottomNavigation from './../bottomNavigation';

const {height, width} = Dimensions.get('window');
const line = StyleSheet.hairlineWidth;
/**
登陆页面
**/
class Login extends Component{

    constructor(props){
        super(props);
        this.state={

        }
        this.login=this.login.bind(this);
        this.onChangePhone=this.onChangePhone.bind(this);
        this.onChangePswd=this.onChangePswd.bind(this);
    }

    onChangePhone(text){
        this.setState({'phone':text,});
    }

    onChangePswd(text){
        this.setState({'password':text,});
    }

    login(){
        this.setState({focus: false,});
        if(!this.state.phone||!this.state.password){
            alert('用户名或密码不能为空！');
        }else{

            //this.refs.modal.open();//loading 状态
            this.props.actions.login({'phone':this.state.phone,'password':this.state.password});//dispath 登陆
        }
    }

   //该方法首次不会执行，如果返回false，则reduer不会执行，，
    shouldComponentUpdate(nextProps,nextState){

        const {isLoggedIn,navigator}=nextProps;
        if(isLoggedIn){
            this.setState({phone:'',password:''});

            navigator.push({
                sceneConfig: Navigator.SceneConfigs.FadeAndroid ,
                component:BottomNavigation,
                name:'BottomNavigation',
              });
        }
        return true;
    }

    render(){
       console.log('render...');
       return(
           <Image style={styles.background} source={require('../../images/login.png')}>
               <StatusBar
                    backgroundColor='rgba(0, 0, 0, .4)'
                    barStyle='light-content'
                    translucent={true}
                    animated={true}
                    hidden={false}
               />
               <View style={{padding:20,marginTop:50}}>
                   <View style={styles.item}>
                       <Text style={styles.text}>手机号码</Text>
                       <TextInput
                           style={styles.input}
                           keyboardType="numeric"
                           placeholderTextColor="#fff"
                           underlineColorAndroid="transparent"
                           placeholder='请输入手机号码'
                           autoFocus={true}
                           maxLength={11}
                           onChangeText={this.onChangePhone}
                           value={this.state.phone}
                       />
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.text}>密码</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#fff"
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            onChangeText={this.onChangePswd}
                            placeholder='请输入密码'
                            password={true}
                            value={this.state.password}
                        />
                    </View>

                    <Touchable
                        underlayColor="rgb(200, 0, 0)"
                        onPress={this.login}
                    >
                        <View style={styles.button}>
                            <Text style={{fontSize:16,color:'#fff'}}>登陆</Text>
                        </View>
                    </Touchable>
                </View>

                {/*<Modal
                    style={styles.modal}
                    ref='modal'
                    isOpen={this.props.status=='doing'?true:false}
                    animationDuration={0}
                    position={"center"}
                >
                    <ActivityIndicator size='large' />
                    <Text style={{marginTop:15,fontSize:16,color:'#444444'}}>
                        登陆中...</Text>
                </Modal>*/}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.status=='doing'?true:false}
                    onRequestClose={() => {this.setState({visible: false})}}
                >
                    <View style={styles.modalBackgroundView}>
                      <TouchableOpacity style={styles.modalBackgroundTouchble}
                        onPress={() => {
                          this.setState({visible: false})
                        }}
                    />
                    <View style={styles.modalView}>
                        <ActivityIndicator size='large' />
                        <Text style={{marginTop:15,fontSize:16,color:'#444444'}}>
                            登陆中...</Text>
                    </View>
                    </View>
                </Modal>
            </Image>
        );
    }
}

const styles =StyleSheet.create({
    background: {
        width: width,
        height: height,
    },
    item:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      height:50,
      borderBottomColor:'#ddd',
      borderBottomWidth:1,
    },
    text: {
        width: 80,
        color: '#fff',
    },
    input:{
        color: '#fff',
        paddingTop: 12,
        flex:1,
    },
    button:{
        backgroundColor:'#ce3d3a',
        height:50,
        marginTop:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 3,
    },
    //modalstyle
  modalView: {
    position: 'absolute',
    top: height / 2 - 100,
    width: width - 100,
    marginHorizontal: 50,
    height: 140,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackgroundView: {
    backgroundColor: 'rgba(0, 0, 0, .4)'
  },
  modalBackgroundTouchble: {
    width: width,
    height: height,
    //backgroundColor: 'rgba(0, 0, 0, .3)'
  },
  modalView3: {
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    backgroundColor: '#fcc',
  },
});

//根据全局state返回当前页面所需要的信息,（注意以props的形式传递给Login）
function mapStateToProps(state) {
    return {
        isLoggedIn: state.user.isLoggedIn,
        status: state.user.status,
    };
}
//返回可以操作store.state的actions,(其实就是我们可以通过actions来调用我们绑定好的一系列方法)
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

//链接起来
export default connect(mapStateToProps,mapDispatchToProps)(Login);
