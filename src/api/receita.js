export const salvarImagemReceita = imagemReceita => {
  const { base64 } = imagemReceita;
  const url = "";
  fetch(url, {
    method: "POST",
    body: { base64 }
  });
};
