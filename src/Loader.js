import React from 'react';
import {View, Image} from 'react-native';

var img = require('../assets/icons/ajax-loader.gif');

class Loader extends React.Component{

    render(){
        return(
            <View style={{flex: 1}}>
                <Image
                    source={img}
                    style={styles.img}
                    />
            </View>
            );
    }
}

const styles = {
    img:{
        justifyContent: 'center',
        alignItems: 'center'
    }
}
export default Loader;