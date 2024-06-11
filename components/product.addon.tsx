/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Complementos Esenciales para el Componente de los Productos de la Aplicación
@date 21/05/24 01:00AM
*/
import {Context as ProductContext} from '../context/product.context';
import {useContext,useEffect,useState,Fragment} from 'react';
import {Provider} from '../util/storage';
import type {MutableRefObject,ChangeEvent} from 'react';

/** Prototipo para la Definición del Objeto para el Complemento con la Entrada del Constructor */
export type ProtoProductInput = {
    /** Etiqueta para la Ilustración del Título de la Entrada */
    label: string,
    /** Contenedor con los Valores Esenciales para Mostrar en la Entrada */
    item: {
        /** Identificador Único del Elemento del Valor para la Entrada */
        key: string,
        /** Etiqueta Visual a Mostrar en la Entrada para el Valor Actual */
        label: string,
        /** Indicar sí el Elemento del Valor cuenta con un Precio Establecido en el Proyecto */
        price?: number,
        /** Definición de Datos Adicionales para la Entrada en la Aplicación */
        extra?: any
    }[],
    /** Nombre de la Categoría Padre para la Entrada */
    name: string,
    /** Referencia al Callback para la Instancia de un Elemento DOM */
    referer?: MutableRefObject<HTMLSelectElement | undefined>
};

/** Complemento para la Definición de la Entrada para el Constructor de los Productos */
export const AddonProductInput = ({label,item,name,referer}:ProtoProductInput) => {
    return (
        <ProductContext.Consumer>
            {({mutate,input,option}) => (
                <div className="opciondesc">
                    <strong>
                        {label}
                    </strong>
                    <select id={name} ref={referer as any} onChange={event => {
                        event["preventDefault"]();
                        const _data_: any = (event["target"]["querySelector"](`option[value="${event["target"]["value"]}"]`)!)["getAttribute"]("data-extra");
                        mutate!({
                            action: "AC_INPUTV_MUTATE",
                            payload: {
                                name,
                                identified: event["target"]["value"],
                                extra: (JSON["parse"](_data_))
                            }
                        });
                    }} defaultValue={input[name]?.value}>
                        {item["map"](({label,key,extra},i) => (
                            <option data-extra={JSON["stringify"](extra ?? {})} key={i} value={key}>
                                {label}
                            </option>
                        ))}
                    </select>
                    {(name == "iexgmtMaterial" && option["message"]) && (
                        <p>
                            <i className="uil uil-question-circle"></i>
                            {option["message"]}
                        </p>
                    )}
                </div>
            )}
        </ProductContext.Consumer>
    );
};

/** Complemento Esencial para Mostrar el Contenedor con el Resumen de la Compra en un Producto */
export const AddonProductResume = ({productName}:{
    /** Nombre del Producto Actual en el Contexto */
    productName: string
}) => {
    const [label,setLabel] = (useState<Record<string,string>>());
    const {input,multiply} = (useContext(ProductContext));
    useEffect(() => {
        let objected: any = {};
        (document["querySelectorAll"]("select[id^='iexgm']"))["forEach"](el => {
            switch(el["id"]){
                case "iexgmtMaterial": case "iexgmtPiece":
                    let value = (input[el["id"]]["value"]);
                    let label: string = "";
                    if(value == "") label = (el["children"][0]["innerHTML"]);
                    else for(let x = 0; x <= (el["children"]["length"] - 1); x++) if((el["children"][x] as any)["value"] == value) label = (el["children"][x]["innerHTML"]);
                    objected[el["id"]] = (label);
                break;
            }
        });
        setLabel(objected);
    },[]);
    return (label) ? (
        <div className="infoCompra">
            <i className="uil uil-invoice"></i>
            <p>
                Estás comprando {multiply} {(multiply == 1) ? "hoja" : "hojas"}. Cada hoja tiene {label["iexgmtPiece"]}. En total son {Number(label["iexgmtPiece"]["split"](" ")[0]["trim"]()) * multiply} {productName["toLowerCase"]()} en {label["iexgmtMaterial"]["toLowerCase"]()}
            </p>
        </div>
    ) : (
        <div className="infoCompra">
            <i className="uil uil-invoice"></i>
            <p></p>
        </div>
    );
};

/** Complemento para Mostrar el Contenedor con el Selector de los Medios para el Producto en el Constructor */
export const AddonProductMediaSelector = () => {
    const {media} = (useContext(ProductContext));
    const mimes = [
        "image/png",
        "image/jpeg",
        "application/pdf",
        ".ai",
        ".psd",
        ".cdr"
    ];
    let accept: string = "";
    for(let y = 0; y <= (mimes["length"] - 1); y++) accept += mimes[y] + ",";
    const _handler_ = (event:ChangeEvent<HTMLInputElement>) => {
        event["preventDefault"]();
        const _f_: FileList = (event["target"]["files"]!);
        const _s_: File[] = [];
        if(_f_["length"] > 0 && _f_["length"] <= 4){
            for(let x = 0; x <= (_f_["length"] - 1); x++) if(_f_[x]["size"] <= 314572800) _s_["unshift"](_f_[x]);
            setMedia(_s_);
        }else setMedia([]);
    };
    return (
        <Fragment>
            <div className="subirdocumento">
                <input accept={accept["substring"](0,(accept["length"] - 1))} multiple onChange={_handler_} type="file"/>
                <div className="fileUpload">
                    <div className="ctn">
                        <i className="uil uil-cloud-upload"></i>
                        <p>
                            Haz click aquí para subir tus diseños
                        </p>
                    </div>
                </div>
            </div>
            {media["map"](({name,type},iterator) => {
                let _icon_: string = "";
                switch(type["split"]("/")[1]){
                    case "png": case "jpeg":
                        _icon_ = "eaf01b61-9438-4683-9e3e-a3e7ffa24e8a";
                    break;
                    case "pdf":
                        _icon_ = "53f569a0-d6b3-4f74-9e1a-f6ca60f49e35";
                    break;
                    default:
                        _icon_ = "4a62ac35-3ebb-42c5-a796-220419ac537a";
                    break;
                }
                return (
                    <div className="filesubido" key={iterator}>
                        <img className="type" src={Provider(_icon_ + ".webp",{},true)}/>
                        <div className="datosfile">
                            <div className="colm1">
                                <span className="name">
                                    {name}
                                </span>
                                <i>
                                    <b>
                                        1.0MB
                                    </b>
                                </i>
                            </div>
                            <div className="col2m">
                                {(_icon_ == "4a62ac35-3ebb-42c5-a796-220419ac537a") ? (
                                    <button className="circle" onClick={event => {
                                        event["preventDefault"]();
                                        
                                    }}>
                                        <i className="uil uil-info-circle"></i>
                                    </button>
                                ) : (
                                    <button className="circle">
                                        <i className="uil uil-image-search"></i>
                                    </button>
                                )}
                                <button className="circle" onClick={event => {
                                    event["preventDefault"]();
                                    setMedia(older => (older["splice"]((iterator - 1),1)));
                                }}>
                                    <i className="uil uil-times"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </Fragment>
    );
};