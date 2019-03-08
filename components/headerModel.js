import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';

import { HeaderStyles } from './../assets/css/AppStyles';

const HeaderModel = ({data, onBackAction, onCloseAction}) => {
  return (
    <View style={[HeaderStyles.headerModel, data.showLine && HeaderStyles.headerBottomBorder]}>
      <Text style={HeaderStyles.modelTitle}>{data.title}</Text>
      {
        data.showBack ?
        <TouchableOpacity activeOpacity={0.6} style={[HeaderStyles.modelBtn, HeaderStyles.modelBackBtn]} onPress={() => onBackAction()}>
          <Image
            style={HeaderStyles.modelBackArrow}
            source={require('./../assets/img/icon_back.png')}
          />
        </TouchableOpacity>
        :
        null
      }
      {
        data.showClose ?
        <Text style={[HeaderStyles.modelBtn, HeaderStyles.modelCloseBtn]} onPress={() => onCloseAction()}>
          <Text style={HeaderStyles.modelCloseText}>关闭</Text>
        </Text>
        :
        null
      }
    </View>
  );
}

export default HeaderModel;