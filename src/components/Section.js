/**
 * Created by gatt on 2016/6/2.
 */
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default class Section extends Component {
    static propTypes = {
        ...View.propTypes,
        label: React.PropTypes.string
    };

    renderLabel(label) {
        if (label && label !== "") {
            return (
                <Text style={styles.label}>{label}</Text>
            );
        }
    }

    renderCell(cell, index) {
        const {
            children
        } = this.props;

        const style = {};

        const count = React.Children.count(children);
        if (index == count - 1) {
            style.height = 0;
        }

        return (
            <View>
                <View key={index} style={[styles.cell]}>
                    {cell}
                </View>
                <View style={[styles.separator, style]} />
            </View>
        )
    }

    render() {
        const {
            label,
            children,
            style,
            ...props
        } = this.props;

        return (
            <View
                {...props}
                style={[styles.container, style]}
            >
                {this.renderLabel(label)}
                <View style={styles.section}>
                    {React.Children.map(children, (cell, index) => {
                        return this.renderCell(cell, index);
                    })}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        //paddingTop: 15
    },
    section: {
        //section去掉上下边的细线
        //borderTopWidth: StyleSheet.hairlineWidth,
        //borderBottomWidth: StyleSheet.hairlineWidth,
        //borderTopColor: '#ccc',
        //borderBottomColor: '#ccc'
    },
    label: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        fontSize: 14
    },
    cell: {
        backgroundColor: 'white'
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#ccc',
        marginLeft: 10,
        marginRight: 10
    }
});
