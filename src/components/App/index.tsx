import {Route, Routes} from "react-router";
import BenchesModeration from "@/pages/BenchesModeration";
import DefaultLayout from "@/layouts/DefaultLayout";
import React, {ReactElement} from "react";
import Home from "@/pages/Home";
import Benches from "@/pages/Benches";
import {StyledListIcon} from "@/components/layouts/DefaultLayout/DefaultLayoutSidebar/DefaultLayoutSidebar.style";

const App = (): ReactElement => {
    return (
        <>
            <DefaultLayout>
                <Routes>
                    <Route path={''} element={ <Home /> } />
                    <Route path={'/benches'} element={ <Benches /> } />
                    <Route path={'/benches-moderation'} element={ <BenchesModeration /> }  />
                </Routes>
            </DefaultLayout>
        </>

    )
}

export default App
