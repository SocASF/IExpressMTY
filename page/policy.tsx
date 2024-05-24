/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Página para Mostrar la Política de la Aplicación
@date 10/05/24 05:00PM
*/
import {useContext} from 'react';
import {useQuery} from '@apollo/client';
import {GraphQLPolicy} from '../util/graphql';
import {Context} from '../context/global.context';
import {AddonPolicyContainer} from '../components/utils.addon';
import Loader from 'react-loading-skeleton';
import Template from '../view/default';
import type {Response} from '../types/global';
import type {ProtoPolicyObject} from '../components/utils.addon';

/** Página para las Políticas de la Aplicación */
export default function Policy(){
    const {language} = (useContext(Context));
    const {loading,data} = (useQuery(GraphQLPolicy,{context:{language},initialFetchPolicy:"network-only"}));
    return (
        <Template strategy={{
            title: "Políticas de la Aplicación"
        }}>
            <div className="blogctn">
                {loading ? (
                    <div>
                        <h3>
                            <Loader width={250} height={25} count={1}/>
                        </h3>
                        <Loader style={{position:"relative",marginTop:"20px"}} height={60} count={10}/>
                    </div>
                ) : (((data["af3bdaea"] as Response)["rs"]!)["ob"] as ProtoPolicyObject[])["map"](({title,rule},_i_) => (
                    <AddonPolicyContainer {...{title,rule}} key={_i_}/>
                ))}
            </div>
        </Template>
    );
};