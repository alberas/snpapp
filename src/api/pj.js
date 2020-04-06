const API_URL = "http://snpmed.com.br/api";


export const efetuarLogin = async (txtNome, txtEndereco, txtFone) => {
    const url = API_URL + "/pj/atualizar";
    const formData = new FormData();
    formData.append("txtNome", txtNome);
    formData.append("txtEndereco", txtEndereco);
    formData.append("txtFone", txtFone);
    
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



