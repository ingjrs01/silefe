import { Liferay } from './LiferayFunctions';

export function t(tk) {
    let l = tk;//'error-numero';
    const txt = Liferay.Language.get(l);
    return (txt);
}

export const translate = x => {
    let y = x.trim(); /*'Seguro_borrar'*/; 
    return Liferay.Language.get(y);
};