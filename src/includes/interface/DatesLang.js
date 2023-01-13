const Meses_es = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
];
const Meses_gl = [
    "Xaneiro",
    "Febreiro",
    "Marzo",
    "Abril",
    "Maio",
    "Xuño",
    "Xullo",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Decembro"
];
const Meses_en = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const Days_es = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
const Days_gl = ["Do", "Lu", "Ma", "Me", "Xo", "Ve", "Sa"];
const Days_en = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const getMonths = (lang) => {
    switch (lang) {
        case "en_US":
            return Meses_en;
        case "gl_ES":
            return Meses_gl;
        default: 
            return Meses_es;
    }
}

export const getDays = (lang) => {
    switch (lang) {
        case "en_US":
            return Days_en;
        case "gl_ES":
            return Days_gl;
        default: 
            return Days_es;
    }
}