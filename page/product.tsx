/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Vista para Mostrar el Producto en Cuestión para la Aplicación
@date 19/05/24 09:00PM
*/
import {useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';
import {GraphQLProductInfo} from '../util/graphql';
import {Context as GlobalContext} from '../context/global.context';
import {Context as ProductContext} from '../context/product.context';
import {useContext} from 'react';
import {ProductThumbnailContainer,ProductViewMain,ProductViewMedia} from '../components/product.component';
import Loader from 'react-loading-skeleton';
import Template from '../view/default';
import type {ChildrenSEO} from '../types/seo';
import type {ReactNode} from 'react';
import type {Response} from '../types/global';

/** Prototipo con la Definición de los Parámetros Esenciales de la Vista */
type RouterParam = {
    /** Clave Único de Identificación (UUID) del Producto en la Aplicación */
    identified: string
};

/** Utilidad Esencial para la Definición del Objeto con la Entrada */
const ObjectDefinition = (i:any,r:any): void => {
    r[i["name"]] = {
        value: (i["value"][0]["key"])
    };
    if(i["name"] != "iexgmSize") i["value"]["forEach"]((o:any) => {
        r[i["name"]] = {
            ...r[i["name"]],
            extra: {
                ...r[i["name"]]["extra"],
                [o["key"]]: o["extra"]
            }
        };
    });
};

/** Vista para la Visualización de los Productos en la Aplicación */
export default function Product(){
    const {identified} = (useParams<RouterParam>());
    const {language} = (useContext(GlobalContext));
    const {mutate,option,view} = (useContext(ProductContext));
    const {loading,data} = (useQuery(GraphQLProductInfo,{
        context: {
            language
        },
        fetchPolicy: "cache-and-network",
        variables: {
            key: identified
        },
        onCompleted(data){
            let _curr_ = (data["s1b0ecf0b"] as Response)["rs"]!["ob"];
            let _obj_: any = {};
            let _inp_: any = {};
            _curr_["forEach"](v => {
                ObjectDefinition(v,_obj_);
                if(v["extra"]) v["extra"]["forEach"]((k:any) => (ObjectDefinition(k,_inp_)));
            });
            mutate!({
                action: "AC_INPUTV_INITIAL",
                payload: {
                    ..._obj_,
                    ..._inp_
                }
            });
        }
    }));
    const Root = ({children,seo}:{
        /** Objeto con la Información de la Definición del SEO en la Vista */
        seo?: ChildrenSEO,
        /** Referencia al Hijo DOM para el Renderizado en el Componente Root */
        children: ReactNode
    }) => {
        return (
            <Template strategy={seo ?? {}}>
                {children}
            </Template>
        );
    };
    if(loading) return (
        <Root>
            <div className="Constructor">
                <div className="flexie">
                    <div className="col1">
                        <Loader count={1} height={768}/>
                    </div>
                    <div className="colw">
                        <div className="Infoproducto">
                            <h3 className="center">
                                <Loader count={1} width={350} height={90}/>
                            </h3>
                            <div className="opciondesc">
                                <Loader count={1} height={15} width={125}/>
                                <Loader count={1} height={40}/>
                            </div>
                            <div className="opciondesc">
                                <Loader count={1} height={15} width={125}/>
                                <Loader count={1} height={40}/>
                            </div>
                            <div className="opciondesc">
                                <Loader count={1} height={15} width={125}/>
                                <Loader count={1} height={40}/>
                            </div>
                            <div className="opciondesc">
                                <Loader count={1} height={15} width={125}/>
                                <Loader count={1} height={40}/>
                            </div>
                            <div>
                                <Loader count={1} height={80}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Root>
    );else{
        const ProductInfo = (data["sb79e4c68"] as Response)["rs"]!["ob"][0];
        const ConstructorParams = (data["s1b0ecf0b"] as Response)["rs"]!["ob"];
        const ViewObject: any = {
            product: ProductInfo,
            constructor: ConstructorParams,
            language,
            identified
        };
        return (
            <Root seo={{
                title: ProductInfo["title"]
            }}>
                <div className="Constructor">
                    <div className="flexie">
                        <div className="col1">
                            {option["figure"] ? (
                                <ProductThumbnailContainer thumbnail={ProductInfo["image"]}/>
                            ) : (
                                <Loader count={1} height={768}/>
                            )}
                        </div>
                        <div className="colw">
                            <div className="Infoproducto">
                                {(view == 1) ? (
                                    <ProductViewMain {...ViewObject}/>
                                ) : (view == 2) ? (
                                    <ProductViewMedia {...ViewObject}/>
                                ) : (view == 3) && (
                                    <p>HOla Mundo 3</p>
                                )}
                                <div className="flexie" style={{position:"relative",marginBottom:20}}>
                                    <button className="full" onClick={event => {
                                        event["preventDefault"]();
                                        mutate!({
                                            action: "AC_DEFVIEWCURR_SET",
                                            payload: "upper"
                                        });
                                    }}>
                                        Siguiente Paso
                                    </button>
                                    <button className="line" onClick={event => {
                                        event["preventDefault"]();
                                        mutate!({
                                            action: "AC_DEFVIEWCURR_SET",
                                            payload: "lower"
                                        });
                                    }} style={(view <= 1) ? {pointerEvents:"none"} : {}} disabled={view <= 1}>
                                        Retroceder Paso
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Root>
        );
    }
};