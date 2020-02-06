const API_URL = "http://snpmed.com.br/api";

export const retornaPromocoes = async () => {
    let url = API_URL + "/promocoes";
    try {
        const response = await fetch(url);
        const responseJson = await response.json();
        return responseJson;
    }
    catch (error) {
        console.error(error);
    }
};