const API_KEY = "AIzaSyBVYmeDU_ygKnSUse2B0BKpnws_MdlW34w";

export const buscaFarmaciasProximas = async (lat, lng) => {

    var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lng+"&radius=1000&type=drugstore&key=" + API_KEY;
    
    try {
        const response = await fetch(url);
        const responseJson = await response.json();
        return responseJson;
    }
    catch (error) {
        console.error(error);
    }
}

export const detalhaFarmacia = async (place_id) => {
    var url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+ place_id +"&fields=name,rating,formatted_phone_number,international_phone_number,formatted_address,photo,vicinity&key=" + API_KEY
    try {
        const response = await fetch(url);
        const responseJson = await response.json();
        return responseJson;
    }
    catch (error) {
        console.error(error);
    }
}