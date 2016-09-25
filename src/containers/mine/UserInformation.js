import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  DatePickerAndroid,
  Picker,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import ImagePickerCrop from 'react-native-image-crop-picker';

import NavigationBar from '../../components/NavigationBar';
import Section from '../../components/Section.js';
import Cell from '../../components/Cell';
import Button from '../../components/Button';
import ProvincePicker from '../../components/ProvincePicker';
import IndustryPicker from './IndustryPicker'

const Touchable = Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback;
const {height, width} = Dimensions.get('window');
const separator = StyleSheet.hairlineWidth;

export default class UserInformation extends Component {
  constructor(props){
    super(props);
    this.state = {
      maxText: '01/01/98',
      province: '广东',
      city: '广州',
      industry: '互联网',
      avatar: require('../../images/cartoon_01.jpg'),
      image: require('../../images/cartoon_01.jpg'),
      sex: 'female',
      modalVisible: false,
      photoModalVisible: false,
      nameModalVisible: false,
      phoneModalVisible: false,
      emailModalVisible: false,
      userName: '蛋蛋的忧伤',
      userEmail: 'example@xiongda.com',
      userPhoneNumber: '13888888888',
      //underlineColor: '#666',
    };
  }

  handleClick() {
      var input = this.refs.inputName;
      var inputValue = input.value;
      this.setState({
          userName: inputValue
      })
  }
  setPhotoModalVisible(visible) {
      this.setState({photoModalVisible: visible});
  }
  setNameModalVisible(visible) {
      this.setState({nameModalVisible: visible});
  }
  setPhoneModalVisible(visible) {
      this.setState({phoneModalVisible: visible});
  }
  setEmailModalVisible(visible) {
      this.setState({emailModalVisible: visible});
  }

