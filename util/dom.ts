/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Utilidad para la Creación de Elementos DOM en la Aplicación
@date 07/05/24 01:30AM
*/

/** Definición del Enumerador para los DOM de Tipo Cargador en la Aplicación */
export enum Loader {
    "3b2a06912804" = "preconnect",
    "fb7b8c789dd3" = "dns-prefetch"
};

/** Definición del Enumerador para el Tipo de Relación de un Elemento DOM en la Aplicación */
export enum Type {
    "ico" = "icon",
    "css" = "stylesheet"
};

/** Obtener el Valor de un Parámetro del Rutador Actual  */
export const Parameter = (query:string): string | null => {
    const _handler_ = (new URLSearchParams(document["location"]["search"]));
    return (_handler_["get"](query));
};

/** Utilidad para la Creación de Elementos DOM en la Aplicación */
const Element = ({
    attribute,
    type = "link",
    target = "head"
}:{
    /** Objeto con los Atributos para el Elemento DOM a Crear */
    attribute: Record<string,(any)>,
    /** Tipo de Elemento DOM a Crear en el DOM de la Aplicación */
    type?: (keyof HTMLElementTagNameMap),
    /** Contenedor para Inyectar el Nuevo Elemento DOM */
    target?: "head" | "body"
}) => {
    if(!(document["getElementById"](attribute["id"]))){
        let _l_ = (document["createElement"](type));
        Object["keys"](attribute)["forEach"]((_k_,_i_) => {
            (_l_ as any)[_k_] = (Object["values"](attribute)[_i_]);
        });
        document[target]["appendChild"](_l_);
    }
};

export default Element;