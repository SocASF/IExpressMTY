/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Componentes Esenciales para el Píe de Página de la Aplicación
@date 08/05/24 10:30PM
*/
import {AddonLogoContainer} from './header.addon';
import {AddonScheduleContainer,AddonContactContainer} from './footer.addon';
import {Link} from 'react-router-dom';

/** Componente con el Contenedor del Píe de Página Global de la Aplicación */
export const GlobalFooterContainer = () => {
    return (
        <footer>
            <div className="col">
                <AddonLogoContainer />
                {([
                    {
                        label: "Políticas de Compra",
                        href: "/policy"
                    },
                    {
                        label: "Contacto",
                        href: "/contact"
                    }
                ] as {href:string,label:string}[])["map"](({href,label},_i_) => (
                    <Link key={_i_} to={href} onClick={_ => window["scrollTo"](0,0)}>
                        {label}
                    </Link>
                ))}
            </div>
            <AddonScheduleContainer />
            <AddonContactContainer />
        </footer>
    );
};