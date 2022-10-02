"use strict";
GetZodiac("...");
GetZodiac("99-13-2000");
GetZodiac("17-03-2000");
GetZodiac("25-04-2000");
GetZodiac("14-10-2000");
function GetZodiac(cadena) {
    if (cadena == null || cadena.charAt(2) != '-' || cadena.charAt(5) != '-' || cadena.length != 10) {
        console.log("Formato no es válido");
    }
    else {
        let mes = GetMonth(cadena);
        let dia = GetDay(cadena);
        if (mes < 0 || mes > 12 || dia < 0 || dia > 31) {
            console.log("No existe fecha");
        }
        else {
            switch (mes) {
                case 1:
                    if (dia <= 20) {
                        console.log("Capricornio");
                    }
                    else {
                        console.log("Acuario");
                    }
                    break;
                case 2:
                    if (dia <= 19) {
                        console.log("Acuario");
                    }
                    else {
                        console.log("Piscis");
                    }
                    break;
                case 3:
                    if (dia <= 20) {
                        console.log("Piscis");
                    }
                    else {
                        console.log("Aries");
                    }
                    break;
                case 4:
                    if (dia <= 21) {
                        console.log("Aires");
                    }
                    else {
                        console.log("Tauro");
                    }
                    break;
                case 5:
                    if (dia <= 22) {
                        console.log("Tauro");
                    }
                    else {
                        console.log("Geminis");
                    }
                    break;
                case 6:
                    if (dia <= 21) {
                        console.log("Geminis");
                    }
                    else {
                        console.log("Cancer");
                    }
                    break;
                case 7:
                    if (dia <= 22) {
                        console.log("Cancer");
                    }
                    else {
                        console.log("Leo");
                    }
                    break;
                case 8:
                    if (dia <= 23) {
                        console.log("Leo");
                    }
                    else {
                        console.log("Virgo");
                    }
                    break;
                case 9:
                    if (dia <= 24) {
                        console.log("Virgo");
                    }
                    else {
                        console.log("Libra");
                    }
                    break;
                case 10:
                    if (dia <= 24) {
                        console.log("Libra");
                    }
                    else {
                        console.log("Escorpio");
                    }
                    break;
                case 11:
                    if (dia <= 23) {
                        console.log("Escorpio");
                    }
                    else {
                        console.log("Sagitario");
                    }
                case 12:
                    if (dia <= 22) {
                        console.log("Sagitario");
                    }
                    else {
                        console.log("Capricornio");
                    }
                    break;
                default:
                    console.log("Error");
                    break;
            }
        }
    }
}
function GetDay(cadena) {
    let day = -1;
    if (cadena != null) {
        let date = cadena.trim().split('-');
        if (!isNaN(parseInt(date[0]))) {
            day = parseInt(date[0]);
        }
    }
    return day;
}
function GetMonth(cadena) {
    let month = -1;
    if (cadena != null) {
        let date = cadena.trim().split('-');
        if (!isNaN(parseInt(date[1]))) {
            month = parseInt(date[1]);
        }
    }
    return month;
}
//# sourceMappingURL=12_ejercicio.js.map