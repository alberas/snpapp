import React from "react";

const config = require("../../sinapse.json");
const API_KEY = config.API_KEY;
const PLACES_API = "https://maps.googleapis.com/maps/api/place";
const STATIC_MAPS_API = "https://maps.googleapis.com/maps/api/staticmap";

export const buscaFarmaciasProximas = async (lat, lng) => {

    var url = PLACES_API + "/nearbysearch/json?location="+lat+","+lng+"&radius=5000&type=drugstore&key=" + API_KEY;
    
    try {
        const response = await fetch(url);
        const responseJson = await response.json();
        return responseJson;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}

export const detalhaFarmacia = async (place_id) => {
    var url = PLACES_API + "/details/json?place_id="+ place_id +"&fields=name,rating,formatted_phone_number,international_phone_number,formatted_address,photo,vicinity,place_id&key=" + API_KEY
    try {
        const response = await fetch(url);
        const responseJson = await response.json();
        return responseJson;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}

export const retornaUrlMapaEstatico = (centerLat, centerLong) => {
    var url = config.SERVICE_URL + "/staticmap.php?lat=" + centerLat + "&long=" + centerLong;
    return url;
}

export const buscaMapaEstatico = (centerLat, centerLong) => {
    //var url = config.SERVICE_URL + "/staticmap.php?lat=" + centerLat + "&long=" + centerLong;
    var url = config.SERVICE_URL + "/staticmap.php";
    var frm = new FormData();
    frm.append("lat", centerLat);
    frm.append("long", centerLong);
    try {
        const response = fetch(url,{
            body: frm
        });
        return response;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}