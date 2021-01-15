const API_URL = "http://159.65.231.112/api";

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

export const medicamentoPesquisarTermo = async(termo) => {
    const url = API_URL + "/medicamento";
    const formData = new FormData();
    formData.append("q", termo);
    try{
        const response = await fetch(url,{
                method: "POST",
                body:  formData
        });
        const responseJson = await response.json();
        return responseJson;
    }catch(error){
        console.log(error);
    }

}


