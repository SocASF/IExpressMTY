/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Contexto "Global" para la Aplicación
@date 07/05/24 05:00PM
*/
import {createContext,useState,useEffect} from 'react';
import type {GlobalContext} from '../types/context';
import type {ReactNode} from 'react';

/** Definimos la Condición de Máximo de Anchura para la Verificación en Modo Móvil */
const condition: string = "(max-width:600px)";

/** Definición de la Instancia del Contexto con la Inicialización */
export const Context = (createContext<GlobalContext>({
    mobile: (window["matchMedia"](condition)["matches"]),
    language: "es"
}));

/** Definición del Proveedor del Contexto Actual */
export default function Provider({children}:{
    /** Definición del Hijo para el Proveedor del Contexto */
    children: ReactNode
}){
    const [current,set] = useState<boolean>(false);
    useEffect(() => {
        window["matchMedia"](condition)["addEventListener"]("change",(event => {
            event["preventDefault"]();
            set(event["matches"]);
        }));
    },[]);
    return (
        <Context.Provider value={{
            mobile: (current),
            language: "es"
        }}>
            {children}
        </Context.Provider>
    );
};