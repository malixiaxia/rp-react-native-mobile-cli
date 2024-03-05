/**
 * @author <malixia@ruubypay.com>
 * @date 2023-12-28 14:52:22
 * @description pages demo
 * @module
 * @return
 */
import React, {Component} from 'react';
import {
    Image,
    Text,
    View,
} from 'react-native';
import {RPStyleSheet, scaleHeight, scaleSize} from '@/utils/ScreenUtil.js'
import Hello from '@/components/home/Hello'
const  Logo = 'https://static.ruubypay.com/ReactNative/images/react-native-logo.jpeg'
class App extends Component {
    render() {
        return (
            <View style={styles.homeBox}>
                <Image
                    resizeMode="stretch"
                    source={{
                        uri: Logo,
                    }}
                    style={styles.imgBox}
                />
                <Text style={styles.contentName}>
                    React Native
                </Text>
                <Hello />
            </View>
        );
    }
}

const styles = RPStyleSheet.create({
    homeBox: {
        width:750,
        height:1000,
        textAlign: 'center',
       justifyContent:"center",
        alignItems:"center"

    },
    contentName:{
        fontSize:80,
        marginBottom:60,
        marginTop:60
    },

    imgBox:{
        width:500,
        height:300,
    }
});
export default App;