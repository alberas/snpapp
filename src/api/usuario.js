const API_URL = "http://snpmed.com.br/api";

export const cadastrar = async (txtNome, txtEmail, dtNascimento, txtSenha1, txtSenha2) => {
        const url = API_URL + "/usuario/inserir";
        const formData = new FormData();
        //2 = Paciente
        formData.append("id_tipo_usuario", 2);
        formData.append("nome", txtNome);
        formData.append("email", txtEmail);
        formData.append("dt_nascimento", dtNascimento);
        formData.append("senha1", txtSenha1);
        formData.append("senha2", txtSenha2);
        
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