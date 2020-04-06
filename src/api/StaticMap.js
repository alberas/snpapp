import React, { Component } from 'react';
import GoogleStaticMap from 'react-native-google-static-map';

class StaticMap extends Component{

    render(){

        return (
            <GoogleStaticMap
                    latitude={this.props.lat}
                    longitude={this.props.long}
                    zoom={13}
                    size={{ width: 300, height: 200 }}
                    apiKey={this.props.apiKey}
                />);
    }
}

export default StaticMap;