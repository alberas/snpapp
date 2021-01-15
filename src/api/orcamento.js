const API_URL = "http://159.65.231.112/api";

export const solicitarOrcamento = async (tipoContato, contato, bytArquivo, placeId) => {
    var fd = new FormData();
    fd.append("byt_arquivo", bytArquivo);
    fd.append("place_id", placeId);
    fd.append("tipo_contato", tipoContato);
    fd.append("contato", contato);

    var resp = await fetch(API_URL + "/orcamento",{
      method: "POST",
      body: fd
    });

    var json =  await resp.json();
    return json;
}