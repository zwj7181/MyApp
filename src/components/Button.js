/**
 * Created by gatt on 2016/6/1.
 */
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    PixelRatio,
    Platform,
} from 'react-native';

const Touchable = Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback;

const buttonColors = [
    '#FFFFFF', '#2196F3', '#4CAF50', '#9C27B0', '#FF9800', '#E51C23', 'transparent'
];

const disabledButtonColors = [
    '#E6E6E6', '#6FBBF7', '#8BCB8D', '#BF73CC', '#FFBC5A', '#EE6C70', 'transparent'
];

const textColors = [
    '#444444', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#444444'
];

const textDisabledColors = [
    'rgba(0, 0, 0, 0.4)', 'rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.6)',
    'rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.6)',
    'rgba(0, 0, 0, 0.6)'
];

const activeButtonColors = [
    '#E0E0E0', '#0B76CC', '#39843C', '#701C7E', '#C27400', '#B0141A', '#E0E0E0'
];

const buttonSizes = [
    {
        button: {height: 50},
        text: {fontSize: 20},
    }, {
        button: {height: 42},
        text: {fontSize: 17},
    }, {
        button: {height: 30},
        text: {fontSize: 14},
    }, {
        button: {height: 22},
        text: {fontSize: 12},
    }
];

const types = [
    'default', 'primary', 'success', 'info', 'warning', 'danger', 'link'
];

const sizes = [
    'large', 'default', 'small', 'mini'
];

export default class Button extends Component {
    static propTypes = {
        ...TouchableHighlight.propTypes,
        type: React.PropTypes.oneOf(types),
        size: React.PropTypes.oneOf(sizes),
        disabled: React.PropTypes.bool,
        style: View.propTypes.style
    };

    static defaultProps = {
        type: 'default',
        size: 'default',
        disabled: false,
    };

    constructor(props) {
        super(props);
    }

    render() {
        var {
            type,
            size,
            disabled,
            style,
            ...props,
        } = this.props;

        let btnStyle = {};
        let textStyle = {
            fontSize: 18,
            color: '#FFFFFF',
            marginLeft: 10,
            marginRight: 10,
        };
        let activeColor = activeButtonColors[0];
        types.forEach((ty, i) => {
            if (type === ty) {
                btnStyle.backgroundColor = disabled ? disabledButtonColors[i] : buttonColors[i];
                textStyle.color = disabled ? textDisabledColors[i] : textColors[i];
                activeColor = activeButtonColors[i];

                return false;
            }
        });

        if (type === 'default') {
            let ratio = Math.ceil(PixelRatio.get() / 2.0);
            btnStyle.borderWidth = ratio * StyleSheet.hairlineWidth;
            btnStyle.borderColor = 'rgba(0, 0, 0, 0.2)';
        }

        sizes.forEach((siz, i) => {
            if (size === siz) {
                Object.assign(btnStyle, btnStyle, buttonSizes[i].button);
                Object.assign(textStyle, textStyle, buttonSizes[i].text);
                return false;
            }
        });

        return (
            <Touchable
                {...props}
                disabled={disabled}
                underlayColor={this.props.underlayColor ? this.props.underlayColor : activeColor}
            >
                <View
                  style={[styles.button, btnStyle, style]}>
                  <Text style={textStyle}>{this.props.children}</Text>
                </View>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        height: 42,
        borderRadius: 3,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
