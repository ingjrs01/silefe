export function t(tk) {
    let l = tk;//'error-numero';
    //console.log("probando cosas");
    //console.log(tk);
    //console.log(l);
    //console.log(typeof tk);
    //console.log(typeof l);
    //console.log("ya está");
    const txt = Liferay.Language.get(l);
    console.log(txt);
    //console.log(Liferay.Language.get('error-texto'));
    return (txt);
}

export const translate = x => {
    console.log("Usando la función translate");
    let y = x.trim(); /*'Seguro_borrar'*/; 
    //console.log(test);
    //return test;
    return Liferay.Language.get(y);
};