/**
 * Created by gatt on 2016/5/30.
 */

import React, {
    Component
} from 'react';

import {
    View,
    TextInput,
    StyleSheet,
    PixelRatio
} from 'react-native';

export default class IconTextInput extends Component {
    static defaultProps = {
        underlineColor: '#ccc',
        underlineFocusColor: '#2196f3'
    };

    static propTypes = {
        beforeComponent: React.PropTypes.element,
        afterComponent: React.PropTypes.element,
        underlineColor: React.PropTypes.string,
        underlineFocusColor: React.PropTypes.string
    };

    constructor(props) {
        super(props);
    }

    renderBefore() {
        if (this.props.beforeComponent) {
            return (
                <View style={{
                    width: 32,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {this.props.beforeComponent}
                </View>
            )
        }
    }

    renderAfter() {
        if (this.props.beforeComponent) {
            return (
                <View style={{
                    paddingLeft: 5,
                    paddingRight: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {this.props.afterComponent}
                </View>
            )
        }
    }

    onInputFocus(e) {
        this.refs.input.setNativeProps({
            style: {
                borderBottomColor: this.props.underlineFocusColor
            }
        });

        var {onFocus, beforeComponent} = this.props;
        if (onFocus) {
            onFocus(e);
        }

        if (beforeComponent) {
            beforeComponent.props.color = 'red';
        }
    }

    onInputBlur(e) {
        this.refs.input.setNativeProps({
            style: {
                borderBottomColor: this.props.underlineColor
            }
        });

        var {onBlur} = this.props;
        if (onBlur) {
            onBlur(e);
        }
    }

    render() {
        var {
            style,
            ...props
        } = this.props;

        return (
            <View
                ref="input"
                style={[styles.inputWraper, {
                    borderBottomColor: this.props.underlineColor
                }]}
            >
                {this.renderBefore()}
                <TextInput
                    style={[styles.input, style]}
                    {...props}
                    underlineColorAndroid="transparent"
                    onBlur={(e) => this.onInputBlur(e)}
                    onFocus={(e) => this.onInputFocus(e)}
                />
                {this.renderAfter()}
            </View>
        )
    }
}

var styles = StyleSheet.create({
    inputWraper: {
        borderBottomWidth: Math.ceil(PixelRatio.get() / 2) * StyleSheet.hairlineWidth,
        flexDirection: 'row',
    },
    input: {
        padding: 4,
        flex: 1,
        fontSize: 16,
        color: '#333',
        borderWidth: 0
    }
})