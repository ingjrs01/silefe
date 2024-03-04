import { Liferay } from '../common/services/liferay/liferay';

export const Errors = {
    1:Liferay.Language.get("Error_guardando"),
    2: Liferay.Language.get("Usuario no especificado"),
    4: Liferay.Language.get("Numero_trabajadores_incorrecto"),
    404: Liferay.Language.get("Elemento_no_encontrado"),
    405:"Los datos están mal",
    501: Liferay.Language.get("Campo requirido"),
    502: Liferay.Language.get("Campo multiidioma con algun idioma vacío"),
    600: Liferay.Language.get("Tipo documento no válido"),
    601: Liferay.Language.get("DNI_mal_contruído"),
    602: Liferay.Language.get("NIE_mal_contruído"),
    604: Liferay.Language.get("El tipo de documento es obligatorio"),
    1001: Liferay.Language.get("Fecha_mal_construída"),
    1002: Liferay.Language.get("Sexo no válido"),
    1003: Liferay.Language.get("Provincia no válida"),
    1004: Liferay.Language.get("Municipio no válido"),
    1005: Liferay.Language.get("Tipo de vía no válido"),
    1006: Liferay.Language.get("El correo no tiene un formato correcto"),
    1007: Liferay.Language.get("El teléfono no tiene formato correcto"),
    1008: Liferay.Language.get("El código postal no es válido"),
    1009: Liferay.Language.get("Hora no válida"),
    2001: Liferay.Language.get("No se pude modificar oferta cerrada"),
    2002: Liferay.Language.get("Accion con tipo de formacion no indicada"),
}