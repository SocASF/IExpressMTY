/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Contexto "Categoría" para la Aplicación
@date 13/05/24 07:00PM
*/
import {createContext,useReducer} from 'react';
import {Parameter} from '../util/dom';
import type {ReactNode,Dispatch} from 'react';

/** Prototipo para la Definición del Objeto con el Contexto de las Categorías */
export type CategoryContext = {
    /** Callback para la Mutación del Estado */
    mutate?: Dispatch<CategoryAction>,
    /** Objeto con la Información de la Paginación de las Categorías */
    paginator: {
        /** Total de Productos a Mostrar en la Vista */
        perPage: number,
        /** Número de Vista Actual */
        currentPage: number,
        /** Objeto con el Total de Elementos del Contexto */
        total: {
            /** Total de Productos Obtenidas en la Base de Datos */
            element: number,
            /** Total de Páginas Definidas en la Base de Datos */
            page: number
        }
    },
    /** Orden de los Elementos Actual en el Contexto */
    orderBy: string
};

/** Prototipo para la Definición del Objeto para el Payload del Reducedor */
export type CategoryAction = {
    /** Identificador de la Acción */
    action: "MA_UPGRADE_TELEMENTS" | "MA_UPGRADE_ORDERBY" | "MA_UPGRADE_CPAGED" | "MA_SET_PAGINATOR",
    /** Objeto con la Información para la Manipulación del Estado */
    payload: any
};

/** Definición del Estado Inicial para el Contexto */
export const InitialState: CategoryContext = ({
    paginator: {
        perPage: Number(Parameter("telements") ?? 8),
        currentPage: Number(Parameter("cpaged") ?? 1),
        total: {
            element: 0,
            page: 0
        }
    },
    orderBy: (Parameter("orderby") ?? "b5eb17e1a772")
});

/** Definición del Contexto para las Catregorías de la Aplicación */
export const Context = (createContext<CategoryContext>(InitialState));

/** Definición del Reducedor para la Mutación del Estado del Contexto */
const Reducer = (state:CategoryContext,{action,payload}:CategoryAction) => {
    switch(action){
        /** Mutar el Estado del Total de Elementos (PerPage) del Contexto */
        case "MA_UPGRADE_TELEMENTS":
            state["paginator"]["perPage"] = payload;
            return ({
                ...state
            } as CategoryContext);
        /** Mutar el Estado de la Orden de Elementos (OrderBy) del Contexto */
        case "MA_UPGRADE_ORDERBY":
            return ({
                ...state,
                orderBy: payload
            } as CategoryContext);
        /** Mutar el Estado de la Página Currente (currentPage) del Contexto */
        case "MA_UPGRADE_CPAGED":
            state["paginator"]["currentPage"] = payload;
            return ({
                ...state
            } as CategoryContext);
        case "MA_SET_PAGINATOR":
            state["paginator"]["total"] = {
                ...state["paginator"]["total"],
                ...payload
            };
            return ({
                ...state
            } as CategoryContext);
        default:
            return (state);
    }
};

/** Definición del Proveedor para la Instancia del Contexto en la Aplicación */
export default function Provider({children}:{
    /** Referencia al Hijo DOM para el Renderizado en el Proveedor */
    children: ReactNode
}){
    const [state,mutate] = (useReducer(Reducer,InitialState));
    return (
        <Context.Provider value={{...state,mutate}}>
            {children}
        </Context.Provider>
    );
};