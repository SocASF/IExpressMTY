/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Complementos Esenciales para el Componente de los Productos de la Aplicación
@date 21/05/24 01:00AM
*/
import {Context} from '../context/product.context';

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
    name: string
};

/** Complemento para la Definición de la Entrada para el Constructor de los Productos */
export const AddonProductInput = ({label,item,name}:ProtoProductInput) => {
    return (
        <Context.Consumer>
            {({mutate,input,option}) => (
                <div className="opciondesc">
                    <strong>
                        {label}
                    </strong>
                    <select onChange={event => {
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
                    }} defaultValue={input[name]?.value} value={input[name]?.value}>
                        {item["map"](({label,key},i) => (
                            <option data-extra={JSON["stringify"](input[name]?.extra[key])} key={i} value={key}>
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
        </Context.Consumer>
    );
};