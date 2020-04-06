import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, ImageBackground } from "react-native";
import { COLORS } from "./../../constants/colors";

const img = require("../../../assets/icons/bg.jpg");

const BackgroundImage = (props) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground source={img} style={styles.backgroundImage}>
                {props.children}
            </ImageBackground>
        </SafeAreaView>

    )
    
    /*
   return (
        <SafeAreaView style={{flex: 1}}>
            {props.children}
        </SafeAreaView>
    )
    */
}


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
});

export default BackgroundImage;