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

export const retornaDadosPromocao = async (id) => {
    let url = API_URL + "/promocoes/" + id;
    try {
        const response = await fetch(url);
        const responseJson = await response.json();
        return responseJson;
    }
    catch (error) {
        console.error(error);
    }
};

export const gerarVoucher = async (idEvento, idUsuario) => {
    let url = API_URL + "/gerarVoucher/" + idEvento + "/" + idUsuario;

    try {
        const response = await fetch(url);
        const responseJson = await response.json();
        return responseJson;
    }
    catch (error) {
        console.error(error);
    }
}

export const retornaVouchers = async (idUsuario) => {
    let url = API_URL + "/vouchers/" + idUsuario;
    try {
        const response = await fetch(url);
        const responseJson = await response.json();
        return responseJson;
    }
    catch (error) {
        console.error(error);
    }
}