    pickSingleWithCamera(cropping) {
        ImagePickerCrop.openCamera({
            cropping,
            width: 300,
            height: 300,
        }).then(image => {
            console.log('received image', image);
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height},
                //images: null
            });
        }).catch(e => alert(e));
    }
    pickSingle(cropit) {
        ImagePickerCrop.openPicker({
            width: 300,
            height: 300,
            cropping: cropit,
            compressVideo: true
        }).then(image => {
            console.log('received image', image);
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
                //images: null
            });
        }).catch(e => {
            console.log(e.code);
            alert(e);
        });
    }

  //进行创建时间日期选择器
    async showPicker(stateKey, options) {
      try {
        var newState = {};
        const {action, year, month, day} = await DatePickerAndroid.open(options);
        if (action === DatePickerAndroid.dismissedAction) {
          return;
          //newState[stateKey + 'Text'] = '请选择一个日期';
        } else {
          var date = new Date(year, month, day);
          newState[stateKey + 'Text'] = date.toLocaleDateString();
          newState[stateKey + 'Date'] = date;
        }
        this.setState(newState);
      } catch ({code, message}) {
        console.warn(`Error in example '${stateKey}': `, message);
      }
    }
    chooseAvatar() {
      ImagePicker.showImagePicker({
        title: null,
        cancelButtonTitle: '                      取消',
        takePhotoButtonTitle: '                      拍照',
        chooseFromLibraryButtonTitle: '              从相册里选择',
        allowsEditing: true,
        noData: true,
        maxWidth: width - 40,
        maxHeight: 300,
        quality: 0.2,
        mediaType: 'photo',
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
      }, (response) => {
          console.log(response);
          if (response.uri) {
            const source = {uri: response.uri, isStatic: true, width: 40, height: 40};
            this.setState({
              avatar: source
            });
          }
      });
    }


  render() {
      return (
        <View style={styles.container}>

          <NavigationBar
            title='个人信息'
            //titleTextColor=''
            leftImageSource={require('../../images/back.png')}
            leftItemFunc={() => this.props.navigator.pop()}
            //rightItemFunc={this.rightItemAction.bind(this)}
          />

          <ScrollView style={styles.container}>
            <Section style={{paddingTop: 10}}>
              <Cell
                label="头像"
                after={
                  <Image source={this.state.image} style={styles.avatar} />
                }
                //onPress={() => this.chooseAvatar()}
                onPress={() => {this.setPhotoModalVisible(true)}}

              />
              <Cell
                label="姓名"
                after={this.state.userName}
                onPress = {() => {
                  this.setNameModalVisible(true)
                }}
              />
              <Cell
                label="性别"
                after={
                  <Picker
                    style={styles.sexSelect}
                    mode="dialog"
                    prompt="               请选择性别"
                    selectedValue={this.state.sex}
                    onValueChange={(value) => this.setState({sex: value})}
                  >
                    <Picker.Item label="                                  男" value="male" />
                    <Picker.Item label="                                  女" value="female" />
                  </Picker>
                }
              />
              <Cell
                label="生日"
                after={
                  <Text style={styles.text}>{this.state.maxText}</Text>
                }
                onPress={this.showPicker.bind(this, 'max', {
                    date: this.state.maxDate,
                    maxDate: new Date()
                  }
                )}
              />
              <Cell
                label="手机"
                after={this.state.userPhoneNumber}
                onPress = {() => {
                  this.setPhoneModalVisible(true)
                }}
              />
              <Cell
                label="邮箱"
                after={this.state.userEmail}
                onPress = {() => {
                  this.setEmailModalVisible(true)
                }}
              />
              <Cell
                label="地区"
                after={this.state.province + '   ' + this.state.city}
                onPress={() => {
                  this.props.navigator.push({
                    component: ProvincePicker,
                    params: {
                      callback: (province, city) => {
                        this.setState({
                          province: province,
                          city: city
                        });
                      }
                    }
                  })
                }}
              />
              <Cell
                label="行业"
                after={this.state.industry}
                onPress={() => {
                  this.props.navigator.push({
                    component: IndustryPicker,
                    params: {
                      callback: (industry) => {
                        this.setState({
                          industry
                        });
                      }
                    }
                  })
                }}
              />
            </Section>
          </ScrollView>
          {this.renderphotoSelectModal()}
          {this.renderChangNameModal()}
          {this.renderChangPhoneNumberModal()}
          {this.renderChangEmailModal()}
        </View>
      )
  }

  /*头像选择窗口*/
    renderphotoSelectModal() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.photoModalVisible}
                onRequestClose={() => {this.setPhotoModalVisible(!this.state.photoModalVisible)}}
            >
                <View style={{backgroundColor: 'rgba(0,0,0,.4)'}}>
                    <TouchableOpacity style={styles.modalBackground} onPress={() => {this.setPhotoModalVisible(!this.state.photoModalVisible)}}/>
                    <View style={styles.modalView_1}>
                        <View style={styles.buttonView}>
                            <View style={[styles.modalButton_1,{height:55}]}>
                                <Text style={styles.buttonText}>选择你的头像</Text>
                            </View>
                            <View style={styles.separator}></View>
                            <TouchableHighlight style={styles.modalButton_1} underlayColor="rgba(0,0,0,.1)"
                                                onPress={() => {this.pickSingleWithCamera(true);
                                                this.setModalVisible(false)}}>
                                <Text style={styles.buttonText}>拍照</Text>
                            </TouchableHighlight>
                            <View style={styles.separator}></View>
                            <TouchableHighlight style={styles.modalButton_1} underlayColor="rgba(0,0,0,.1)"
                                                onPress={() => {this.pickSingle(true);this.setPhotoModalVisible(false)}}>
                                <Text style={styles.buttonText}>从相册选择</Text>
                            </TouchableHighlight>
                            <View style={styles.separator}></View>
                            <TouchableHighlight style={styles.modalButton_1} underlayColor="rgba(0,0,0,.1)"
                                                onPress={() => {this.setPhotoModalVisible(false)}}>
                                <Text style={styles.buttonText}>取消</Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                </View>
            </Modal>
        )
    }
   //改名称弹窗
  renderChangNameModal() {
     return(
       <Modal
         animationType="fade"
         transparent={true}
         visible={this.state.nameModalVisible}
         onRequestClose={() => {this.setNameModalVisible(!this.state.nameModalVisible)}}
       >
         <View style={styles.modalBackgroundView}>
           <TouchableOpacity style={styles.modalBackgroundTouchble}
             onPress={() => {
               this.setNameModalVisible(!this.state.nameModalVisible)
             }}
           />
           <View style={styles.modalView}>
             <View style={styles.modalTitleView}>
               <Text style={styles.modalTitle}>修改用户名 </Text>
             </View>
             <View style={[styles.inputBox,]}>
               <TextInput style={styles.textInput}

                 ref="inputName"

                 maxLength={12}
                 placeholder={this.state.userName}
                 selectionColor="#f00"
                 keyboardType="default"
                 autoFocus={true}
                 underlineColorAndroid = "transparent"
                 //onChangeText={(userName) => this.setState({userName})}
                 //value={this.state.userName}
                 //onBlur={(e) => this.onInputBlur(e)}
                 //onFocus={(e) => this.onInputFocus(e)}
                 />
             </View>
             <View style={{width: width - 40, height: separator, backgroundColor: '#ccc'}}/>
             <View style={styles.modalButtonView}>
               <Touchable underlayColor="rgba(0, 0, 0, 0.5)"
                 onPress={() => {
                   this.setNameModalVisible(!this.state.nameModalVisible)
                 }}
               >
                 <View style={styles.modalButton}>
                   <Text style={styles.textColor}>取消</Text>
                 </View>
               </Touchable>
               <View style={{height: 45, width: separator, backgroundColor: '#ccc'}} />
               <Touchable underlayColor="rgba(0, 0, 0, 0.5)"
                 onPress={() => {
                   this.setNameModalVisible(!this.state.nameModalVisible)
                 }}
               >
                 <View style={styles.modalButton}>
                   <Text style={styles.textColor}>确定</Text>
                 </View>
               </Touchable>
             </View>
           </View>
         </View>
       </Modal>
     )
   }
   //改手机号码
  renderChangPhoneNumberModal() {
     return(
       <Modal
         animationType="fade"
         transparent={true}
         visible={this.state.phoneModalVisible}
         onRequestClose={() => {this.setPhoneModalVisible(!this.state.phoneModalVisible)}}
       >
         <View style={styles.modalBackgroundView}>
           <TouchableOpacity style={styles.modalBackgroundTouchble}
             onPress={() => {
               this.setPhoneModalVisible(!this.state.phoneModalVisible)
             }}
           />
           <View style={styles.modalView}>
             <View style={styles.modalTitleView}>
               <Text style={styles.modalTitle}>更改联系号码</Text>
             </View>
             <View style={[styles.inputBox,]}>
               <TextInput style={styles.textInput}
                 maxLength={11}
                 placeholder={this.state.userPhoneNumber}
                 selectionColor="#f00"
                 keyboardType="numeric"
                 autoFocus={true}
                 underlineColorAndroid = "transparent"
                 onChangeText={(userPhoneNumber) => this.setState({userPhoneeNumber})}
                 //value={this.state.userPhoneNumber}
                 //onBlur={(e) => this.onInputBlur(e)}
                 //onFocus={(e) => this.onInputFocus(e)}
                 />
             </View>
             <View style={{width: width - 40, height: separator, backgroundColor: '#ccc'}}/>
             <View style={styles.modalButtonView}>
               <Touchable underlayColor="rgba(0, 0, 0, 0.5)"
                 onPress={() => {
                   this.setPhoneModalVisible(!this.state.phoneModalVisible)
                 }}
               >
                 <View style={styles.modalButton}>
                   <Text style={styles.textColor}>取消</Text>
                 </View>
               </Touchable>
               <View style={{height: 45, width: separator, backgroundColor: '#ccc'}} />
               <Touchable underlayColor="rgba(0, 0, 0, 0.5)"
                 onPress={() => {
                   this.setPhoneModalVisible(!this.state.phoneModalVisible)
                 }}
               >
                 <View style={styles.modalButton}>
                   <Text style={styles.textColor}>确定</Text>
                 </View>
               </Touchable>
             </View>
           </View>
         </View>
       </Modal>
     )
   }
   //改邮箱
  renderChangEmailModal() {
     return(
       <Modal
         animationType="fade"
         transparent={true}
         visible={this.state.emailModalVisible}
         onRequestClose={() => {this.setEmailModalVisible(!this.state.emailModalVisible)}}
       >
         <View style={styles.modalBackgroundView}>
           <TouchableOpacity style={styles.modalBackgroundTouchble}
             onPress={() => {
               this.setEmailModalVisible(!this.state.emailModalVisible)
             }}
           />
           <View style={styles.modalView}>
             <View style={styles.modalTitleView}>
               <Text style={styles.modalTitle}>更改个人邮箱</Text>
             </View>
             <View style={[styles.inputBox,]}>
               <TextInput style={styles.textInput}
                 ref=""
                 maxLength={28}
                 placeholder={this.state.userEmail}
                 selectionColor="#f00"
                 keyboardType="email-address"
                 autoFocus={true}
                 underlineColorAndroid = "transparent"
                 onChangeText={(userEmail) => this.setState({userEmail})}
                 //onBlur={(e) => this.onInputBlur(e)}
                 //onFocus={(e) => this.onInputFocus(e)}
                 />
             </View>
             <View style={{width: width - 40, height: separator, backgroundColor: '#ccc'}}/>
             <View style={styles.modalButtonView}>
               <Touchable underlayColor="rgba(0, 0, 0, 0.5)"
                 onPress={() => {
                   this.setEmailModalVisible(!this.state.emailModalVisible)
                 }}
               >
                 <View style={styles.modalButton}>
                   <Text style={styles.textColor}>取消</Text>
                 </View>
               </Touchable>
               <View style={{height: 45, width: separator, backgroundColor: '#ccc'}} />
               <Touchable underlayColor="rgba(0, 0, 0, 0.5)"
                 onPress={() => {
                   this.setEmailModalVisible(!this.state.emailModalVisible)
                 }}
               >
                 <View style={styles.modalButton}>
                   <Text style={styles.textColor}>确定</Text>
                 </View>
               </Touchable>
             </View>
           </View>
         </View>
       </Modal>
     )
   }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  sexSelect: {
    width: 200,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: '#666',
  },
  //modalstyle
  modalView: {
    position: 'absolute',
    top: height / 2 - 120,
    width: width - 40,
    marginHorizontal: 20,
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
  modalTitleView: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 16,
    color: '#3393F2',
    //marginBottom: 10,
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
  },
  inputBox: {
    marginHorizontal: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3393F2'
  },
  textInput: {
    margin: 0,
    paddingVertical: 2,
    fontSize: 18,
    textAlign: 'center',
},
modalBackground: {
        width: width,
        height: height,
    },
    modalView_1: {
        position: 'absolute',
        top: height / 2 - 100,
        marginHorizontal: 20,
        //height: 160,
        backgroundColor: '#fff',
        width: 320,
        borderRadius: 5,
    },
    modalButton_1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 49,
    },
    separator: {
        backgroundColor: '#ccc',
        height: separator,
        width: 320,
    },
    buttonText: {
        fontSize: 16,
        color: '#333',
    }
});
