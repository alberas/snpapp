const API_URL = "http://159.65.231.112/api";


export const efetuarLogin = async (txtLogin, txtSenha) => {
    const url = API_URL + "/login";
    const formData = new FormData();
    formData.append("txtLogin", txtLogin);
    formData.append("txtSenha", txtSenha);
    
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