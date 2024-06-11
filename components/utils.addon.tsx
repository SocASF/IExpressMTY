/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Complementos Esenciales para el Componente con las Utilidades de la Aplicación
@date 07/05/24 03:00AM
*/
import {useRef,useEffect,useState,Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Provider} from '../util/storage';
import type {InputState} from '../page/contact';
import type {Dispatch,SetStateAction,ReactNode,HTMLInputTypeAttribute,ChangeEvent} from 'react';

/** Complemento con el Bóton de la Red Social */
export const AddonSocialLink = ({to,type = "_blank",icon,callback}:{
    /** Ruta Absoluta HTTP del Enlace a Apuntar en la Red Social */
    to: string,
    /** Tipo de Salida en la Ejecución del Enlace de la Red Social */
    type?: "_self" | "_blank",
    /** Nombre del Icono a Mostrar en el Enlace de la Red Social */
    icon: string,
    /** Función de Referencia para la Mutación del Mensaje en el Etiquetador */
    callback: Dispatch<SetStateAction<string | undefined>>
}) => {
    return (
        <a style={{cursor:"pointer"}} onMouseOut={event => {
            event["preventDefault"]();
            callback(undefined);
        }} onMouseOver={event => {
            event["preventDefault"]();
            callback(icon["split"]("-")[0]);
        }} onClick={event => {
            event["preventDefault"]();
            window["open"](to,type);
        }}>
            <i className={`uil uil-${icon}`}></i>
        </a>
    );
};

/** Definición del Prototipo para los Enlaces de la Navegación de la Cabecera */
export type ProtoNavigatorLink = {
    /** Ruta Relativa a la Navegación Local */
    href: string,
    /** Etiqueta a Mostrar en el Enlace */
    label?: string,
    /** Nombre del Icono a Mostrar en el Enlace */
    icon?: string,
    /** Contenedor con los Enlaces para el Submenú */
    item?: {
        /** Ruta Relativa del Enlace para el Submenú */
        href: string,
        /** Nombre de la Etiqueta del Enlace para el Submenú */
        label: string
    }[]
};

