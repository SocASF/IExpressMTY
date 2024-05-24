/// <reference types="vite/client" />
interface ImportMetaEnv {
    /** Ruta Absoluta HTTP del Punto Final de la API Global */
    SCParamEnvDefineAPIPathConnect: string,
    /** Identificador Único (UUID) de la Aplicación para el Acceso a la API Global */
    SCParamEnvDefineAPIApplicationID: string
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}