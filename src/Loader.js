import React from 'react';
import {View, Image} from 'react-native';

var img = require('../assets/icons/ajax-loader.gif');

class Loader extends React.Component{

    render(){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    source={img}
                    />
            </View>
            );
    }
}

export default Loader;