import DefaultLayout from "@/layouts/DefaultLayout";
import React, {ReactElement} from "react";
import {Box} from "@mui/material";
import DefaultLayoutRoutes from "@/components/layouts/DefaultLayout/DefaultLayoutRoutes";

const App = (): ReactElement => {
    return (
        <Box sx={{ display: 'flex' }}>
            <DefaultLayout>
               <DefaultLayoutRoutes />
            </DefaultLayout>
        </Box>
    )
}

export default App
