/*
@author LxingA
@version 2.0.0
@project CodeInk
@description Integración de ViteJS en la Aplicación
@date 07/05/24 01:00AM
*/
import {defineConfig} from 'vite';
import {readFileSync} from 'fs';
import {join} from 'path';
import React from '@vitejs/plugin-react';

/** Configuración Esencial para ViteJS */
export default defineConfig({
    plugins: [
        React()
    ],
    server: {
        port: Number(readFileSync(join(__dirname,"./port.sc"),"utf8")),
        strictPort: true,
        hmr: {
            protocol: "ws"
        }
    },
    envPrefix: "SCParamEnv"
});