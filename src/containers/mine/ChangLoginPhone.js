
import React, { Component } from 'react';
import ReactNative, {
    View,
    StyleSheet,
    //ScrollView,影藏软键盘还是会有bug，有待解决
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from '../../components/NavigationBar';
import IconTextInput from '../../components/IconTextInput';
import Button from '../../components/Button';

import NewPhonePassword from './NewPhonePassword';

export default class ChangPhone extends Component {
    constructor(props) {
        super(props);
        this.icons = [];
    }

    onFocus(index) {
        const icon = this.icons[index];
        icon.setNativeProps({
            style: {
                color: '#2196f3'
            }
        });
    }

    onBlur(index) {
        const icon = this.icons[index];
        icon.setNativeProps({
            style: {
                color: '#ccc'
            }
        });
    }

    getVerificationCode() {
        let code = (Math.random() * 10000000 % 9000) + 1000;
        alert(parseInt(code));
    }

    next() {
        requestAnimationFrame(() => {
            this.props.navigator.push({
                component: NewPhonePassword
            });
        })
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <NavigationBar
                    title='系统设置'
                    leftImageSource={require('../../images/back.png')}
                    leftItemFunc={() => this.props.navigator.pop()}
                />

                <View style={styles.container}>
                    <IconTextInput
                        placeholder="输入新的手机号码"
                        maxLength={11}
                        keyboardType="phone-pad"
                        autoFocus={true}
                        beforeComponent={
                            <Icon ref={(icon) => this.icons[0] = icon} name="ios-phone-portrait-outline" size={22} color="#ccc" />
                        }
                        onFocus={() => this.onFocus(0)}
                        onBlur={() => this.onBlur(0)}
                    />
                    <View style={{height: 20}} />
                    <IconTextInput
                        placeholder="请输入验证码"
                        maxLength={4}
                        keyboardType="numeric"
                        beforeComponent={
                            <Icon ref={(icon) => this.icons[1] = icon} name="md-create" size={22} color="#ccc" />
                        }
                        onFocus={() => this.onFocus(1)}
                        onBlur={() => this.onBlur(1)}

                        afterComponent={
                            <View>
                                <Button
                                    size="small"
                                    type="link"
                                    onPress={() => this.getVerificationCode()}
                                >
                                    获取验证码
                                </Button>
                            </View>
                        }
                    />
                    <View style={{height: 40}} />
                    <Button type="primary" size="default" onPress={() => this.next()}>下一步</Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 30
    }
});
