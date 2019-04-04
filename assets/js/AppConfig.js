import { version } from './../../package.json';

const apiOrigin = 'http://192.168.20.13:8097/api'
const origin = 'http://192.168.10.191:3000';

const updateOrigin = ``

// 相关配置
const AppConfig = {
    apiOrigin,
    origin
};

// 更新配置
const BundleConfig = {
    version,
    updateOrigin
}

export { AppConfig, BundleConfig }