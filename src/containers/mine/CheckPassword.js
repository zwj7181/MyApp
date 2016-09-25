
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from '../../components/NavigationBar';
import IconTextInput from '../../components/IconTextInput';
import Button from '../../components/Button';

import NewPassword from './NewPassword';

export default class PasswordCheck extends Component {
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
    next() {
        requestAnimationFrame(() => {
            this.props.navigator.push({
                component: NewPassword
            });
        })
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <NavigationBar
                    title='认证密码'
                    leftImageSource={require('../../images/back.png')}
                    leftItemFunc={() => this.props.navigator.pop()}
                />
              <View style={styles.container}>
                    <IconTextInput
                        placeholder="请输入当前使用密码"
                        secureTextEntry={true}
                        autoFocus={true}
                        beforeComponent={
                            <Icon ref={(icon) => this.icons[0] = icon} name="md-create" size={22} color="#ccc" />
                        }
                        onFocus={() => this.onFocus(0)}
                        onBlur={() => this.onBlur(0)}
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
