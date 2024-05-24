/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Plantilla Predeterminada para la Aplicación
@date 07/05/24 02:30AM
*/
import {GlobalInformationContainer,GlobalCreditsContainer} from '../components/utils.component';
import {GlobalHeaderContainer} from '../components/header.component';
import {GlobalFooterContainer} from '../components/footer.component';
import Storage from '../util/storage';
import SEO from './seo';
import type {Application} from '../types/global';
import type {ChildrenSEO} from '../types/seo';
import type {ReactNode} from 'react';

/** Plantilla Predeterminada para la Aplicación */
export default function Default({children,strategy}:{
    /** Referencia al Hijo DOM para la Renderización de la Vista */
    children: ReactNode,
    /** Definición del Titulo para Definir en la Pestaña de la Aplicación */
    strategy: ChildrenSEO
}){
    const {slogan,name,project,keywords,description}: Application = (Storage["get"]("global"));
    return (
        <SEO {...{
            title: `${(strategy["title"] ?? slogan)} - ${name} [${project}]`,
            keywords: strategy["keywords"] ?? keywords,
            description: strategy["description"] ?? description,
            og: {
                site_name: strategy["og"]?.site_name ?? project,
                description: strategy["description"] ?? description,
                ...strategy["og"]
            }
        }}>
            <div className="mainwrap">
                <GlobalInformationContainer message="Envío gratis a partir de compras superiores a $2,000.00MXN"/>
                <GlobalHeaderContainer />
                {children}
                <GlobalFooterContainer />
                <GlobalCreditsContainer />
            </div>
        </SEO>
    );
};