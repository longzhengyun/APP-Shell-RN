import React, { Component } from 'react';
import {
    View,
    Animated
} from 'react-native';

import { LoadingStyles } from '../assets/css/AppStyles';

class LoadingContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            spinValue: new Animated.Value(0)
        };
    }

    componentDidMount() {
        this._spin();
    }

    _spin() {
        this.state.spinValue.setValue(0);
        Animated.timing(
            this.state.spinValue,
            {
                toValue: 360,
                duration: 1000
            }
        ).start(() => this._spin());
    }

    render() {
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 360],//输入值
            outputRange: ['0deg', '360deg'] //输出值
        })
        return (
            <View style={LoadingStyles.loadingModel}>
                <View style={LoadingStyles.loadContent}>
                    <Animated.Image
                        style={[
                            LoadingStyles.loadRotate,
                            { transform: [{rotate: spin }] }
                        ]}
                        source={require('./../assets/img/icon_loading.png')}
                    />
                </View>
            </View>
        );
    }
}

export default LoadingContainer;