/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Definición del SEO para la Aplicación
@date 09/05/24 01:30AM
*/
import {Helmet} from 'react-helmet';
import {Fragment} from 'react';
import type Prototype from '../types/seo';

/** Vista para la Inyección del SEO en la Cabecera HTML de la Aplicación */
export default function SEO({title,description,keywords,og,children}:Prototype){
    let keys: string = "";
    keywords?.forEach((k,i) => {
        if(i == (keywords["length"] - 1)) keys += k;
        else keys += k + ", ";
    });
    return (
        <Fragment>
            <Helmet>
                <title>
                    {title}
                </title>
                <meta property="og:title" content={title}/>
                {description && (
                    <meta name="description" content={description}/>
                )}
                {keywords && (
                    <meta name="keywords" content={keys}/>
                )}
                {og && (Object["keys"](og)["map"]((k,i) => (
                    <meta key={i} property={`og:${k}`} content={(Object["values"](og)[i])}/>
                )))}
            </Helmet>
            {children}
        </Fragment>
    );
};