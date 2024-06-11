/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Definición de los Prototipos para los Contextos Generales de la Aplicación
@date 07/05/24 05:00PM
*/
import type {Dispatch} from 'react';
import type {GlobalAction} from '../context/global.context';

/** Prototipo para la Definición del Objeto del Contexto Global */
export type GlobalContext = {
    /** Indicar sí está en Modo Móvil o Inferior a W600px */
    mobile: boolean,
    /** Definición del Idioma Currente en la Aplicación */
    language: string,
    /** Handler para la Mutación del Estado en el Contexto */
    mutate?: Dispatch<GlobalAction>,
    /** Objeto con la Información para Mostrar la Noticia Global de la Aplicación */
    notice?: {
        /** Titulo a Mostrar en la Noticia Global */
        title: string,
        /** Mensaje a Mostrar en la Noticia Global */
        message: string
    }
};

/** Prototipo para la Definición del Objeto con el Contexto de GraphQL */
export type GraphQLContext = {
    /** Definir el Idioma Predeterminado en la Petición de GraphQL */
    language: string
};