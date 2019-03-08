import React, { Component } from 'react';
import {
  SafeAreaView,
  WebView
} from 'react-native';

import HeaderModel from './headerModel'; // 头部模块

import { MainStyles } from './../assets/css/AppStyles';
import { AppConfig } from './../assets/js/AppConfig'; // 配置模块

// HTML PostMessage方法补丁
const patchPostMessageFunction = () => {
  const originalPostMessage = window.postMessage;

  const patchedPostMessage = (message, targetOrigin, transfer) => {
    originalPostMessage(message, targetOrigin, transfer);
  };

  patchedPostMessage.toString = () => String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');

  window.postMessage = patchedPostMessage;
};
const patchPostMessageJsCode = `(${String(patchPostMessageFunction)})();`;

class MainViewModel extends Component {
  constructor(props) {
    super(props);

    this.data = this.props.data;
    this.handleMessage = this.props.handleMessage;
    this.onBackAction = this.props.onBackAction;
  }

  render() {
    return (
      <SafeAreaView style={MainStyles.webView}>
        <HeaderModel
          data={this.data.headerConfig}
          onBackAction={this.onBackAction}
        />
        <WebView
          ref='webView'
          mixedContentMode='always'
          source={{ uri: AppConfig.origin, method: 'GET' }}
          style={MainStyles.webView}
          injectedJavaScript={patchPostMessageJsCode}
          onMessage={this.handleMessage}
          domStorageEnabled={true}
          bounces={false}
          useWebKit={true}
        />
      </SafeAreaView>
    );
  }
}

export default MainViewModel;