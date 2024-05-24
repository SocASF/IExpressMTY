/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Componentes para la Vista de Productos de la Aplicación
@date 21/05/24 01:00AM
*/
import {Provider} from '../util/storage';
import {Context} from '../context/product.context';

/** Componente con el Contenedor de las Vistas Previas de los Productos en la Aplicación */
export const ProductThumbnailContainer = ({thumbnail}:{
    /** Contenedor con las Ilustraciones del Producto Actual */
    thumbnail: any[]
}) => {
    return (
        <Context.Consumer>
            {({option}) => (
                <div className="imgwidth">
                    <img src={(option["figure"] ? Provider(thumbnail["filter"](({name}) => (name == option["figure"]))[0]["key"]) : Provider("b0163fef-4bad-4a1a-9bc7-b4a2a2c5309b.webp",true))}/>
                </div>
            )}
        </Context.Consumer>
    );
};