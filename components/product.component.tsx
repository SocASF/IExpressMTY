/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Componentes para la Vista de Productos de la Aplicación
@date 21/05/24 01:00AM
*/
import {Provider} from '../util/storage';
import {Context} from '../context/product.context';
import {useQuery} from '@apollo/client';
import {GraphQLProductPrice} from '../util/graphql';
import {useContext,Fragment} from 'react';
import {AddonProductInput,AddonProductResume,AddonProductMediaSelector} from './product.addon';
import {ProductMath} from '../util/dom';
import Loader from 'react-loading-skeleton';
import type {Response} from '../types/global';
import type {ReactNode} from 'react';

/** Componente con el Contenedor de las Vistas Previas de los Productos en la Aplicación */
export const ProductThumbnailContainer = ({thumbnail}:{
    /** Contenedor con las Ilustraciones del Producto Actual */
    thumbnail: any[]
}) => {
    const {option} = (useContext(Context));
    const images = (thumbnail["filter"](({name}) => (name == option["figure"])));
    return ("figure" in option) && (
        <div className="imgwidth">
            <img src={(images["length"] > 0) ? Provider(images[0]["key"],{format:"webp"}) : Provider("b0163fef-4bad-4a1a-9bc7-b4a2a2c5309b.webp",{},true)}/>
        </div>
    );
};

/** Componente con el Contenedor del Precio Base en el Constructor de la Aplicación */
export const ProductPriceContainer = ({language,productID,productName}:{
    /** Idioma Actual en el Contexto Global de la Aplicación */
    language: string,
    /** Identificador Único del Producto Actual en la Aplicación */
    productID: string,
    /** Nombre del Producto Actual para Mostrar en el Título */
    productName: string
}) => {
    const {input,multiply} = (useContext(Context));
    const current: {name:string,value:string}[] = [];
    (Object["values"](input)["forEach"]((k,i) => {
        const _identified_ = (Object["keys"](input)[i]);
        if(!(["iexgmShape","iexgmSize","iexgmModel","iexgmtInkPer"]["includes"](_identified_))) current["push"]({
            name: _identified_,
            value: k["value"]
        });
    }));
    const {loading,data} = (useQuery(GraphQLProductPrice,{
        context: {
            language
        },
        initialFetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
        variables: {
            context: {
                current,
                product: productID
            }
        }
    }));
    return (loading ? (
        <h3 className="center">
            <Loader width={200} count={1}/>
            <em>
                <Loader style={{position:"relative",marginTop:2}} width={100} count={1}/>
            </em>
        </h3>
    ) : (
        <h3 className="center">
            {productName}
            <em>
                <span>
                    $
                </span>
                {((data["sf826fc26"] as Response)["rs"]!["ob"][0]["price"] * multiply) * (("iexgmtInkPer" in input) ? Number(input["iexgmtInkPer"]["value"] == "75e735a9" ? 2 : 1) : 1)} MXN
            </em>
        </h3>
    ));
};

/** Prototipo Esencial para las Vistas de los Productos en el Constructor */
type ProtoViewProduct = {
    /** Objeto con la Información Esencial del Producto */
    product: any,
    /** Referencia al Idioma Actual en la Aplicación */
    language: string,
    /** Identificador Único del Producto Actual */
    identified: string,
    /** Contenedor con los Atributos Esenciales con los Variantes del Producto */
    constructor: any[]
};

/** Componente con la Vista Principal del Constructor en los Productos */
export const ProductViewMain = ({product,language,identified,constructor}:ProtoViewProduct) => {
    const {option,input,mutate,multiply} = (useContext(Context));
    return (
        <Fragment>
            <ProductPriceContainer productID={identified} productName={product["title"]} {...{language}}/>
            {constructor["slice"]()["sort"]((a,b) => a["priority"] - b["priority"])["map"]((k,i) => {
                let _additional_: ReactNode | null = null;
                if(k["extra"] && ("show" in option)) k["extra"]["forEach"]((o:any) => {
                    if(o["name"] == option["show"]) _additional_ = (<AddonProductInput {...{
                        label: o["label"],
                        item: o["value"],
                        name: o["name"]
                    }}/>);
                });return (
                    <Fragment key={i}>
                        <AddonProductInput {...{
                            label: k["label"],
                            item: k["value"],
                            name: k["name"]
                        }}/>
                        {_additional_}
                    </Fragment>
                );
            })}
            {("iexgmSize" in input) && (
                <Fragment>
                    {constructor["filter"](((o:any) => (o["name"] == "iexgmShape")))[0]["extra"]["map"]((k:any,i:number) => (
                        <AddonProductInput key={i} {...{
                            label: k["label"],
                            item: (k["value"]["filter"]((j:any) => (j["extra"]["figure"]["includes"](option["figure"])))["map"]((t:any) => ({
                                key: t["key"],
                                label: t["label"]
                            }))),
                            name: k["name"]
                        }}/>
                    ))}
                    <AddonProductInput {...{
                        label: "Cantidad",
                        item: (product["paper"]["map"]((o:any) => {
                            const _k_: number[] = ((constructor["filter"]((c:any) => (c["name"] == "iexgmShape"))[0]["extra"][0]["value"]["filter"]((s:any) => (s["key"] == input["iexgmSize"]["value"]))[0] ?? {label:"0cmx0cm"})["label"])["split"]("x")["map"]((s:string) => (Number(s["trim"]()[0])));
                            const _t_: number = (ProductMath({parent:(o["height"]),children:(_k_[0])}) * ProductMath({parent:(o["width"]),children:(_k_[1])}));
                            return ({
                                key: o["identified"],
                                label: `${_t_} piezas`,
                                extra: {
                                    count: _t_
                                }
                            });
                        })),
                        name: "iexgmtPiece"
                    }}/>
                </Fragment>
            )}
            {(product["allowPrintPerPage"]) && (
                <AddonProductInput {...{
                    label: "¿Impresión por Ambos Lados?",
                    name: "iexgmtInkPer",
                    item: [
                        {
                            key: "0805fd75",
                            label: "No"
                        },
                        {
                            key: "75e735a9",
                            label: "Si"
                        }
                    ]
                }}/>
            )}
            <div className="opciondesc">
                <strong>
                    Hojas
                </strong>
                <div className="cantidad">
                    <button onClick={() => mutate!({
                        action: "AC_INPUTH_MULTIPLY",
                        payload: "lower"
                    })}>
                        -
                    </button>
                    <span>
                        {multiply}
                    </span>
                    <button onClick={() => mutate!({
                        action: "AC_INPUTH_MULTIPLY",
                        payload: "upper"
                    })}>
                        +
                    </button>
                </div>
            </div>
            {("iexgmtMaterial" in input) && (
                <AddonProductResume productName={product["title"]}/>
            )}
        </Fragment>
    );
};

/** Componente con la Vista de los Medios del Paso 2 del Constructor en los Productos */
export const ProductViewMedia = ({product,language,identified,constructor}:ProtoViewProduct) => {
    const {input} = (useContext(Context));
    return (
        <Fragment>
            <ProductPriceContainer productID={identified} productName={product["title"]} {...{language}}/>
            <AddonProductMediaSelector />
        </Fragment>
    );
};