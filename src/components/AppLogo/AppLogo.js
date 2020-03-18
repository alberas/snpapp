import React, { Component } from 'react';
import { Image } from 'react-native';



const logos = [
    "FFFF00",
    "FFA500",
    "FF1493",
    "BCD2EE",
    "7FFF00",
    "1E90FF"
];

const randomInt = (min, max) => {
	return min + Math.floor((max - min) * Math.random());
}

class AppLogo extends Component {

    /*
    render(){
        const index = randomInt(0,5);
        switch(index){
            case 0:
                return(<Image source={require("../../../assets/logos/FFFF00.png")}/>);
            case 1:
                return(<Image source={require("../../../assets/logos/FFA500.png")}/>);
            case 2:
                return(<Image source={require("../../../assets/logos/FF1493.png")}/>);
            case 3:
                return(<Image source={require("../../../assets/logos/BCD2EE.png")}/>);
            case 4:
                return(<Image source={require("../../../assets/logos/7FFF00.png")}/>);
            case 5:
                return(<Image source={require("../../../assets/logos/1E90FF.png")}/>);
        }
    };
    */
   render(){
        return(<Image source={require("../../../assets/logos/7FFF00.png")}/>);
   }
}

export default AppLogo;