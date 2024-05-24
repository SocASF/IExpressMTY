/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Definición de los Prototipos para los Contextos Generales de la Aplicación
@date 07/05/24 05:00PM
*/

/** Prototipo para la Definición del Objeto del Contexto Global */
export type GlobalContext = {
    /** Indicar sí está en Modo Móvil o Inferior a W600px */
    mobile: boolean,
    /** Definición del Idioma Currente en la Aplicación */
    language: string
};

/** Prototipo para la Definición del Objeto con el Contexto de GraphQL */
export type GraphQLContext = {
    /** Definir el Idioma Predeterminado en la Petición de GraphQL */
    language: string
};