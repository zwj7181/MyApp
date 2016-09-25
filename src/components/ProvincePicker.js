
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    View,
    Text,
    ListView,
    Platform,
    TouchableHighlight,
    TouchableNativeFeedback,
} from 'react-native';

import NavigationBar from './NavigationBar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import provinces from '../commons/provinces';
import CityPicker from './CityPicker';

const PROVINCES_DATA = [];

const Touchable = Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback;

export default class ProvincePicker extends Component {
    constructor(props) {
      super(props);

      this.state = {
        dataSource : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      };
    }
    componentDidMount() {
      const PROVINCES_DATA = provinces;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(PROVINCES_DATA),
      });
    }
    /*跳转对应的省份的城市？*/
    selectProvince(province) {
      var {navigator, params} = this.props;
      //navigator.navigationContext.emit('provinceEvent', province);
      navigator.push({
        component: CityPicker,
        params: {
          province,
          callback: params.callback
        }
      });
    }

    renderRow(data, sectionID, rowID) {
      return (
        <Touchable
          underlayColor="rgba(0, 0, 0, 0.2)"
          onPress={() => this.selectProvince(data)}
        >
          <View style={styles.province}>
            <Text key={rowID} style={styles.provinceText}>{data}</Text>
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
              title='省份选择'
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
    backgroundColor: 'white',
  },
  province: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 15,
  },
  provinceText: {
    flex: 1,
    fontSize: 16,
  },
  separator: {
    backgroundColor: '#ccc',
    height: StyleSheet.hairlineWidth,
  },
})
