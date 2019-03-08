import React, { Component } from 'react';
import {
  View,
  StatusBar,
  BackHandler,
  Platform,
  NetInfo,
  DeviceEventEmitter,
  Alert
} from 'react-native';

import Permissions from 'react-native-permissions'
import RNFS from 'react-native-fs'
import { unzip } from 'react-native-zip-archive'

import DeviceInfo from 'react-native-device-info'; // 设备信息组件

import Toast from 'react-native-root-toast';

import SplashScreen from 'react-native-splash-screen'; // 启动图模块

import MainViewModel from './components/mainViewModel'; // 第三方webView模块
import TargetViewModel from './components/targetViewModel'; // 第三方webView模块
import NetWorkModel from './components/netWorkModel'; // 第三方webView模块

import { MainStyles } from './assets/css/AppStyles'; // 样式模块
import { BundleConfig } from './assets/js/AppConfig'; // 配置模块
import AppInfoUtil from './assets/js/AppInfo'; // App信息获取模块

export default class App extends Component {
  constructor(props) {
    super(props);

    this._onBackAndroid = this._onBackAndroid.bind(this);
    this._doAction = this._doAction.bind(this);

    this._handleMessage = this._handleMessage.bind(this);
    this._goTarget = this._goTarget.bind(this);

    this.state = {
      utmSource: Platform.OS === 'ios' ? 'ios_official' : 'android_official',
      statusBar: true,
      mainViewConfig: {
        showMainView: false,
        headerConfig: {}
      },
      targetViewConfig: {
        showTargetView: false,
        headerConfig: {}
      },
      route: '',
      noNetwork: false
    }
  }

  componentWillMount() { // 组件加载前
    // 获取渠道
    AppInfoUtil.getAppChannel().then((channel) => {
      this.setState({
        utmSource: channel,
        mainViewConfig: Object.assign({}, this.state.mainViewConfig, {
          showMainView: true
        })
      });
    }).catch((err) => {
      console.log(err);
    })

    // 监听网络状况
    NetInfo.addEventListener('connectionChange', (connectionInfo) => {
      let noNetwork = false
      if (connectionInfo.type === 'none' || connectionInfo.type === 'unknown') {
        noNetwork = true
      }
      this.setState({
        noNetwork
      });
    })
  }

  componentDidMount() { // 组件加载
    SplashScreen.hide(); // 隐藏启动图

    // this._updateBundle() // 检测更新bundle

    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid); // 监听原生返回键事件

      DeviceEventEmitter.addListener('NativeCustomEvent', (e) => {
        if (e === 'startDownload') {
          Toast.show('开始下载...', { position: Toast.positions.CENTER });
        }
      });

