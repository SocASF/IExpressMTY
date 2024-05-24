/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Componentes para la Cabecera de la Aplicación
@date 07/05/24 03:00AM
*/
import {AddonLinkContainer,AddonLogoContainer,AddonMainMenuContainer} from './header.addon';
import {Context} from '../context/global.context';

/** Componente con la Cabecera Predeterminada de la Aplicación */
export const GlobalHeaderContainer = () => {
    return (
        <Context.Consumer>
            {({mobile}) => (
                <nav className={mobile ? "mobile" : "desktop"}>
                    {mobile ? (
                        <button type="button" className="btnmenu" onClick={event => {
                            event["preventDefault"]();
                            document["getElementById"]("sckel-btmm")?.classList.toggle("open");
                        }}>
                            <i className="uil uil-bars"></i>
                        </button>
                    ) : (
                        <AddonLinkContainer showNav/>
                    )}
                    <AddonLogoContainer />
                    <AddonMainMenuContainer>
                        {mobile && (
                            <AddonLinkContainer showNav={(!mobile)}/>
                        )}
                    </AddonMainMenuContainer>
                </nav>
            )}
        </Context.Consumer>
    );
};