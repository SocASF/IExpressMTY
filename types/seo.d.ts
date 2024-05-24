/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Definición de los Prototipos para el SEO de la Aplicación
@date 10/05/24 01:15AM
*/
import type {ReactNode} from 'react';

/** Prototipo para el SEO Individual de las Vistas de la Aplicación */
export type ChildrenSEO = {
    /** Titulo Descriptivo Respecto a la Vista de la Aplicación */
    title?: SEO["title"],
    /** Descripción Acerca de la Vista de la Aplicación */
    description?: SEO["description"],
    /** Contenedor con las Palabras Claves de la Vista en la Aplicación */
    keywords?: SEO["keywords"],
    /** Objeto con la Información Adicional para el Open Graph de la Vista */
    og?: SEO["og"]
};

/** Prototipo para la Estructura del SEO de la Aplicación */
interface SEO {
    /** Titulo Descriptivo de la Vista Actual para el SEO */
    title: string,
    /** Descripción Acerca del Propósito de la Vista Actual para el SEO */
    description?: string,
    /** Contenedor con las Palabras Claves Orientado a la Estrategía para el SEO */
    keywords?: string[],
    /** Objeto con el SEO orientado a Open Graph de FB */
    og?: {
        /** Ruta Absoluta HTTP de la Vista Actual de la Aplicación */
        url?: string,
        /** Ruta Absoluta HTTP del Recurso (Imágen) de la Aplicación */
        image?: string,
        /** Ruta Absoluta HTTP del Recurso (Vídeo) de la Aplicación */
        video?: string,
        /** Nombre de la Marca de la Aplicación */
        site_name?: string,
        /** Tipo de Contenido Ilustrado para la Aplicación */
        type?: string,
        /** Descripción Acerca de la Vista de la Aplicación */
        description?: string
    },
    /** Referencia al Hijo DOM para el Contexto de React para el SEO en la Aplicación */
    children: ReactNode
};

export default SEO;