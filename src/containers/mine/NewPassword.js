
import React, {
    Component
} from 'react';
import ReactNative, {
    View,
    ScrollView,
    StyleSheet,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from '../../components/NavigationBar';
import IconTextInput from '../../components/IconTextInput';
import Button from '../../components/Button';

export default class NewPassword extends Component {
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

    confirmedButton() {
        Alert.alert(
            '修改密码成功！',
            null,
             [{
                text: '确定', onPress:() => {
                  const {navigator, params} = this.props;
                  const routes = navigator.getCurrentRoutes();
                  navigator.popToRoute(routes[routes.length - 3]);
                }
            }]
        )
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <NavigationBar
                    title='设置密码'
                    leftImageSource={require('../../images/back.png')}
                    leftItemFunc={() => this.props.navigator.pop()}
                />

              <View style={styles.container}>
                    <IconTextInput
                        placeholder="新密码"
                        secureTextEntry={true}
                        autoFocus={true}
                        beforeComponent={
                            <Icon ref={(icon) => this.icons[0] = icon} name="ios-unlock-outline" size={22} color="#ccc" />
                        }
                        onFocus={() => this.onFocus(0)}
                        onBlur={() => this.onBlur(0)}
                    />
                    <View style={{height: 20}} />
                    <IconTextInput
                        placeholder="确认密码"
                        secureTextEntry={true}
                        beforeComponent={
                            <Icon ref={(icon) => this.icons[1] = icon} name="ios-lock-outline" size={22} color="#ccc" />
                        }
                        onFocus={() => this.onFocus(1)}
                        onBlur={() => this.onBlur(1)}
                    />
                    <View style={{height: 40}} />
                    <Button
                        type="primary" size="default"
                        onPress={() => this.confirmedButton()}
                    >
                        确认更改
                    </Button>
                </View>
            </View>
        )
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
