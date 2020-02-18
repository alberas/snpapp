import { Form } from "native-base";

const API_URL = "http://snpmed.com.br/api";

export const upload = async (idUsuario, bytArquivo) => {
    const url = API_URL + "/upload/" + idUsuario;
    const frmData = new FormData();
    frmData.append("byt_arquivo", bytArquivo);

    try {
        const response = await fetch(url,{
            method: "POST",
            headers: {
                //'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
                //"Content-Type" : "application/x-www-form-urlencoded"
             },
            body:  frmData
        });
        const responseJson = await response.json();
        return responseJson;
    }
    catch (error) {
        console.error(error);
    }
}


export const imageSearch = async (bytArquivo) => {
    const url = API_URL + "/imageSearch";
    const frmData = new FormData();
    frmData.append("byt_arquivo", bytArquivo);
    
    try {
        const response = await fetch(url,{
            method: "POST",
            body:  frmData
        });
        const responseJson = await response.json();
        return responseJson;
    }
    catch (error) {
        console.error(error);
    }
}