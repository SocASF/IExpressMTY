/// <reference types="vite/client" />
interface ImportMetaEnv {
    /** Ruta Absoluta HTTP del Punto Final de la API Global */
    SCParamEnvDefineAPIPathConnect: string,
    /** Identificador Único (UUID) de la Aplicación para el Acceso a la API Global */
    SCParamEnvDefineAPIApplicationID: string,
    /** Clave Pública para la Instancia del Recaptcha para el Formulario de Contacto de la Aplicación */
    SCParamEnvDefineReCaptchaPublicSiteKey: string
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}