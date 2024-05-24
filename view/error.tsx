/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Definición de la Vista para los Errores de la Aplicación
@date 09/05/24 01:30AM
*/
import {isRouteErrorResponse,useRouteError,Link} from 'react-router-dom';
import Storage from '../util/storage';
import Template from "./default";
import type {Application} from '../types/global';

/** Vista PRedeterminada para los Errores de la Aplicación */
export default function Error(){
    const {email}: Application = (Storage["get"]("global"));
    const Error = (useRouteError());
    let _content_ = {
        title: "Error Desconocido",
        message: "El servidor no pudo procesar lo solicitado",
        action: (
            <a className="line light" style={{cursor:"pointer"}} onClick={event => {
                event["preventDefault"]();
                window["open"](`mailto:${email}`,"_self");
            }}>
                Reportar Problema
            </a>
        )
    };
    if(isRouteErrorResponse(Error)) switch(Error["status"]){
        case 403:
            _content_["title"] = "Zona Prohíbida";
            _content_["message"] = "no estás autorizado para acceder a esta zona";
        break;
        case 404:
            _content_["title"] = "Página no Encontrada";
            _content_["message"] = "no pudimos encontrar la ruta deseada";
            _content_["action"] = (
                <Link className="line light" to="/">
                    Regresar a Inicio
                </Link>
            );
        break;
        case 500:
            _content_["title"] = "Error Interno";
            _content_["message"] = "no se pudo procesar su solicitud";
        break;
        case 503:
            _content_["title"] = "No Disponible";
            _content_["message"] = "el servidor no se encuentra disponible por el momento";
        break;
        default:
            _content_["title"] = Error["statusText"];
            _content_["message"] = Error["data"];
        break;
    }
    return (
        <Template strategy={{
            title: _content_["title"],
            description: _content_["message"]
        }}>
            <div className="error">
                <div className="ctxt">
                    <i className="uil uil-confused"></i>
                    <h3>
                        {_content_["title"]}
                    </h3>
                    <p>
                        {_content_["message"]}
                    </p>
                    {_content_["action"]}
                </div>
            </div>
        </Template>
    );
};