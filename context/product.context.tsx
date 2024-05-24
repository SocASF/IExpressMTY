/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Contexto "Producto" para la Aplicación
@date 19/05/24 09:00PM
*/
import {createContext,useReducer} from 'react';
import type {Dispatch,ReactNode} from 'react';

/** Prototipo para la Definición del Objeto con el Contexto de los Productos */
export type ProductContext = {
    /** Callback para la Mutación del Estado en el Contexto */
    mutate?: Dispatch<ProductAction>,
    /** Objeto con los Valores Iniciales de las Entradas en el Constructor */
    input: Record<string,({
        /** Valor Actual en la Entrada */
        value: string,
        /** Objeto con Información Extra para las Entradas */
        extra: any
    })>,
    /** Objeto con las Opciones Adicionales de las Entradas en el Constructor */
    option: Record<string,(any)>
};

/** Prototipo para la Definición del Objeto para el Payload del Reducedor */
export type ProductAction = {
    /** Identificador de la Acción */
    action: "AC_INPUTV_MUTATE" | "AC_INPUTV_INITIAL",
    /** Objeto con la Información para la Manipulación del Estado */
    payload: any
};

/** Definición del Estado Inicial para el Contexto */
export const InitialState: ProductContext = {
    input: {},
    option: {}
};

/** Definición del Contexto para los Productos de la Aplicación */
export const Context = (createContext<ProductContext>(InitialState));

/** Definición del Reducedor para la Mutación del Estado del Contexto */
const Reducer = (state:ProductContext,{action,payload}:ProductAction) => {
    let _mutated_: any;
    let _p_ = 0;
    switch(action){
        /** Instanciar el Estado Inicial de los Valores Predeterminados de las Entradas del Constructor */
        case "AC_INPUTV_INITIAL":
            _mutated_ = (state);
            (Object["values"](payload)["forEach"]((_obj_:any) => {
                let _k_ = (Object["keys"](_obj_["extra"])[0]);
                if(_obj_["extra"][_k_]["price"]) _p_ += _obj_["extra"][_k_]["price"];
                _mutated_["option"] = {
                    ..._mutated_["option"],
                    ..._obj_["extra"][_k_],
                    price: _p_
                };
            }));
            _mutated_["input"] = (payload);
            return ({
                ...state,
                ..._mutated_
            });
        /** Mutar el Estado Actual Mediante el Objeto Envíado por la Entrada de los Parámetros Esenciales */
        case "AC_INPUTV_MUTATE":
            _mutated_ = (state);
            _mutated_["input"][payload["name"]]["value"] = payload["identified"];
            
            payload["extra"]["price"] = _p_;
            _mutated_["option"] = {
                ..._mutated_["option"],
                ...payload["extra"]
            };
            return ({
                ...state,
                ..._mutated_
            });
        default:
            return state;
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