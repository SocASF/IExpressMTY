/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Definición del Fetcher Global para la Comunicación con la API Global
@date 07/05/24 01:30AM
*/
import type {Application} from '../types/global';

/** Utilidad para la Comunicación con la API Global */
const Fetcher = async(): Promise<Application | string> => {
    const _f_ = (await fetch((import.meta.env.SCParamEnvDefineAPIPathConnect + "/global?context=application"),{
        mode: "cors",
        method: "get",
        cache: "force-cache",
        headers: {
            "X-CKeyApp-H": (import.meta.env.SCParamEnvDefineAPIApplicationID),
            "X-CLangApp-H": "es"
        }
    }));if(!(_f_["ok"]) || _f_["status"] != 200) return (_f_["statusText"] ?? "UnknownErrorFromAPIFetcher");
    else return ((await _f_["json"]())["rs"]["ob"][0] as Application);
};

export default Fetcher;