import React from 'react'
import ReactDOM from 'react-dom/client'
import 'virtual:svg-icons-register'

import '@/styles/main.scss'
import {BrowserRouter} from "react-router-dom";
import App from "@/components/App";
import {QueryClient, QueryClientConfig, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {createTheme, ThemeProvider} from "@mui/material";

import MontserratRegular from '@/assets/fonts/Montserrat/Montserrat-Regular.ttf'

const theme = createTheme({
    typography: {
        fontFamily: 'Montserrat, Arial',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Montserrat'), local('Montserrat-Regular'), url(${MontserratRegular}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
        },
    },
});

const queryClientOptions: QueryClientConfig = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
        mutations: {
            retry: false
        }
    },
}

const queryClient = new QueryClient(queryClientOptions)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
)
