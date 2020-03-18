export const convToPt = (dt) => {
    const strDt =   dt.getDate() +"/"+ twoDigits(dt.getUTCMonth())  +"/"+ dt.getFullYear() + " " + twoDigits(dt.getHours()) + ":" + twoDigits(dt.getMinutes());
    return strDt;
}

export const twoDigits = (str) => {
    return ("0" + str).substring(str.toString().length - 1);
}