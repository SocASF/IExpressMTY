/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Componentes Utiles para la Aplicación
@date 07/05/24 02:30AM
*/
import {AddonSocialLink,AddonNavigatorLink,AddonBannerContainer,AddonAdContainer} from './utils.addon';
import {useState,useContext} from 'react';
import {Context} from '../context/global.context';
import {useQuery} from '@apollo/client';
import {GraphQLCategoryBanner} from '../util/graphql';
import Loader from 'react-loading-skeleton';
import Storage from '../util/storage';
import type {Application,Response} from '../types/global';
import type {ProtoNavigatorLink,ProtoAdObject} from './utils.addon';

/** Componente con el Contenedor de los Enlaces de Navegación para la Aplicación */
export const GlobalNavigatorContainer = ({item,style}:{
    /** Contenedor con los Enlaces de Navegación */
    item: ProtoNavigatorLink[],
    /** Nombre de la Clase para la Definición del Estilo del Contenedor */
    style: string
}) => {
    return (
        <div className={style}>
            {item["map"]((_u_,_i_) => (
                <AddonNavigatorLink {..._u_} key={_i_}/>
            ))}
        </div>
    );
};

/** Componente con el Banner de Información Global para la Aplicación */
export const GlobalInformationContainer = ({message}:{
    /** Definición de un Mensaje a Mostrar en el Contenedor */
    message: string
}) => {
    return (
        <div className="miniannoucement">
            <p>
                {message}
            </p>
        </div>
    );
};

/** Componente con el Contenedor con los Enlaces de las Redes Sociales de la Aplicación */
export const GlobalSocialLinkContainer = ({label}:{
    /** Mostrar un Etiquetado de la Red Social Actual */
    label: boolean
}) => {
    const {telephone,social}: Application = (Storage["get"]("global"));
    const [message,setMessage] = useState<string>();
    return (
        <div className="col2">
            {(label && message) && (
                <span className="mini" id="sckel-label">
                    {message[0]["toUpperCase"]() + message["substring"](1)}
                </span>
            )}
            <AddonSocialLink callback={setMessage} to={`https://wa.me/52${telephone}`} type="_blank" icon="whatsapp"/>
            {social?.filter(({name}) => (["fb","fm"]["includes"](name))).map(({url,icon},_i_) => (
                <AddonSocialLink callback={setMessage} key={_i_} to={url} {...{icon}}/>
            ))}
        </div>
    );
};

/** Componente con el Contenedor con el Banner Global de la Aplicación */
export const GlobalBannerContainer = ({identified}:{
    /** Identificador Único de la Categoría */
    identified?: string
}) => {
    const {language} = (useContext(Context));
    const {loading,data} = (useQuery(GraphQLCategoryBanner,{
        context: {
            language
        },
        variables: {
            perPage: 1,
            currentPage: 1,
            identified
        },
        initialFetchPolicy: "cache-only"
    }));
    if(loading) return (
        <Loader count={1} height={500}/>
    );else{
        const _info_: any[] = (data["sa8292773"] as Response)["rs"]!["ob"];
        const _val_ = (_info_[(identified ? 0 : (Math["round"](Math["random"]() * (_info_["length"] - 1))))]);
        return (
            <header>
                <div className="sliderfull">
                    <AddonBannerContainer hideButton={typeof(identified) == "string"} {...{
                        title: _val_["title"],
                        message: _val_["description"],
                        background: _val_["color"],
                        cover: _val_["cover"],
                        identified: _val_["name"]
                    }}/>
            </div>
            </header>
        );
    }
};

/** Componente con el Mensaje de los Créditos de la Aplicación */
export const GlobalCreditsContainer = () => {
    const {identified,location,project,version}: Application = (Storage["get"]("global"));
    return (
        <div className="minicredits">
            <p>
                &copy; 2023 ~ {(new Date())["getFullYear"]()}「{identified}」en {location!["city"]} por {project} [{version}]
            </p>
        </div>
    );
};


/** Componente con el Contenedor de la Publicidad para la Aplicación */
export const GlobalAdContainer = ({item}:{
    /** Contenedor con los  */
    item: ProtoAdObject[]
}) => {
    return (
        <div className="sliderminibox">
            <div className="overflow">
                {item["map"]((_k_,_i_) => (
                    <AddonAdContainer {..._k_} key={_i_}/>
                ))}
            </div>
        </div>
    );
};

/** Componente con el Contenedor de Ayuda para la Aplicación */
export const GlobalHelpContainer = () => {
    return (
        <div className="sliderminibox question">
            <div className="maintitle">
                <h3>
                    ¿No encuentras lo que buscas?
                </h3>
            </div>
            <div className="context">
                <p>
                    Si no encuentras una medida, forma o material que necesites, puedes contactarnos y especificar indicaciones para formalizar una cotización más personalizada.
                </p>
            </div>
            <a className="line" style={{cursor:"pointer"}}>
                Solicitar Cotización
            </a>
        </div>
    );
};