      // 获取存储权限
      Permissions.request('storage').then(response => {
        if (response !== 'authorized') {
          Alert.alert(
            '提示',
            '请在“系统设置”中开启手机读写权限，否则无法正常使用本应用',
            [
              {
                text: '好',
                onPress: () => console.log('Permission denied'),
                style: 'cancel',
              }
            ]
          )
        }
      })
    }
  }

  componentWillUnmount() { // 组件卸载
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', () => { }); // 移除监听原生返回键事件
    }

    NetInfo.removeEventListener('connectionChange', () => { }); // 移除监听网络状况事件
  }

  // 更新jsBundle
  _updateBundle() {
    fetch(BundleConfig.updateOrigin).then((response) => response.json()).then((json) => {
      let updateState = this._checkBundleVersion(json.bundleVersion, BundleConfig.version);
      if(updateState) {
        let downloadDir = RNFS.DocumentDirectoryPath
        if (Platform.OS === 'android') {
          downloadDir = RNFS.ExternalCachesDirectoryPath
        }
        let downloadFile = downloadDir + '/bkddBundle.zip'
        const options = {
          fromUrl: json.updateUrl,
          toFile: downloadFile,
          background: true,
          begin: (res) => {
            // console.log('begin', res);
            // console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
          },
          progress: (res) => {}
        };
        try {
          const ret = RNFS.downloadFile(options);
          ret.promise.then(res => {
            this._unzipBundle(downloadDir, downloadFile) // 解压缩
          }).catch(err => {
            console.log('err', err);
          });
        }
        catch (err) {
          console.log(err);
        }
      }
    }).catch((error) => console.log('检测更新失败:' + error));
  }

  _unzipBundle(downloadDir, downloadFile) {
    unzip(downloadFile, downloadDir).then((path) => {
      // 解压成功，将zip删除
      RNFS.unlink(downloadFile);
    }).catch((error) => {
      console.log(error)
    })
  }

  _onBackAndroid() { // 安卓监听返回物理键
    if (this.state.targetViewConfig.showTargetView || (this.state.route !== 'home' && this.state.route !== '')) {
      this._onBackAction(); // 执行回退方法
      return true; // 拦截安卓返回键回到桌面的默认操作
    }
  }

  _doAction(key) {
    if (key === 'back') {
      this._onBackAction(); // 执行回退方法
    } else if (key === 'close') {
      this._onCloseAction(); // 关闭第三方webView
    } else {
      console.log(key)
    }
  }

  _onBackAction() {
    if (this.state.targetViewConfig.showTargetView) { // 判断第三方webView是否显示
      if (this.state.targetViewConfig.canGoBack) { // 判断第三方webView是否能回退
        this.refs.targetView.refs.webView.goBack(); // 回退
      } else {
        this._onCloseAction(); // 关闭第三方webView
      }
    } else {
      this.refs.mainView.refs.webView.goBack(); //主webView回退
    }
  }

  _onCloseAction() {
    this.setState({ // 关闭第三方webView
      targetViewConfig: Object.assign({}, this.state.targetViewConfig, {
        showTargetView: false
      })
    })
  }

  _sendMessage(data) { // 向webView发送数据
    this.refs.mainView.refs.webView.postMessage(JSON.stringify(data));
  }

  _goTarget(data) {
    let targetViewConfig = {
      showTargetView: true,
      jumpUrl: data.jumpUrl
    }
    this.setState({ targetViewConfig });
  }

  _handleMessage(event) { //获取webView发送的数据
    let message = event.nativeEvent.data;

    if (message) {
      message = JSON.parse(message);

      // 当前路由名
      if (message.route) {
        this.setState({
          route: message.route
        })
      }

      // 头部配置
      if (message.headerConfig) {
        this.setState({
          mainViewConfig: Object.assign(this.state.mainViewConfig, {
            headerConfig: message.headerConfig
          })
        })
      }

      // 客户端信息
      if (message.deviceInfoConfig) {
        this._sendMessage({
          deviceInfoResult: {
            version: DeviceInfo.getVersion(),
            utmSource: this.state.utmSource,
            DeviceID: DeviceInfo.getUniqueID()
          }
        });
      }

      // 第三方webView配置
      if (message.targetViewConfig) {
        let targetViewConfig = {
          showTargetView: true,
          headerConfig: {
            title: message.targetViewConfig.title,
            showBack: true,
            showClose: true,
            showLine: true
          }
        }
        if (message.targetViewConfig.jumpUrl && message.targetViewConfig.jumpUrl.indexOf('http') === 0) {
          Object.assign(targetViewConfig, {
            jumpUrl: message.targetViewConfig.jumpUrl
          })
        }
        if (message.targetViewConfig.htmlData) {
          Object.assign(targetViewConfig, {
            jumpUrl: message.targetViewConfig.htmlData
          })
        }
        this.setState({ targetViewConfig })
      }
    }
  }

  render() {
    // 渲染状态栏组件
    const StatusBarComponent = this.state.statusBar ?
      <StatusBar animated={true} backgroundColor={'#fff'} barStyle={'dark-content'} translucent={true} /> :
      <StatusBar animated={true} backgroundColor={'transparent'} barStyle={'light-content'} translucent={true} />;

    // 渲染主webView组件
    const MainViewComponent = this.state.mainViewConfig.showMainView && !this.state.noNetwork ?
      <MainViewModel
        ref='mainView'
        data={this.state.mainViewConfig}
        handleMessage={this._handleMessage}
        doAction={this._doAction}
      /> : null;

    // 渲染第三方webView组件
    const TargetViewComponent = this.state.targetViewConfig.showTargetView && !this.state.noNetwork ?
      <TargetViewModel
        ref='targetView'
        data={this.state.targetViewConfig}
        doAction={this._doAction}
      /> : null;

    // 渲染网络组件
    const NetWorkComponent = this.state.noNetwork ?
      <NetWorkModel /> : null;

    return (
      <View style={MainStyles.section}>
        {
          StatusBarComponent
        }
        <View style={MainStyles.webView}>
          {
            MainViewComponent
          }
          {
            TargetViewComponent
          }
        </View>
        {
          NetWorkComponent
        }
      </View>
    );
  }
}