/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Componentes para la Vista de las Categorías de la Aplicación
@date 13/05/24 06:00PM
*/
import {AddonNavigatorOption,AddonPaginatorContainer,AddonProductContainer} from './category.addon';
import {Context} from '../context/category.context';
import type {ProtoProductContainer} from './category.addon';

/** Componente con el Contenedor de las Barras de Navegación de la Vista de las Categorías */
export const CategoryNavigatorContainer = ({mode}:{
    /** Definir el Tipo de Modo para el Último Elemento */
    mode: "paginator" | "order"
}) => {
    return (
        <Context.Consumer>
            {({paginator:{perPage},orderBy}) => (
                <div className="nav">
                    <AddonNavigatorOption actionID="MA_UPGRADE_TELEMENTS" label="Cantidad a Mostrar" currentValue={perPage["toString"]()} item={[
                        {
                            label: "4",
                            value: 4["toString"]()
                        },
                        {
                            label: "8",
                            value: 8["toString"]()
                        },
                        {
                            label: "16",
                            value: 16["toString"]()
                        }
                    ]}/>
                    {(mode == "order") ? (
                        <AddonNavigatorOption actionID="MA_UPGRADE_ORDERBY" label="Ordenar Por" currentValue={orderBy} item={[
                            {
                                label: "Todo",
                                value: "b5eb17e1a772"
                            },
                            {
                                label: "Más Comprado",
                                value: "126fee836110"
                            },
                            {
                                label: "Precio Bajo a Alto",
                                value: "e8964d084549"
                            },
                            {
                                label: "Precio Alto a Bajo",
                                value: "7dacfe3bcd25"
                            },
                            {
                                label: "Más Nuevo",
                                value: "3f51cb4191f5"
                            }
                        ]}/>
                    ) : (
                        <AddonPaginatorContainer />
                    )}
                </div>
            )}
        </Context.Consumer>
    );
};

/** Componente para la Definición del Contenedor de los Productos Listados para la Aplicación */
export const CategoryProductContainer = ({item}:{
    /** Contenedor con los Productos a Renderizar en la Vista del Contenedor */
    item: ProtoProductContainer[]
}) => {
    return (
        <div className="maxwidth flexie">
            {item["map"]((_k_,_i_) => (
                <AddonProductContainer key={_i_} {..._k_}/>
            ))}
        </div>
    );
};