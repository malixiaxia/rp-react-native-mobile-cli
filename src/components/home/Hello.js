/**
 * @author <malixia@ruubypay.com>
 * @date 2023-12-28 14:52:22
 * @description components demo
 * @module
 * @return
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View ,Text} from 'react-native'
import {RPStyleSheet, scaleHeight, scaleSize} from '../../utils/ScreenUtil.js'
class Hello extends Component {
    render() {
        return (
            <View>
                <Text style={styles.content}>
                  从这里开启你的代码之旅吧!!!
                </Text>
            </View>
        );
    }
}

Hello.propTypes = {};
const styles = RPStyleSheet.create({
    content:{
        fontSize:40,
    },
});
export default Hello;