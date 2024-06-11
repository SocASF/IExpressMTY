/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Inicialización de la Aplicación
@date 07/05/24 02:00AM
*/
import 'aos/dist/aos.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom';
import {useEffect} from 'react';
import CategoryContext from './context/category.context';
import ProductContext from './context/product.context';
import Animator from 'aos';
import Context from './context/global.context';
import PageHome from './page';
import PagePolicy from './page/policy';
import PageCategory from './page/category';
import PageProduct from './page/product';
import PageContact from './page/contact';
import Error from './view/error';

/** Inicialización de la Aplicación en el DOM */
export default function Application(){
    useEffect(() => {
        Animator["init"]();
    },[]);
    return (
        <Context>
            <RouterProvider router={createBrowserRouter(
                createRoutesFromElements([
                    <Route errorElement={<Error />}>
                        <Route index element={
                            <PageHome />
                        }/>
                        <Route path="/category/:identified" element={
                            <CategoryContext>
                                <PageCategory />
                            </CategoryContext>
                        }/>
                        <Route path="/product/:identified" element={
                            <ProductContext>
                                <PageProduct />
                            </ProductContext>
                        }/>
                        <Route path="/policy" element={
                            <PagePolicy />
                        }/>
                        <Route path="/contact" element={
                            <PageContact />
                        }/>
                    </Route>
                ])
            )}/>
        </Context>
    );
};