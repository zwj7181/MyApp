// /* @flow */
//
// import React, { Component } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableHighlight,
//   TouchableNativeFeedback,
//   Platform,
//   ListView,
// } from 'react-native';
//
// import NavigationBar from '../../components/NavigationBar';
//
// const Touchable = Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback;
//
// const Industry_DATA = {
//   "互联网": ["淘宝", "京东", "苏宁", "国美", "一号店", "亚马孙", "蘑菇街"],
//   "餐饮": ["淘宝", "京东", "苏宁", "国美", "一号店", "亚马孙", "蘑菇街"],
//   "教育": ["淘宝", "京东", "苏宁", "国美", "一号店", "亚马孙", "蘑菇街"]
// };
//
// export default class IndustryPicker extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       dataSource: new ListView.DataSource({
//           rowHasChanged: (row1, row2) => row1 !== row2,
//           renderSectionHeader: (s1, s2) => s1 !== s2
//       })
//     };
//   }
//
//   componentDidMount() {
//     const DATA = Industry_DATA;
//     this.setState({
//       dataSource: this.state.dataSource.cloneWithRowsAndSections(DATA),
//     })
//   }
//
//   renderSectionHeader(sectionData, sectionId) {
//     return (
//       <View>
//         <Text>{sectionId}</Text>
//       </View>
//     )
//   }
//
//   renderRow(rowData, rowId, sectionId) {
//     return (
//       <Touchable>
//         <View>
//           <Text>{rowData} </Text>
//         </View>
//       </Touchable>
//     )
//   }
//   renderSeparator(sectionID, rowID) {
//       return (
//           <View key={rowID} style={styles.separator} />
//       );
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <NavigationBar
//           title='行业选择'
//           leftImageSource={require('../../images/back.png')}
//           leftItemFunc={() => this.props.navigator.pop()}
//         />
//         <ListView
//             dataSource={this.state.dataSource}
//             renderRow={this.renderRow}
//             renderSectionHeader={this.renderSectionHeader}
//             renderSeparator={this.renderSeparator}
//             contentContainerStyle={{backgroundColor:'#fcc'}}
//             showsVerticalScrollIndicator={true}
//             />
//       </View>
//     );
//   }
// }
//
// const separator = StyleSheet.hairlineWidth;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#eee'
//   },
//   separator: {
//       backgroundColor: '#ccc',
//       height: separator,
//   },
// });
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TextInput,
    Platform,
    Dimensions,
    TouchableNativeFeedback,
    TouchableHighlight,
} from 'react-native';

import NavigationBar from '../../components/NavigationBar';
import Icon from 'react-native-vector-icons/Ionicons';

const Touchable = Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback;

const Industry_DATA = {
  "互联网": ["淘宝", "京东", "苏宁", "国美", "一号店", "亚马孙", "蘑菇街"],
  "餐饮": ["淘宝", "京东", "苏宁", "国美", "一号店", "亚马孙", "蘑菇街"],
  "教育": ["淘宝", "京东", "苏宁", "国美", "一号店", "亚马孙", "蘑菇街"],
  "互联网2": ["淘宝", "京东", "苏宁", "国美", "一号店", "亚马孙", "蘑菇街"],
  "餐饮2": ["淘宝", "京东", "苏宁", "国美", "一号店", "亚马孙", "蘑菇街"],
  "教育2": ["淘宝", "京东", "苏宁", "国美", "一号店", "亚马孙", "蘑菇街"]
};

export default class IndustryPicker extends Component {

    constructor(props) {
        super(props);

        // const dataSource = new ListView.DataSource({
        //     rowHasChanged: (row1, row2) => row1 !== row2,
        //     sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        // });

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            }),
        };
    }
    componentDidMount() {
        const DATA = Industry_DATA;
        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(DATA),
        })
    }

    selectIndustry(industry) {
        const {navigator, params} = this.props;
        if (params.callback) {
            params.callback(industry);
        }

        const routes = navigator.getCurrentRoutes();
        navigator.popToRoute(routes[routes.length - 2]);
    }

    renderSectionHeader(sectionData, sectionId) {
        return (
            <View style={styles.sectionHeader}>
                <Text>
                    {sectionId}
                </Text>
            </View>
        )
    }

    renderRow(rowData, rowId, sectionId) {
        return (
          <Touchable underlayColor="rgba(0, 0, 0, 0.5)"
            onPress = {() => this.selectIndustry(rowData)}
            >
            <View  style={styles.rows}>
                <Text>
                    {rowData} ·{rowId}
                </Text>
            </View>
          </Touchable>
        )
    }

    render() {
        return (
            <View style={styles.container}>
              <NavigationBar
                 title='行业选择'
                 leftImageSource={require('../../images/back.png')}
                 leftItemFunc={() => this.props.navigator.pop()}
               />
              <ListView

                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow.bind(this)}
                  renderSectionHeader={this.renderSectionHeader.bind(this)}
                  contentContainerStyle={styles.rowContainer}
              />

            </View>
        );
    }
}
const separator = StyleSheet.hairlineWidth;
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    sectionHeader: {
        width: width,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcf',
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
    },
    rows: {
      backgroundColor:'#ffc',
      width:width / 3 - 10,
      height: width / 3 - 10,
      justifyContent: 'center',
      alignItems: 'center',
      margin:5
    }
});
