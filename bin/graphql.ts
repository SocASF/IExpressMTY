/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Integración de GraphQL para la Aplicación
@date 08/05/24 08:30PM
*/
import {ApolloClient,ApolloLink,InMemoryCache,HttpLink,gql,from} from '@apollo/client';
import {createFragmentRegistry} from '@apollo/client/cache';
import type {GraphQLContext} from '../types/context';

/** Instancia de GraphQL para la Aplicación */
const GraphQL = (new ApolloClient({
    cache: (new InMemoryCache({
        fragments: (createFragmentRegistry(gql`
            fragment ResponseEssential on Response {
                st
            }
            fragment PaginationEssential on Pagination {
                tt
                pp
            }
            fragment CategoryEssential on sa8292773O {
                title
                name
            }
            fragment ProductEssential on sb79e4c68O {
                image {
                    key
                    name
                    type
                }
                identified
                title
            }
            fragment ProductInputValue on s1b0ecf0bOValue {
                key
                label
                extra
            }
        `))
    })),
    link: from([
        (new ApolloLink((o,f) => {
            o["setContext"](({language}:GraphQLContext) => ({
                headers: {
                    "X-CKeyApp-H": (import.meta.env.SCParamEnvDefineAPIApplicationID),
                    "X-CLangApp-H": language
                }
            }));return (f(o));
        })),
        /**(createPersistedQueryLink({sha256,useGETForHashedQueries:true})["concat"]((new HttpLink({
            uri: (import.meta.env.SCParamEnvDefineAPIPathConnect + "/graphql"),
            useGETForQueries: true,
            includeUnusedVariables: false
        }))))*/
        (new HttpLink({
            uri: (import.meta.env.SCParamEnvDefineAPIPathConnect + "/graphql"),
            includeUnusedVariables: false
        }))
    ])
}));

export default GraphQL;