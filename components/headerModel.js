import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';

import { HeaderStyles } from './../assets/css/AppStyles';

const HeaderModel = ({data, doAction}) => {
  return (
    <View style={[HeaderStyles.headerModel, data.showLine && HeaderStyles.headerBottomBorder]}>
      <Text style={HeaderStyles.modelTitle}>{data.title}</Text>
      {
        data.showBack ?
        <TouchableOpacity activeOpacity={0.6} style={[HeaderStyles.modelBtn, HeaderStyles.modelBackBtn]} onPress={() => doAction('back')}>
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
        <Text style={[HeaderStyles.modelBtn, HeaderStyles.modelCloseBtn]} onPress={() => doAction('close')}>
          <Text style={HeaderStyles.modelCloseText}>关闭</Text>
        </Text>
        :
        null
      }
      {
        data.showSet ?
        <TouchableOpacity activeOpacity={0.6} style={[HeaderStyles.modelBtn, HeaderStyles.modelSetBtn]} onPress={() => doAction('set')}>
          <Image
            style={HeaderStyles.modelSetIcon}
            source={require('./../assets/img/icon_set.png')}
          />
        </TouchableOpacity>
        :
        null
      }
    </View>
  );
}

export default HeaderModel;