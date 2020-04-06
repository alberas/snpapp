export const calculaDistancia = (lat1, lng1, lat2, lng2) => {
    "use strict";
    var deg2rad = function (deg) { return deg * (Math.PI / 180); },
        R = 6371,
        dLat = deg2rad(lat2 - lat1),
        dLng = deg2rad(lng1 - lng2),
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(deg2rad(lat1))
            * Math.cos(deg2rad(lat1))
            * Math.sin(dLng / 2) * Math.sin(dLng / 2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return ((R * c *1000).toFixed());
};