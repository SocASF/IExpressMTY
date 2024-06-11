/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Configuración Inicial de la Aplicación
@date 07/05/24 01:30AM
*/
import {createRoot} from 'react-dom/client';
import {StrictMode} from 'react';
import {ApolloProvider} from '@apollo/client';
import API from "./util/fetch";
import Application from './app';
import GraphQL from './bin/graphql';
import Element,{Loader,Type} from "./util/dom";
import Storage from './util/storage';
import type {Application as Prototype} from './types/global';

/** Comunicación con la API para la Obtención de la Información Global de la Aplicación */
API()["then"]($ => {
    if(typeof($) == "string") console["warn"]($);
    else{
        let _information_: Prototype = $;
        const _resource_: string[] = ["style.css","mobile.css","favicon.ico"];
        _information_["reCaptchaSiteKey"] = (import.meta.env.SCParamEnvDefineReCaptchaPublicSiteKey);
        Storage["set"]("global",(_information_));
        _information_["endpoint"]["filter"](({type}) => (typeof(type) == "string"))["forEach"](({name,type,path}) => Element({
            attribute: {
                id: ("sckep-" + name),
                rel: (Loader as any)[type!],
                href: path
            }
        }));
        _information_["resource"]["filter"](({name}) => (_resource_["includes"](name)))["forEach"](({name,mime,key},_i_) => {
            Element({
                attribute: {
                    id: ("sckel-" + (name["split"](".")[0])),
                    rel: (Type as any)[name["split"](".")[1]],
                    type: mime,
                    href: `${_information_["endpoint"]["filter"](({name}) => (name == "resources"))[0]["path"]}/${key}?access_token=${_information_["token"]}`
                }
            });(_i_ == (_resource_["length"] - 1)) && (createRoot(document["getElementById"]("root") as HTMLElement)["render"](
                <StrictMode>
                    <ApolloProvider client={GraphQL}>
                        <Application />
                    </ApolloProvider>
                </StrictMode>
            ));
        });
    }
})["catch"]($ => console["error"]($));