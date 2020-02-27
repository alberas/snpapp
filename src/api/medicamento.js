import { Form } from "native-base";

const API_URL = "http://snpmed.com.br/api";

export const medicamentosBuscar = async (ids) => {
    const reg = new RegExp(" ", "g");
    const url = API_URL + "/medicamentos/" + encodeURI(ids.replace(reg,""));
    try {
        const response = await fetch(url);
        const responseJson = await response.json();
        return responseJson;
    }
    catch (error) {
        console.error(error);
    }
}