/** Complemento con el Enlace de Navegación para la Cabecera */
export const AddonNavigatorLink = ({href,label,icon,item}:ProtoNavigatorLink) => {
    const [show,setShow] = (useState<boolean>(false));
    return (href == "#") ? (
        <div className="morelinks">
            <a style={{cursor:"pointer"}} onClick={event => {
                event["preventDefault"]();
                setShow(!show);
            }}>
                {label && label}
                {icon && (
                    <i className={`uil uil-${icon}`}></i>
                )}
            </a>
            {show && (
                <div className="sublinks">
                    {item!["map"](({href,label},_i_) => (
                        <Link to={href} key={_i_}>
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    ) : (
        <Link to={href}>
            {label && label}
            {icon && (
                <i className={`uil uil-${icon}`}></i>
            )}
        </Link>
    );
};

/** Definición del Prototipo para los Banners Globales de la Aplicación */
export type ProtoBannerObject = {
    /** Título Descriptivo de la Categoría en el Banner */
    title: string,
    /** Definición de un Mensaje Descriptivo de la Categoría en el Banner */
    message?: string,
    /** Identificador Único (UUID) de la Portada Ilustrativo de la Categoría en el Banner */
    cover: string,
    /** Color de Fondo en Hexadecimal de la Categoría para el Banner */
    background: string,
    /** Identificador Único de la Categoría para el Enlace de Acción del Banner */
    identified: string,
    /** Ocultar el Bóton de Acción */
    hideButton: boolean
};

/** Complemento con la Definición del Contenedor para los Banners Globales de la Aplicación */
export const AddonBannerContainer = ({title,message,cover,background,identified,hideButton}:ProtoBannerObject) => {
    const container = (useRef<HTMLDivElement>(null));
    useEffect(() => {
        if(container["current"]) container["current"]["parentElement"]!["parentElement"]!["style"]["background"] = background;
    },[]);
    return (
        <div className="slider" ref={container}>
            <div className="ctn">
                <div className="info">
                    <h3>
                        {title}
                    </h3>
                    {message && (
                        <p>
                            {message}
                        </p>
                    )}
                    {!hideButton && (
                        <Link className="line white" to={`/category/${identified}`}>
                            Conocer Productos
                        </Link>
                    )}
                </div>
                <img src={Provider(cover,{format:"webp"})}/>
            </div>
        </div>
    );
};

/** Definición del Prototipo para los Contenedores de la Publicidad de la Aplicación */
export type ProtoAdObject = {
    /** Nombre del Icono a Ilustrar en la Publicidad */
    icon: string,
    /** Titulo Descriptivo de la Publicidad a Mostrar */
    title: string,
    /** Mensaje Descriptivo de la Publicidad a Mostrar */
    message: string
};

/** Complemento para la Definición del Contenedor de la Categoría a Definir en la Publicidad de la Aplicación */
export const AddonAdContainer = ({icon,title,message}:ProtoAdObject) => {
    return (
        <div className="boxie">
            <i className={`uil uil-${icon}`}></i>
            <h3>
                {title}
            </h3>
            <p>
                {message}
            </p>
        </div>
    );
};

/** Definición del Prototipo para el Contenedor de las Políticas de la Aplicación */
export type ProtoPolicyObject = {
    /** Fecha (ISO) de Vigencía en Vigor de la Política en la Aplicación */
    dateAt?: string,
    /** Título Descriptivo de la Política en la Aplicación */
    title: string,
    /** Descripción Acerca de la Política en la Aplicación */
    description?: string,
    /** Contenedor con las Reglas de la Política para su Renderizado en el DOM de la Aplicación */
    rule: string[]
};

/** Complemento para la Definición del Contenedor de las Políticas para la Aplicación */
export const AddonPolicyContainer = ({title,rule}:ProtoPolicyObject) => {
    return (
        <div>
            <h3>
                {title}
            </h3>
            {rule["map"]((content,_i_) => (
                <p key={_i_} dangerouslySetInnerHTML={{
                    __html: content
                }}/>
            ))}
        </div>
    );
};

/** Definición del Prototipo para las Entradas del Formulario de Contacto de la Aplicación */
export type ProtoContactFormInput = {
    /** Etiqueta a Mostrar en la Entrada */
    label: string,
    /** Tipo de Etiqueta a Renderizar en la Entrada */
    tag: "input" | "textarea",
    /** Nombre Identificable de la Entrada */
    name: string,
    /** Texto a Mostrar Encima de la Entrada */
    placeholder: string,
    /** Tipo de Entrada a Renderizar en el Formulario */
    type: HTMLInputTypeAttribute,
    /** Contenedor con los Callback Esenciales para la Ejecución del Formulario */
    callback: Dispatch<SetStateAction<InputState>>,
    /** Indicador de Deshabilitar la Entrada en el Contexto Actual */
    disabled: boolean
};

/** Complemento para la Definición de las Entradas del Formulario de Contacto de la Aplicación */
export const AddonFormContactInput = ({label,tag,name,placeholder,type,callback,disabled}:ProtoContactFormInput) => {
    let _component_: ReactNode = null;
    let _regex_: Record<string,(RegExp)> = {
        email: /^[a-z0-9\.\-\_\!À-ÿ\u00f1\u00d1]+\@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/,
        text: /^(.*)$/,
        textarea: /^(.*)$/
    };
    const _onchange_ = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        event["preventDefault"]();
        callback(older => {
            let _currented_ = older[event["target"]["name"]];
            if(event["target"]["value"]["length"] == 0){
                _currented_["message"] = "es requerido";
                _currented_["value"] = undefined;
            }else if(!_regex_[event["target"]["type"]]["test"](event["target"]["value"])){
                _currented_["message"] = "no es válido";
                _currented_["value"] = undefined;
            }else if(event["target"]["value"]["length"] < event["target"]["minLength"]){
                _currented_["message"] = `es inferior a ${event["target"]["minLength"]} de longitud, favor de aumentarle más`;
                _currented_["value"] = undefined;
            }else if(event["target"]["value"]["length"] >= event["target"]["maxLength"]){
                _currented_["message"] = `es superior a ${event["target"]["maxLength"]} de longitud, favor de disminuirlo más`;
                _currented_["value"] = undefined;
            }else{
                _currented_["message"] = undefined;
                _currented_["value"] = (event["target"]["value"]);
            }
            older[event["target"]["name"]] = _currented_;
            return ({...older});
        });
    };switch(tag){
        case "input":
            _component_ = (
                <input onChange={_onchange_} minLength={2} maxLength={100} {...{placeholder,type,name,disabled}}/>
            );
        break;
        case "textarea":
            _component_ = (
                <textarea onChange={_onchange_} minLength={4} maxLength={300} style={{height:"200px"}} {...{placeholder,name,type,disabled}}/>
            );
        break;
    }return (
        <Fragment>
            <label htmlFor={name}>
                {label}
            </label>
            {_component_}
        </Fragment>
    );
};