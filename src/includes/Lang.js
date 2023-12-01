export function t(tk) {
    let l = tk;//'error-numero';
    const txt = Liferay.Language.get(l);
    console.log(txt);
    return (txt);
}

export const translate = x => {
    console.log("Usando la función translate");
    let y = x.trim(); /*'Seguro_borrar'*/; 
    return Liferay.Language.get(y);
};