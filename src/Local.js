import React from 'react';
import {Image} from 'react-native';
import MapView from 'react-native-maps';
import  * as COLORS from './constants/colors'

var logo = require('../assets/logos/logo_small.png');

class Local extends React.Component{

    static navigationOptions = {
        title: 'Farmácias',
        headerTitle: () => <Image source={logo}/>,
        headerStyle: {
            backgroundColor: COLORS.HEADER_BACKGROUND_COLOR,
        },
        headerTintColor: COLORS.HEADER_FONT_COLOR,
        headerTitleStyle: {
            fontWeight: 'bold',
            color: COLORS.HEADER_FONT_COLOR
        },
    };

    render(){
        
        return (
            <MapView        
                style={{flex: 1}}        
                region={{          
                    latitude: this.props.navigation.getParam('lat2'),          
                    longitude: this.props.navigation.getParam('lng2'),          
                    latitudeDelta: 0.0922,          
                    longitudeDelta: 0.0421        
                    }}        
                    showsUserLocation={true}      
                    />
        );
    }
}



export default Local;