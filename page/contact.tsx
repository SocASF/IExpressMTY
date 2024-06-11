/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Vista para Mostrar el Formulario de Contacto de la Aplicación
@date 29/05/24 01:30PM
*/
import {AddonFormContactInput} from '../components/utils.addon';
import {useState,useContext,useEffect} from 'react';
import {useMutation} from '@apollo/client';
import {GraphQLMutationSenderMailer} from '../util/graphql';
import {Context as GlobalContext} from '../context/global.context';
import {Link} from 'react-router-dom';
import Storage from '../util/storage';
import Template from '../view/default';
import ReCAPTCHA from 'react-google-recaptcha';
import type {Application} from '../types/global';

/** Definición del Prototipo para el Estado de las Entradas de la Vista */
export type InputState = (
    Record<string,({
        /** Mensaje Descriptivo Respecto a Un Error en la Entrada */
        message?: string,
        /** Valor Pasivo de la Entrada */
        value?: string,
        /** Nombre de la Etiqueta a Ilustrar en la Entrada */
        label: string
    })>
);

/** Estado Inicial para las Entradas de la Vista */
const initialState: InputState = {
    ckinkputname: {
        label: "El nombre"
    },
    ckinkputemail: {
        label: "El correo"
    },
    ckinkputmessage: {
        label: "El mensaje"
    },
    ckinkputcaptcha: {
        label: "El reCaptcha"
    },
    ckinkputform: {
        label: "El formulario"
    },
    ckinkputissue: {
        label: "El asunto"
    }
};

/** Vista para la Visualización del Formulario de Contacto para la Aplicación */
export default function Contact(){
    const {social,telephone,reCaptchaSiteKey}: Application = (Storage["get"]("global"));
    const {language} = (useContext(GlobalContext));
    const [send,{loading,data}] = (useMutation(GraphQLMutationSenderMailer,{
        context: {
            language
        }
    }));
    const [current,setCurrent] = (useState<InputState>(initialState));
    const [completed,setCompleted] = (useState<boolean>(false));
    const _messages_: any[] = [];
    (Object["values"](current)["forEach"](({message,label},_i_) => {
        if(typeof message == "string") _messages_[_i_] = `${label} ${message}`;
        else delete _messages_[_i_]
    }));
    useEffect(() => {
        if(data){
            const _referer_ = (data["sac76de82"]);
            if(!_referer_["state"]) ((!current["ckinkputform"]["message"]) && setCurrent(older => {
                let _currented_ = (older["ckinkputform"]);
                _currented_["message"] = _referer_["message"];
                older["ckinkputform"] = _currented_;
                return ({...older});
            }));else{
                setCurrent(initialState);
                setCompleted(true);
            };
        }
    },[data]);
    return (
        <Template strategy={{
            title: "Contacto Público",
            description: "Formulario para el contacto directo con la dueña del negocio para cualquier cotización que el cliente pueda hacer, con gusto lo atenderemos por correo electrónico",
            keywords: ["formulario","contacto","correo electrónico","atención al cliente","cotización"]
        }}>
            {completed ? (
                <div className="error">
                    <div className="ctxt">
                        <i className="uil uil-smile"></i>
                        <h3>
                            Tu mensaje se envío con éxito
                        </h3>
                        <p>
                            En breve te responderemos. Muchas gracias por contactarnos
                        </p>
                        <Link className="line light" to="/">
                            Regresar a Inicio
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="contacto">
                    <form onSubmit={event => {
                        event["preventDefault"]();
                        const _values_: string[] = [];
                        const _objected_: any = {};
                        (Object["values"](current)["forEach"]((response,iterator) => {
                            let __: string = (Object["keys"](current)[iterator]);
                            if(typeof response["value"] == "string"){
                                _values_["push"](response["value"]);
                                _objected_[__] = encodeURIComponent(response["value"]);
                            };
                        }));
                        setCurrent((older => {
                            let _currented_ = (older["ckinkputform"]);
                            if(current["ckinkputcaptcha"]["value"]) _currented_["message"] = undefined;
                            else _currented_["message"] = "requiere el reCaptcha para continuar";
                            older["ckinkputform"] = _currented_;
                            return ({...older});
                        }));
                        if(current["ckinkputcaptcha"]["value"]) send({
                            variables: {
                                object: _objected_,
                                captchaKey: current["ckinkputcaptcha"]["value"]
                            }
                        });
                    }}>
                        <AddonFormContactInput {...{
                            placeholder: "Tema principal del contacto",
                            name: "ckinkputissue",
                            tag: "input",
                            label: "Asunto",
                            type: "text"
                        }} callback={setCurrent} disabled={loading}/>
                        <AddonFormContactInput {...{
                            placeholder: "Ingrese su nombre",
                            name: "ckinkputname",
                            tag: "input",
                            label: "Tu nombre",
                            type: "text"
                        }} callback={setCurrent} disabled={loading}/>
                        <AddonFormContactInput {...{
                            placeholder: "Ingrese su correo electrónico",
                            name: "ckinkputemail",
                            tag: "input",
                            label: "Tu correo de contacto",
                            type: "email"
                        }} callback={setCurrent} disabled={loading}/>
                        <AddonFormContactInput {...{
                            placeholder: "Ingrese un mensaje descriptivo de lo que quiera comunicarse con nosotros",
                            name: "ckinkputmessage",
                            tag: "textarea",
                           label: "Tu mensaje",
                            type: "text"
                        }} callback={setCurrent} disabled={loading}/>
                        {(_messages_["length"] > 0) && (
                            <div style={{position:"relative",marginTop:5}}>
                                <ul>
                                    {_messages_["map"]((_text_,_iterator_) => (
                                        <li key={_iterator_}>
                                            {_text_}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="catcha" style={{position:"relative",marginTop:10}}>
                            <ReCAPTCHA sitekey={reCaptchaSiteKey} onChange={token => (setCurrent((older => {
                                let _currented_ = older["ckinkputcaptcha"];
                                if(token){
                                    _currented_["message"] = undefined;
                                    _currented_["value"] = token;
                                }else{
                                    _currented_["message"] = "caducó. Favor de realizarlo nuevamente";
                                    _currented_["value"] = undefined;
                                }
                                older["ckinkputcaptcha"] = _currented_;
                                return ({...older});
                            })))}/>
                        </div>
                        <button className="full" type="submit" disabled={loading}>
                            {loading ? "Enviando" : "Enviar"}
                        </button>
                    </form>
                    <div className="mascontacto">
                        <h3>
                            Puedes contactarnos por una red social si así lo deseas
                        </h3>
                        {social!["map"](({icon,url,name},i) => {
                            if(name == "tt"){
                                icon = "whatsapp";
                                url = `https://api.whatsapp.com/send?phone=+52${telephone}&text=Hola!%20Me%20contacto%20desde%20el%20sitio%20web,%20%C2%BFme%20podr%C3%A1s%20ayudar?`;
                            }
                            let _label_ = icon["split"]("-")[0];
                            return (
                                <a key={i} className="full black" style={{cursor:"pointer"}} onClick={event => {
                                    event["preventDefault"]();
                                    window["open"](url,"_blank");
                                }}>
                                    <i className={`uil uil-${icon}`}></i>
                                    por {_label_[0]["toUpperCase"]()}{_label_["substring"](1)}
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}
        </Template>
    );
};