import React, { Component } from 'react';
import {
    SafeAreaView,
    WebView
} from 'react-native';

import HeaderModel from './headerModel'; // 头部模块

import { MainStyles, TargetViewStyles } from './../assets/css/AppStyles';
import { AppConfig } from './../assets/js/AppConfig'; // 配置模块

class TargetViewModel extends Component {
    constructor(props) {
        super(props);

        this.data = this.props.data;
        this.doAction = this.props.doAction;
    }

    render() {
        return (
            <SafeAreaView style={TargetViewStyles.targetViewModel}>
                <HeaderModel
                    data={this.data.headerConfig}
                    doAction={this.doAction}
                />
                <WebView
                    ref='webView'
                    mixedContentMode='always'
                    source={{ html: this.data.htmlData, uri: this.data.jumpUrl, method: 'GET', headers: { Referer: AppConfig.origin } }}
                    style={MainStyles.webView}
                    domStorageEnabled={true}
                    geolocationEnabled={true}
                    thirdPartyCookiesEnabled={true}
                    bounces={false}
                    useWebKit={true}
                />
            </SafeAreaView>
        );
    }
}

export default TargetViewModel;