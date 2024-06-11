/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Página Principal de la Aplicación
@date 07/05/24 02:00AM
*/
import {GlobalBannerContainer,GlobalAdContainer,GlobalHelpContainer,GlobalProductContainer} from '../components/utils.component';
import Template from '../view/default';

/** Página Principal de la Aplicación en el DOM */
export default function Home(){
    return (
        <Template strategy={{}}>
            <GlobalBannerContainer />
            <GlobalProductContainer />
            <GlobalAdContainer item={[
                {
                    title: "Pedidos Exprés",
                    message: "Recibe tu pedido en menos de 24 horas o hasta en 2 días hábiles máximo",
                    icon: "fast-mail"
                },
                {
                    title: "Compra 100% Segura",
                    message: "Tu compra con nosotros siempre será protegida",
                    icon: "transaction"
                },
                {
                    title: "Asesoría Completa",
                    message: "Resolvemos y te orientamos en cualquier duda que tengas",
                    icon: "smile-beam"
                }
            ]}/>
            <GlobalHelpContainer />
        </Template>
    );
};