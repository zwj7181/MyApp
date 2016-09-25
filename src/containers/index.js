import React, { Component } from 'react';
import {
    Navigator,
    BackAndroid,
} from 'react-native';

import Login from './login';

class App extends Component{

    constructor(props){
        super(props);
        this.renderScene=this.renderScene.bind(this);

        // this._listeners = [];
        // this.lastClickTime = (new Date()).getTime();
    }

    goBack() {
        let navigator = this.refs.navigator;
        if (navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
        }
        else {
            let time = (new Date()).getTime();
            if (time - this.lastClickTime < 1000) {
                BackAndroid.exitApp();
            } else {
                this.lastClickTime = time;
                //ToastAndroid.show('再按一次退出程序！', ToastAndroid.SHORT);
            }
        }
        return true;
    }

    componentDidMount() {
        this._listeners = [
            BackAndroid.addEventListener('hardwareBackPress', () => this.goBack())
        ];
    }

    componentWillUnmount() {
        this._listeners.forEach(function (listener) {
            listener.remove();
        })
    }

   //返回相应的 renderScene
    renderScene(route,navigator){
        let Component=route.component;
        return <Component navigator={navigator} route={route} params={route.params}/>
   }

    render(){
        return(
            <Navigator
                ref="navigator"
                style={{flex:1}}
                configureScene={(route, routeStack) => {
                    if (route.sceneConfig) {
                        return route.sceneConfig;
                    }
                    return Navigator.SceneConfigs.PushFromRight;
                }}

                renderScene={this.renderScene}

                initialRoute={{
                    component: Login,
                    name: 'Login',
                }}
            />
        );
    }
}

export default App;
