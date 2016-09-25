
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    View,
    Text,
    ListView,
    Platform,
    TouchableHighlight,
    TouchableNativeFeedback,
    ScrollView,
} from 'react-native';
import NavigationBar from './NavigationBar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import cities from '../commons/cities';

const CITIES_DATA = [];

const Touchable = Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback;

export default class CityPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
          dataSource : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        };
    }
    componentDidMount() {
      const CITIES_DATA = cities;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(CITIES_DATA[this.props.params.province]),
      });
    }
    selectCity(city) {
        const {navigator, params} = this.props;
        if (params.callback) {
            params.callback(params.province, city);
        }

        const routes = navigator.getCurrentRoutes();
        navigator.popToRoute(routes[routes.length - 3]);
    }

    renderRow(data, sectionID, rowID) {

        return (
            <Touchable
                underlayColor="rgba(0, 0, 0, 0.1)"
                onPress={() => this.selectCity(data)}
            >
                <View style={styles.city}>
                    <Text key={rowID} style={styles.cityText}>{data}</Text>
                    <Icon name="chevron-right" size={25} color="#ccc" />
                </View>
            </Touchable>
        );
    }

    renderSeparator(sectionID, rowID) {
        return (
            <View key={rowID} style={styles.separator} />
        );
    }

    render() {
        return (
            <View style={styles.container}>
              <NavigationBar
                title='城市选择'
                //titleTextColor=''
                leftImageSource={require('../images/back.png')}
                leftItemFunc={() => this.props.navigator.pop()}
                //rightItemFunc={this.rightItemAction.bind(this)}
              />
              <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID)}
                renderSeparator={(sectionID, rowID) => this.renderSeparator(sectionID, rowID)}
              />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    city: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 15
    },
    cityText: {
        flex: 1,
        fontSize: 16
    },
    separator: {
        backgroundColor: '#ccc',
        height: StyleSheet.hairlineWidth
    }
})
