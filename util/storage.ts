/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Definición del Almacenamiento Local para la Aplicación
@date 07/05/24 01:30AM
*/
import type {Application} from '../types/global';

/** Utilidad para la Obtención del Punto Final para el Acceso a los Recursos de la Aplicación */
export const Provider = (name:string,external:boolean = false): string => {
    const {endpoint,token}: Application = (Local["get"]("global"));
    return external ? `${(endpoint["filter"](({name}) => (name == "global"))[0]["path"])["replace"]("cdn",("gb-" + import.meta.env.SCParamEnvDefineAPIApplicationID["split"]("-")[4]))}/${name}?v=${token}` : (`${endpoint["filter"](({name}) => (name == "resources"))[0]["path"]}/${name}?access_token=${token}`);
};

/** Definición del Almacenamiento Local de la Aplicación en el Contexto de Inicialización */
const Local = (new Map<string,(any)>());

export default Local;