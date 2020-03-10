import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, StyleSheet, ImageBackground } from "react-native";

const img = require("../../../assets/icons/bg.jpg");

const BackgroundImage = (props) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground source={img} style={styles.backgroundImage}>
                {props.children}
            </ImageBackground>
        </SafeAreaView>
    )
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