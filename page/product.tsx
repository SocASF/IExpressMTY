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
import {AddonProductInput} from '../components/product.addon';
import {ProductThumbnailContainer} from '../components/product.component';
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

/** Vista para la Visualización de los Productos en la Aplicación */
export default function Product(){
    const {identified} = (useParams<RouterParam>());
    const {language} = (useContext(GlobalContext));
    const {mutate,option} = (useContext(ProductContext));
    const {loading,data} = (useQuery(GraphQLProductInfo,{
        context: {
            language
        },
        initialFetchPolicy: "cache-only",
        variables: {
            key: identified
        },
        onCompleted(data){
            let _curr_ = (data["s1b0ecf0b"] as Response)["rs"]!["ob"];
            let _obj_: any = {};
            _curr_["forEach"](v => {
                _obj_[v["name"]] = {
                    value: (v["value"][0]["key"])
                };v["value"]["forEach"]((o:any) => {
                    _obj_[v["name"]] = {
                        ..._obj_[v["name"]],
                        extra: {
                            ..._obj_[v["name"]]["extra"],
                            [o["key"]]: o["extra"]
                        }
                    };
                });
            });
            mutate!({
                action: "AC_INPUTV_INITIAL",
                payload: _obj_
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
        return (
            <Root>
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
                                <h3 className="center">
                                    {ProductInfo["title"]}
                                    <em>
                                        <span>
                                            $
                                        </span>
                                        {option["price"]}
                                    </em>
                                </h3>
                                {ConstructorParams["map"]((k,i) => (
                                    <AddonProductInput key={i} {...{
                                        label: k["label"],
                                        item: k["value"],
                                        name: k["name"]
                                    }}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Root>
        );
    }
};