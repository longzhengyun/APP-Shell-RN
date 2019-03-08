import React, { Component } from 'react';

import RootSiblings from 'react-native-root-siblings';

import LoadingContainer from './loadingContainer'; // loading模块

class LoadingModel extends Component {
    static loading = null;

    static show() {
        loading = new RootSiblings(<LoadingContainer />);
        return loading;
    }

    static hide() {
        if (loading instanceof RootSiblings) {
            loading.destroy();
        }
    }

    componentWillMount() {}

    componentWillUnmount() {};

    render() {
        return null;
    }
}

export default LoadingModel;