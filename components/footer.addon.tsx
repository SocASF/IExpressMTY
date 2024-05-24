/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Complementos Esenciales para el Componente con el Píe de Página de la Aplicación
@date 08/05/24 10:30PM
*/
import {GlobalSocialLinkContainer} from './utils.component';
import {useContext} from 'react';
import {useQuery} from '@apollo/client';
import {GraphQLSchedule} from '../util/graphql';
import {Context} from '../context/global.context';
import Loader from 'react-loading-skeleton';
import Storage from '../util/storage';
import type {Application,Response} from '../types/global';
import type {ReactNode} from 'react';

/** Definición del Tipo de los Horarios de la Aplicación */
export type ScheduleObject = {
    /** Nombre del Icono a Ilustrar en el Horario */
    icon: string,
    /** Título Descriptivo del Horario */
    title: string,
    /** Descripción Acerca del Propósito del Horario */
    description?: string,
    /** Objeto con los Rangos del Horario */
    range: {
        /** Contenedor con el Rango de las Horas para el Horario */
        hour: string[],
        /** Contenedor con el Rango de los Días para el Horario */
        day: string[]
    }
};

/** Complemento con el Contenedor de los Horarios de la Aplicación */
export const AddonScheduleContainer = () => {
    const {location}: Application = (Storage["get"]("global"));
    const {language} = (useContext(Context));
    const {loading,data} = (useQuery(GraphQLSchedule,{context:{language}}));
    const ScheduleText = () => {
        const Schedules: string[] = [];
        (((data["sf45d2f49"] as Response)["rs"]!)["ob"] as ScheduleObject[])["forEach"](({range:{day}}) => {
            Schedules[0] = day[0];
            Schedules[1] = day[1];
        });
        return (
            `${Schedules[0]} a ${Schedules[1]}`
        );
    };
    return (
        <div className="col2">
            {loading ? (
                <Loader height={30} />
            ) : (
                <p>
                    Horario de Servicio de <ScheduleText />. Servicio de atención únicamente por Chat/Línea. Somos de {location!["city"]}, {location!["state"]}.
                </p>
            )}
            <div className="info">
                {loading ? (
                    <Loader height={100}/>
                ) : (
                    (((data["sf45d2f49"] as Response)["rs"]!)["ob"] as ScheduleObject[])["map"](({icon,title,range:{hour,day}},_i_) => (
                        <AddonContactButtonContainer {...{icon}} key={_i_}>
                            <p>
                                <strong>
                                    {title}
                                </strong>
                                {day[0][0]}-{day[1][0]} de {hour[0]}:00 hasta {"la(s)"} {hour[1]}:00
                            </p>
                        </AddonContactButtonContainer>
                    ))
                )}
            </div>
            <p>
                Sólo realizamos entregas personales o a domicilio. Todas las entregas son previamente agendadas y confirmadas.
            </p>
        </div>
    );
};

/** Complemento con el Contenedor de la Información de Contacto de la Aplicación */
export const AddonContactContainer = () => {
    const {email}: Application = (Storage["get"]("global"));
    return (
        <div className="col2">
            <p>
                Cualquier duda, cotización puedes contactarnos por Correo ó Whatsapp.
            </p>
            <div className="info">
                <AddonContactButtonContainer icon="envelope">
                    <p>
                        <strong>
                            Correo Electrónico
                        </strong>
                        {email}
                    </p>
                </AddonContactButtonContainer>
                <AddonContactButtonContainer icon="comment-alt-heart">
                    <div className="redesinfo">
                        <strong>
                            Redes Sociales
                        </strong>
                        <GlobalSocialLinkContainer label={false}/>
                    </div>
                </AddonContactButtonContainer>
            </div>
        </div>
    );
};

/** Definición del Prototipo para el Contenedor de los Bótones de Contacto de la Aplicación */
export type ProtoContactButton = {
    /** Nombre del Icono a Aplicar en el Bóton */
    icon: string,
    /** Referencia al Hijo DOM para el Renderizado en el Bóton */
    children: ReactNode
};

/** Definición del Complemento para el Bóton del Contacto de la Aplicación */
export const AddonContactButtonContainer = ({icon,children}:ProtoContactButton) => {
    return (
        <div className="mn">
            <i className={`uil uil-${icon}`}></i>
            {children}
        </div>
    );
};