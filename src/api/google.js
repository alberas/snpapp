const API_KEY = "AIzaSyBVYmeDU_ygKnSUse2B0BKpnws_MdlW34w";

export const buscaFarmaciasProximas = async (lat, lng) => {

    var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lng+"&radius=500&type=drugstore&key=" + API_KEY;
    
    try {
        const response = await fetch(url);
        const responseJson = await response.json();
        return responseJson;
    }
    catch (error) {
        console.error(error);
    }
}