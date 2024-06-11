/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Contexto "Global" para la Aplicación
@date 07/05/24 05:00PM
*/
import {createContext,useState,useEffect,useReducer} from 'react';
import type {GlobalContext} from '../types/context';
import type {ReactNode} from 'react';

/** Definimos la Condición de Máximo de Anchura para la Verificación en Modo Móvil */
const condition: string = "(max-width:1050px)";

/** Definición del Estado Inicial del Contexto */
const InitialState: GlobalContext = {
    mobile: (window["matchMedia"](condition)["matches"]),
    language: "es"
};

/** Definición de la Instancia del Contexto con la Inicialización */
export const Context = (createContext<GlobalContext>(InitialState));

/** Definición del Prototipo para la Acción del Reducedor */
export type GlobalAction = {
    /** Nombre del Accionador para la Activación de la Mutación del Estado */
    action: "",
    /** Información para la Definición  */
    payload: any
};

/** Definición del Reducedor para la Manipulación del Estado en el Contexto */
const Reducer = (state:GlobalContext,{action,payload}:GlobalAction) => {
    switch(action){
        default:
            return state;
    }
};

/** Definición del Proveedor del Contexto Actual */
export default function Provider({children}:{
    /** Definición del Hijo para el Proveedor del Contexto */
    children: ReactNode
}){
    const [current,set] = useState<boolean>((window["matchMedia"](condition)["matches"]));
    const [state,mutate] = (useReducer(Reducer,InitialState));
    useEffect(() => {
        window["matchMedia"](condition)["addEventListener"]("change",(event => {
            event["preventDefault"]();
            set(event["matches"]);
        }));
    },[]);
    return (
        <Context.Provider value={{...state,mobile:current,mutate}}>
            {children}
        </Context.Provider>
    );
};