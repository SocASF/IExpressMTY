/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Complementos Esenciales para el Componente con la Cabecera de la Aplicación
@date 07/05/24 03:00AM
*/
import {GlobalSocialLinkContainer,GlobalNavigatorContainer} from './utils.component';
import {useContext} from 'react';
import {Link} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {GraphQLCategoryNavigator} from '../util/graphql';
import {Context} from '../context/global.context';
import Loader from 'react-loading-skeleton';
import Storage,{Provider} from '../util/storage';
import type {Application,Response} from '../types/global';
import type {ReactNode} from 'react';

/** Complemento con los Enlaces de Navegación y de las Redes Sociales de la Cabecera */
export const AddonLinkContainer = ({showNav}:{
    /** Mostrar el Contenedor de Navegación */
    showNav: boolean
}) => {
    return (
        <div className="redesinfo">
            {showNav && (
                <GlobalNavigatorContainer style="col1" item={[
                    {
                        label: "Contáctanos",
                        href: "/contact"
                    }
                ]}/>
            )}
            <GlobalSocialLinkContainer label/>
        </div>
    );
};

/** Complemento con el Contenedor con el Logo de la Aplicación */
export const AddonLogoContainer = () => {
    const {resource,name}: Application = (Storage["get"]("global"));
    return (
        <div className="alogo" title={name}>
            <Link to="/">
                <img alt={name} src={Provider(resource["filter"](({name}) => (name == "logo.webp"))[0]["key"])}/>
            </Link>
        </div>
    );
};

/** Complemento con el Contenedor del Menú Principal de la Aplicación */
export const AddonMainMenuContainer = ({children}:{
    /** Referencia al Hijo DOM para Mostrar en el Contenedor */
    children?: ReactNode
}) => {
    const {language} = (useContext(Context));
    const {loading,data} = (useQuery(GraphQLCategoryNavigator,{
        context: {
            language
        },
        variables: {
            perPage: 1,
            currentPage: 1
        },
        initialFetchPolicy: "cache-only"
    }));
    return loading ? (
        <center>
            <Loader height={40} width={500} count={1} style={{position:"relative",marginTop:5,marginBottom:5}}/>
        </center>
    ) : (
        <div className="mainmenu" id="sckel-btmm">
            <GlobalNavigatorContainer style="mainlinks" item={[
                {
                    label: "Categorías",
                    href: "#",
                    item: ((data["sa8292773"] as Response)["rs"]!["ob"] as any[])["map"](_k_ => ({
                        href: `/category/${_k_["name"]}`,
                        label: _k_["title"]
                    })) as any[]
                },
                {
                    label: "Política de Compra",
                    href: "/policy"
                }
            ]}/>
            {children}
            <GlobalNavigatorContainer style="userlinks" item={[
                {
                    icon: "search",
                    href: "/"
                },
                {
                    icon: "user",
                    href: "/"
                },
                {
                    icon: "shopping-bag",
                    href: "/"
                }
            ]}/>
        </div>
    );
};