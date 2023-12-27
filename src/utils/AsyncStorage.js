/**
 * @author <dutianhe@ruubypay.com>
 * @date 2023-03-20 14:55:49
 * @description 本地存储  https://www.reactnative.cn/docs/0.68/asyncstorage
 * @module
 * @return
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export const _storeData = async (key,value) => {
    try {
        typeof value !== 'string' ? value = JSON.stringify(value) : value;
        await AsyncStorage.setItem(
            key,
            value
        );
    } catch (error) {
        // Error saving data
    }
};


/**
 * 获取存储数据
 */
export const _retrieveData = async (key) => {
    try {
        let value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // We have data!!
            if(value.indexOf("{") === 0 || value.indexOf("[") === 0){
                value = JSON.parse(value);
            }
        }
        return value;
    } catch (error) {
        // Error retrieving data
        return null;
    }
};


export const _removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(
            key
        );
    } catch (error) {
        // Error saving data
    }
};



