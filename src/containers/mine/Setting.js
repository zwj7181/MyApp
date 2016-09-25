
import React, { Component } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from '../../components/NavigationBar';
import Section from '../../components/Section';
import Cell from '../../components/Cell';

import ChangLoginPhone from './ChangLoginPhone';
import PasswordCheck from './CheckPassword';
export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trueSwitchIsOn: true,
            falseSwitchIsOn: false
        };
    }//开关按钮的设置
    componentDidMount() {
        this.setState({

        })
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='系统设置'
                    leftImageSource={require('../../images/back.png')}
                    leftItemFunc={() => this.props.navigator.pop()}
                />
                <Section style={{paddingTop: 10}}>
                    <Cell
                        label="登录手机"
                        after={<Text>13888888888</Text>}
                        arrow
                        onPress={() => {
                            this.props.navigator.push({
                                component: ChangLoginPhone
                            });
                        }}
                    />
                    <Cell
                        label="登录密码"
                        arrow
                        onPress={() => {
                            this.props.navigator.push({
                                component: PasswordCheck
                            });
                        }}
                    />
                </Section>
                <Section style={{paddingTop: 10}}>
                    <Cell
                        label="允许消息通知"
                        after={
                        <Switch
                          onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
                          value={this.state.falseSwitchIsOn} />
                        }
                    />
                </Section>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    }
});
