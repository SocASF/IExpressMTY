/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Plantilla Raíz de las Categorías para la Aplicación
@date 13/05/24 06:00PM
*/
import {Fragment,useContext} from 'react';
import {useParams,useSearchParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {GraphQLCategoryProduct} from '../util/graphql';
import {Context as CategoryContext} from '../context/category.context';
import {Context as GlobalContext} from '../context/global.context';
import {GlobalBannerContainer} from '../components/utils.component';
import {CategoryNavigatorContainer,CategoryProductContainer} from '../components/category.component';
import Loader from 'react-loading-skeleton';
import Template from '../view/default';
import type {ReactNode} from 'react';
import type {Response} from '../types/global';
import type {ChildrenSEO} from '../types/seo';

/** Prototipo con la Definición de los Parámetros Esenciales de la Vista */
type RouterParam = {
    /** Identificador Único de la Vista de la Categoría */
    identified: string
};

/** Componente con la Plantilla Predeterminada en Modo Cargador */
const TemplateLoader = ({mobile,children}:{
    /** Indicar sí está en Modo Móvil */
    mobile: boolean,
    /** Referencia al DOM Hijo para el Renderizado del Contenedor Raíz */
    children: ReactNode
}) => {
    /** Complemento con el Contenedor de la Barra de Navegación */
    const Navigator = () => {
        return (
            <div className="nav">
                <div className="options">
                    <Loader width={(mobile) ? 150 : 300} height={40} count={1}/>
                </div>
                <div className="options">
                    <Loader width={(mobile) ? 150 : 300} height={40} count={1}/>
                </div>
            </div>
        );
    };
    return (
        <Fragment>
            <Loader count={1} height={515}/>
            <Navigator />
            <div className="maxwidth flexie">
                {children}
            </div>
            <Navigator />
        </Fragment>
    );
};

/** Definición de la Plantilla Raíz de las Categorías para la Aplicación */
export default function Category(){
    const [query] = (useSearchParams());
    const {identified} = (useParams<RouterParam>());
    const {paginator:{perPage,currentPage},mutate} = (useContext(CategoryContext));
    const {language} = (useContext(GlobalContext));
    const {loading,data} = (useQuery(GraphQLCategoryProduct,{
        context: {
            language
        },
        initialFetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
        variables: {
            categoryID: identified,
            pagination: {
                perPage: Number(query["has"]("telements") ? query["get"]("telements") : perPage),
                currentPage: Number(currentPage)
            }
        },
        onCompleted(data){
            const {tt,pp} = (data["sb79e4c68"] as Response)["rs"]!;
            mutate!({
                action: "MA_SET_PAGINATOR",
                payload: {
                    element: tt,
                    page: pp
                }
            });
        }
    }));
    const preloadVendor: ReactNode[] = [];
    const Root = ({children,seo}:{
        /** Referencia al Hijo DOM para la Raíz de la Plantilla */
        children: ReactNode,
        /** Objeto con la Información del SEO para la Plantilla */
        seo?: ChildrenSEO
    }) => {
        return (
            <Template strategy={seo ?? {}}>
                <div className="wrapper">
                    {children}
                </div>
            </Template>
        );
    };for(let k = 0; k <= (perPage - 1); k++) preloadVendor["push"](
        <div className="producto" key={k}>
            <Loader height={482} count={1}/>
        </div>
    );
    if(loading) return (
        <Root>
            <GlobalContext.Consumer>
                {({mobile}) => (
                    <TemplateLoader {...{mobile}}>
                        {preloadVendor}
                    </TemplateLoader>
                )}
            </GlobalContext.Consumer>
        </Root>
    );else{
        const ProductList = (data["sb79e4c68"] as Response)["rs"]!["ob"];
        const CategoryInfo = (data["sa8292773"] as Response)["rs"]!["ob"][0];
        return (
            <Root seo={{
                title: CategoryInfo["title"],
                description: CategoryInfo["description"]
            }}>
                <GlobalBannerContainer {...{identified}}/>
                <CategoryNavigatorContainer mode="order"/>
                <CategoryProductContainer item={ProductList["map"](_k_ => ({
                    cover: _k_["image"]["filter"]((_u_:any) => _u_["name"] == "cover")[0]["key"],
                    title: _k_["title"],
                    identified: _k_["identified"]
                }))}/>
                <CategoryNavigatorContainer mode="paginator"/>
            </Root>
        );
    }
};