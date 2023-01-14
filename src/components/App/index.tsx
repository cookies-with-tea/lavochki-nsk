import {Route, Routes} from "react-router";
import BenchesModeration from "@/pages/BenchesModeration";
import DefaultLayout from "@/layouts/DefaultLayout";
import React, {ReactElement} from "react";
import Home from "@/pages/Home";
import Benches from "@/pages/Benches";
import Tags from "@/pages/Tags";
import CommonHeader from "@/components/layouts/DefaultLayout/DefaultLayoutHeader";
import CommonSidebar from "@/components/layouts/DefaultLayout/DefaultLayoutSidebar";
import {Box} from "@mui/material";
import ReportComments from "@/pages/ReportComments";
import Users from "@/pages/Users";

const App = (): ReactElement => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CommonSidebar />
            <DefaultLayout>
                <CommonHeader />

                <Routes>
                    <Route path={''} element={ <Home /> } />
                    <Route path={'/benches'} element={ <Benches /> } />
                    <Route path={'/benches-moderation'} element={ <BenchesModeration /> }  />
                    <Route path={'/report-comments'} element={ <ReportComments /> }  />
                    <Route path={'/tags'} element={ <Tags /> }  />
                    <Route path={'users'} element={<Users />} />
                </Routes>
            </DefaultLayout>
        </Box>
    )
}

export default App
