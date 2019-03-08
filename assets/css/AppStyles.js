import {
  StatusBar,
  Platform,
  Dimensions,
  StyleSheet
} from 'react-native';

const SreenWidth = Dimensions.get('window').width;
const SreenHeight = Dimensions.get('window').height;
const PR = Platform.OS === 'ios' ? SreenWidth / 375 : SreenWidth / 360;

// 全局样式
const MainStyles = StyleSheet.create({
  section: {
    flex: 1
  },
  // statusBar: {
  //   height: Platform.OS === 'ios' ? PR * 22 : StatusBar.currentHeight
  // },
  webView: {
    flex: 1
  }
});

// 头部样式
const HeaderStyles = StyleSheet.create({
  headerModel: {
    height: Platform.OS === 'ios' ? PR * 43 : StatusBar.currentHeight + PR * 43,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  headerBottomBorder: {
    borderBottomWidth: PR * 1,
    borderBottomColor: '#ececec',
    borderStyle: 'solid'
  },
  modelTitle: {
    paddingHorizontal: PR * 86,
    fontSize: PR * 16,
    color: '#333',
    textAlign: 'center',
    textAlignVertical: 'center',
    overflow: 'hidden'
  },
  modelBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    width: PR * 43,
    height: PR * 43,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modelBackArrow: {
    width: PR * 19,
    height: PR * 18,
  },
  modelCloseBtn: {
    left: PR * 48,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  modelCloseText: {
    fontSize: PR * 14,
    includeFontPadding: false,
    color: '#333',
    ...Platform.select({
      ios:{
          lineHeight: PR * 43,
      }
    })
  },
  modelSetBtn: {
    right: PR * 15
  },
  modelSetIcon: {
    width: PR * 19,
    height: PR * 18,
  }
})

// 第三方webView样式
const TargetViewStyles = StyleSheet.create({
  targetViewModel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff'
  }
})

// 启动广告样式
const StartAdStyles = StyleSheet.create({
  startAdModel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff'
  },
  modelImg: {
    width: SreenWidth,
    height: SreenHeight
  },
  modelBtn: {
    position: 'absolute',
    top: PR * 32,
    right: PR * 10,
    backgroundColor: '#fff',
    paddingHorizontal: PR * 6,
    borderRadius: PR * 2
  },
  btnText: {
    fontSize: PR * 12,
    color: '#666'
  }
})

// 弹出广告样式
const PopAdStyles = StyleSheet.create({
  popAdModel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  modelImg: {
    width: PR * 320,
    height: PR * 320
  },
  modelBtn: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    borderColor: '#fff',
    borderWidth: PR * 1,
    borderRadius: PR * 48,
    width: PR * 48,
    height: PR * 48,
    marginTop: PR * 184,
    marginLeft: PR * -24
  },
  btnCont: {
    width: PR * 48,
    height: PR * 48,
    transform: [ { rotate: '45deg' } ]
  },
  btnClose: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: '#fff'
  },
  btnCloseX: {
    width: PR * 24,
    height: PR * 1,
    marginLeft: PR * -12
  },
  btnCloseY: {
    width: PR * 1,
    height: PR * 24,
    marginTop: PR * -12
  }
})

// 第三方webView样式
const NetWorkStyles = StyleSheet.create({
  netWorkModel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modelImg: {
    width: PR * 210,
    height: PR * 146,
    marginBottom: PR * 20
  },
  modelText: {
    color: '#999',
    fontSize: PR * 13
  }
})

// loading样式
const LoadingStyles = StyleSheet.create({
  loadingModel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  loadContent: {
    alignItems: 'center',
    justifyContent:'center',
    width: PR * 180,
    height: PR * 90,
    borderRadius: PR * 12,
    backgroundColor: 'rgba(0, 0, 0, .7)'
  },
  loadRotate: {
    width: PR * 38,
    height: PR * 38
  }
})

export {
  SreenWidth,
  SreenHeight,
  MainStyles,
  HeaderStyles,
  TargetViewStyles,
  StartAdStyles,
  PopAdStyles,
  NetWorkStyles,
  LoadingStyles
}