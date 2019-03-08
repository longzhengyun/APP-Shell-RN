import React from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';

import { NetWorkStyles } from './../assets/css/AppStyles';

const NetWorkModel = () => {
  return (
    <View style={NetWorkStyles.netWorkModel}>
      <Image
        style={NetWorkStyles.modelImg}
        source={require('./../assets/img/no_network.png')}
      />
      <Text style={NetWorkStyles.modelText}>客官，网络不稳定，请稍后重试～</Text>
    </View>
  );
}

export default NetWorkModel;