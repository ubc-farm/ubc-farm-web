/**
 * Created by Xingyu on 6/5/2017.
 */
import React, { Component } from 'react';
import { WebView } from 'react-native';

class Radar extends Component {
    render() {
        return (
            <WebView
                source={{uri: 'https://github.com/facebook/react-native'}}
                style={{marginTop: 20}}
            />
        );
    }
}

export default Radar;