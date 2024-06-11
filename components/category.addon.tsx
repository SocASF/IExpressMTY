/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Complementos Esenciales para los Componentes de las Categorías de la Aplicación
@date 13/05/24 10:00PM
*/
import {useContext,Fragment} from 'react';
import {useSearchParams,Link} from 'react-router-dom';
import {Context} from '../context/category.context';
import {Provider} from '../util/storage';
import type {CategoryAction} from '../context/category.context';

/** Complemento Esencial para la Definición de la Opción para la Navegación de las Categorías */
export const AddonNavigatorOption = ({label,item,currentValue,actionID}:{
    /** Etiqueta a Mostrar en la Opción */
    label: string,
    /** Contenedor con las Opciones Esenciales para el Selector */
    item: {
        /** Etiqueta a Mostrar en el Selector */
        label: string,
        /** Valor Definido para la Instancia  */
        value: string
    }[],
    /** Valor Actual en el Contexto para el Selector */
    currentValue: string,
    /** Identificador de la Variable para la Mutación */
    actionID: CategoryAction["action"]
}) => {
    const [,query] = (useSearchParams());
    const {mutate} = (useContext(Context));
    const _parameter_: string = (actionID["split"]("_")[2])["toLowerCase"]();
    return (
        <div className="options">
            <p>
                {label}
            </p>
            <select defaultValue={currentValue} onChange={event => {
                event["preventDefault"]();
                query(ctx => {
                    ctx["set"](_parameter_,(event["currentTarget"]["value"]));
                    return (
                        ctx
                    );
                });
                mutate!({
                    action: actionID,
                    payload: event["target"]["value"]
                });
            }}>
                {item["map"](({value,label},_i_) => (
                    <option key={_i_} {...{value}}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    );
};

/** Definición del Complemento con el Bóton de Acción para el Paginador */
export const AddonPaginatorButtonAction = ({icon,action}:{
    /** Nombre del Icono a Mostrar */
    icon: string,
    /** Acción a Realizar en la Mutación del Estado */
    action: string
}) => {
    const {mutate,paginator:{currentPage,total:{page}}} = (useContext(Context));
    return (
        <button onClick={event => {
            event["preventDefault"]();
            let _c_ = (currentPage);
            switch(action){
                case "++":
                    _c_ = page;
                break;
                case "+":
                    _c_++;
                break;
                case "-":
                    _c_--;
                break;
                case "--":
                    _c_ = 1;
                break;
            }mutate!({
                action: "MA_UPGRADE_CPAGED",
                payload: _c_
            });
        }}>
            <i className={`uil uil-${icon}`}></i>
        </button>
    );
};

/** Definición del Contenedor para la Paginación de la Vista del Contexto */
export const AddonPaginatorContainer = () => {
    const {paginator:{currentPage,total:{element},perPage}} = (useContext(Context));
    const condition = (element > perPage);
    return (
        <Fragment>
            <p>
                Mostrando {condition ? (perPage * currentPage) : element} de {element}
            </p>
            {condition && (
                <div className="pagination">
                    <AddonPaginatorButtonAction action="--" icon="angle-double-left"/>
                    <AddonPaginatorButtonAction action="-" icon="angle-left-b"/>
                    <AddonPaginatorButtonAction action="+" icon="angle-right-b"/>
                    <AddonPaginatorButtonAction action="++" icon="angle-double-right"/>
                </div>
            )}
        </Fragment>
    );
};

/** Definición del Prototipo para el Objeto del Producto para la Vista del Contexto */
export type ProtoProductContainer = {
    /** Identificador Único (UUID) de la Portada Ilustrativa del Producto */
    cover: string,
    /** Titulo del Producto para Ilustrarlo en el Contenedor */
    title: string,
    /** Identificador Único (UUID) del Producto en el Proyecto */
    identified: string
};

/** Definición del Contenedor de un Producto para la Vista del Contexto */
export const AddonProductContainer = ({cover,title,identified}:ProtoProductContainer) => {
    const _path_ = `/product/${identified}`;
    const _handler_ = () => {
        window["scrollTo"](0,0);
    };
    return (
        <div className="producto">
            <div className="imgcover">
                <img src={Provider(cover,{format:"webp"})}/>
            </div>
            <div className="infoproduct">
                <Link onClick={_handler_} className="white" to={_path_}>
                    {title}
                </Link>
                <Link onClick={_handler_} className="white line" to={_path_}>
                    Comprar Ahora
                </Link>
            </div>
        </div>
    );
};