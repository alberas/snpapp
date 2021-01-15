const API_URL = "http://159.65.231.112/api";

export const inserirAtualizar = async (placeId, method, txtNome, txtEndereco, txtFone) => {
    var url = API_URL + "/pj/" + method;

    const formData = new FormData();
    formData.append("place_id", placeId);
    formData.append("nome", txtNome);
    formData.append("endereco", txtEndereco);
    formData.append("fones", `[{"tipo": 2, "numero":${txtFone}}]`);
    
    try {
        const response = await fetch(url,
            {
                method: "POST",
                headers: {
                    //'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
                    //"Content-Type" : "application/x-www-form-urlencoded"
                },
                body:  formData
            }
        );
        const responseJson = await response.json();
        return responseJson;
    }
    catch (error) {
        console.error(error);
    }
}
export const inserir = async (placeId, txtNome, txtEndereco, txtFone) => {
    return inserirAtualizar(placeId, "inserir", txtNome, txtEndereco, txtFone);
}

export const atualizar = async (placId, txtNome, txtEndereco, txtFone) => {
    return inserirAtualizar(placeId, "atualizar", txtNome, txtEndereco, txtFone);
}

export const buscaDados = async (placeId) => {
    var url = API_URL + "/pj/buscar/" + placeId;
    try {
        const response = await fetch(url);
        const responseJson = await response.json();
        return responseJson;
    }
    catch (error) {
        console.error(error);
    }
}


