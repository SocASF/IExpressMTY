/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Definición de los Esquemas GraphQL para la Aplicación
@date 08/05/24 08:30PM
*/
import {gql} from '@apollo/client';

/** Esquema para la Obtención de los Horarios Esenciales para la Aplicación */
export const GraphQLSchedule = (gql`
    query Schedule($key:String) {
        sf45d2f49(name:$key) {
            ...ResponseEssential
            rs {
                ...PaginationEssential
                ob {
                    icon
                    title
                    range {
                        hour
                        day
                    }
                }
            }
        }
    }
`);

/** Esquema para la Obtención de las Políticas Esenciales para la Aplicación */
export const GraphQLPolicy = (gql`
    query Policy($key:String) {
        af3bdaea(name:$key) {
            ...ResponseEssential
            rs {
                ...PaginationEssential
                ob {
                    title
                    rule
                }
            }
        }
    }
`);

/** Esquema para la Obtención Esencial de las Categorías para los Banner's de la Aplicación */
export const GraphQLCategoryBanner = (gql`
    query CategoryBanner($perPage:Int!,$currentPage:Int!,$identified:String) {
        sa8292773(perPage:$perPage,currentPage:$currentPage,name:$identified) {
            ...ResponseEssential
            rs {
                ...PaginationEssential
                ob {
                    ...CategoryEssential
                    cover
                    color
                    description
                }
            }
        }
    }
`);

/** Esquema para la Obtención de la Información Esencial de la Categoría para el Menú Principal de la Aplicación */
export const GraphQLCategoryNavigator = (gql`
    query CategoryNavigator($perPage:Int!,$currentPage:Int!,$identified:String) {
        sa8292773(perPage:$perPage,currentPage:$currentPage,name:$identified) {
            ...ResponseEssential
            rs {
                ...PaginationEssential
                ob {
                    ...CategoryEssential
                }
            }
        }
    }
`);

/** Esquema para la Obtención de los Productos Relacionados con la Categoría en la Aplicación */
export const GraphQLCategoryProduct = (gql`
    query CategoryProduct($key:String,$categoryID:String,$pagination:Paginator,$sortID:String) {
        sb79e4c68(id:$key,categoryID:$categoryID,pagination:$pagination,sort:$sortID) {
            ...ResponseEssential
            rs {
                ob {
                    ...ProductEssential
                }
                pp
                tt
            }
        }
        sa8292773(perPage:1,currentPage:1,name:$categoryID) {
            ...ResponseEssential
            rs {
                ...PaginationEssential
                ob {
                    title
                    description
                }
            }
        }
    }
`);

/** Esquema para la Obtención de Información de un Producto en Especifico para la Vista de los Productos en la Aplicación */
export const GraphQLProductInfo = (gql`
    query ProductInfo($key:String!) {
        sb79e4c68(id:$key) {
            ...ResponseEssential
            rs {
                ob {
                    ...ProductEssential
                    paper {
                        identified
                        height
                        width
                    }
                    allowPrintPerPage
                }
            }
        }
        s1b0ecf0b(productID:$key) {
            ...ResponseEssential
            rs {
                ob {
                    name
                    label
                    value {
                        ...ProductInputValue
                    }
                    extra {
                        name
                        label
                        value {
                            ...ProductInputValue
                        }
                    }
                    priority
                }
            }
        }
    }
`);

/** Esquema para la Definición del Precio Base del Producto en Base de los Parámetros Esenciales del Constructor en la Aplicación */
export const GraphQLProductPrice = (gql`
    query ProductPrice($context:sf826fc26Request!) {
        sf826fc26(currentContext:$context) {
            ...ResponseEssential
            rs {
                ob {
                    price
                }
            }
        }
    }
`);

/** Esquema para la Realización del Envío del Formulario de Contacto de la Aplicación */
export const GraphQLMutationSenderMailer = (gql`
    mutation SendContactInfo($object:JSON!,$captchaKey:String!) {
        sac76de82(body:$object,captchaKey:$captchaKey) {
            message
            state
        }
    }
`);

/** Esquema para la Obtención del Listado de los Productos de la Aplicación sin Categoría */
export const GraphQLProductListener = (gql`
    query ProductListener($paginator:Paginator) {
        sb79e4c68(pagination:$paginator) {
            ...ResponseEssential
            rs {
                ob {
                    ...ProductEssential
                }
            }
        }
    }
`);