import React, {Component} from 'react';
import {
    Image,
    Text,
    View,
} from 'react-native';
import {RPStyleSheet, scaleHeight, scaleSize} from '../../utils/ScreenUtil.js'
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
                <Text style={styles.content}>
                    从这里开启你的代码之旅吧!!!
                </Text>
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
    content:{
        fontSize:40,
    },

    imgBox:{
        width:500,
        height:300,
    }
});
export default App;