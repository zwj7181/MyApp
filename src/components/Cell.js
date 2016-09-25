/**
 * Created by gatt on 2016/6/2.
 */
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Touchable = Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback;
const IconShape = {
    name: React.PropTypes.string.isRequired,
    size: React.PropTypes.number,
    color: React.PropTypes.string
};

export default class Cell extends Component {
    static propTypes = {
        ...TouchableHighlight.propTypes,
        label: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        icon: React.PropTypes.oneOfType([
            React.PropTypes.shape(IconShape),
            React.PropTypes.element
        ]),
        after: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        onPress: React.PropTypes.func,
        arrow: React.PropTypes.bool
    };

    static defaultProps = {
        arrow: false
    };

    renderLabel(label) {
        if (label && label.props) {
            return (
                <View style={{padding: 10}}>
                    {label}
                </View>
            )
        }
        else {
            return (
                <Text style={styles.label}>{label}</Text>
            )
        }
    }

    renderIcon(icon) {
        if (icon) {
            if (!!icon.props) {
                return (
                    <View style={styles.icon}>
                        {icon}
                    </View>
                );
            }
            else {
                return (
                    <Icon
                        style={styles.icon}
                        name={icon.name}
                        size={icon.size || 30}
                        color={icon.color || '#ccc'}
                    />
                );
            }
        }
    }

    renderAfter(after) {
        if (after) {
            if (!!after.props) {
                return (
                    <View style={{
                        padding: 10
                    }}>
                        {after}
                    </View>
                );
            }
            else {
                return (
                    <Text style={styles.after}>{after}</Text>
                );
            }
        }
    }

    renderArrow() {
        if (this.props.arrow) {
            return (
                <View>
                    <Icon name="ios-arrow-forward" size={25} color="#ccc"/>
                </View>
            );
        }
    }

    render() {
        const {
            icon,
            label,
            after,
            ...props
        } = this.props;

        return (
            <Touchable
                underlayColor="rgba(0, 0, 0, 0.1)"
                {...props}
            >
                <View style={styles.cell}>
                    {this.renderIcon(icon)}
                    {this.renderLabel(label)}
                    {this.renderAfter(after)}
                    {this.renderArrow()}
                </View>
            </Touchable>
        );
    }

}

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    icon: {
        margin: 10
    },
    label: {
        fontSize: 15,
        color: '#333',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 15,
        flex: 1
    },
    labelView: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    after: {
        marginRight: 10,
        fontSize: 14,
        color: '#666'
    }
});
