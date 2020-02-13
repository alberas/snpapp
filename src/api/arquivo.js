const API_URL = "http://snpmed.com.br/api";

export const upload = async (idUsuario, bytArquivo) => {
    const url = API_URL + "/upload/" + idUsuario;
    try {
        const response = await fetch(url,{
            method: "POST",
            headers: {
                //'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
                "Content-Type" : "application/x-www-form-urlencoded"
             },
            body: "byt_arquivo=" + bytArquivo
        });
        const responseJson = await response.json();
        return responseJson;
    }
    catch (error) {
        console.error(error);
    }
}