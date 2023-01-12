import {Route, Routes} from "react-router";
import BenchesModeration from "@/pages/BenchesModeration";
import DefaultLayout from "@/layouts/DefaultLayout";
import React, {ReactElement} from "react";
import Home from "@/pages/Home";
import Benches from "@/pages/Benches";
import {StyledListIcon} from "@/components/layouts/DefaultLayout/DefaultLayoutSidebar/DefaultLayoutSidebar.style";
import CommentsModeration from "@/pages/CommentsModeration";
import Tags from "@/pages/Tags";

const App = (): ReactElement => {
    return (
        <>
            <DefaultLayout>
                <Routes>
                    <Route path={''} element={ <Home /> } />
                    <Route path={'/benches'} element={ <Benches /> } />
                    <Route path={'/benches-moderation'} element={ <BenchesModeration /> }  />
                    <Route path={'/comments-moderation'} element={ <CommentsModeration /> }  />
                    <Route path={'/tags'} element={ <Tags /> }  />
                </Routes>
            </DefaultLayout>
        </>

    )
}

export default App
