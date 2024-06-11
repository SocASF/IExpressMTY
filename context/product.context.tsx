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
    option: Record<string,(any)>,
    /** Cantidad de Hojas a Definir para el Producto */
    multiply: number,
    /** Precio Base del Producto en el Constructor */
    price: number,
    /** Definición del Renderizado de la Vista en los Pasos del Constructor */
    view: number,
    /** Contenedor con los Medios Establecidos por el Cliente como Adjuntos para el Producto */
    media: File[]
};

/** Prototipo para la Definición del Objeto para el Payload del Reducedor */
export type ProductAction = {
    /** Identificador de la Acción */
    action: "AC_INPUTV_MUTATE" | "AC_INPUTV_INITIAL" | "AC_INPUTH_MULTIPLY" | "AC_PRODPRICE_MUTATE" | "AC_DEFVIEWCURR_SET" | "AC_DEFMEDIA_SET",
    /** Objeto con la Información para la Manipulación del Estado */
    payload: any
};

/** Definición del Estado Inicial para el Contexto */
export const InitialState: ProductContext = {
    input: {
        iexgmtPiece: {
            value: "",
            extra: {}
        },
        iexgmtInkPer: {
            value: "0805fd75",
            extra: {}
        }
    },
    option: {},
    multiply: 1,
    price: 0,
    view: 1,
    media: []
};

/** Definición del Contexto para los Productos de la Aplicación */
export const Context = (createContext<ProductContext>(InitialState));

/** Definición del Reducedor para la Mutación del Estado del Contexto */
const Reducer = (state:ProductContext,{action,payload}:ProductAction) => {
    let _mutated_: any;
    switch(action){
        /** Instanciar el Estado Inicial de los Valores Predeterminados de las Entradas del Constructor */
        case "AC_INPUTV_INITIAL":
            _mutated_ = (InitialState);
            (Object["values"](payload)["filter"]((_k_) => (typeof(_k_) != "string"))["forEach"]((_obj_:any) => {
                let _e_ = ("extra" in _obj_) ? (_obj_["extra"][_obj_["value"]]) : {};
                if(("show" in (_e_ ?? {}))) _e_ = {};
                _mutated_["option"] = {
                    ..._mutated_["option"],
                    ..._e_
                };
            }));
            _mutated_["input"] = {..._mutated_["input"],...payload};
            return ({
                ...state,
                ..._mutated_
            });
        /** Mutar el Estado Actual Mediante el Objeto Envíado por la Entrada de los Parámetros Esenciales */
        case "AC_INPUTV_MUTATE":
            _mutated_ = (state);
            _mutated_["input"][payload["name"]]["value"] = payload["identified"];
            switch(payload["name"]){
                case "iexgmtMaterial":
                    if("show" in payload["extra"]) _mutated_["option"]["show"] = payload["extra"]["show"];
                    else delete _mutated_["option"]["show"];
                break;
            }_mutated_["option"] = {
                ..._mutated_["option"],
                ...payload["extra"]
            };
            return ({
                ...state,
                ..._mutated_
            });
        /** Mutar el Estado Actual para la Definición de la Cantidad de Hojas para el Producto */
        case "AC_INPUTH_MULTIPLY":
            let currentMultiply: number = state["multiply"];
            switch(payload){
                case "upper":
                    currentMultiply++;
                break;
                case "lower":
                    currentMultiply--;
                break;
            }if(currentMultiply <= 0) currentMultiply = 1;
            return ({
                ...state,
                multiply: currentMultiply
            });
        case "AC_PRODPRICE_MUTATE":
            return ({
                ...state,
                price: payload
            });
        case "AC_DEFVIEWCURR_SET":
            let currentedView: number = state["view"];
            switch(payload){
                case "upper":
                    currentedView++;
                break;
                case "lower":
                    currentedView--;
                break;
            }if(currentedView <= 0) currentedView = 1;
            else if(currentedView > 3) currentedView = 3; 
            return ({
                ...state,
                view: currentedView
            });
        /** Definir el Contenedor con la Media Definida por el Cliente */
        case "AC_DEFMEDIA_SET":
            
        break;
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