import React from 'react';
import {Route, Routes} from "react-router";
import {routes} from "@/components/layouts/DefaultLayout/DefaultLayoutRoutes/DefaultLayoutRoutes.constant";

const DefaultLayoutRoutes = () => {
    return (
            <Routes>
                {
                    routes.map(({ path, element }, index) => (
                        <Route path={path} element={element} key={index} />
                    ))
                }
            </Routes>
    );
};

export default DefaultLayoutRoutes;