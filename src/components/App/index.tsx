import {Route, Routes} from "react-router";
import BenchesModeration from "@/pages/BenchesModeration";
import DefaultLayout from "@/layouts/DefaultLayout";
import {ReactElement} from "react";
import Home from "@/pages/Home";
import Benches from "@/pages/Benches";

const App = (): ReactElement => {
    return (
        <>
            <DefaultLayout>
                <Routes>
                    <Route path={''} element={ <Home /> } />
                    <Route path={'/benches'} element={ <Benches /> } />
                    <Route path={'/benches-moderation'} element={ <BenchesModeration /> } />
                </Routes>
            </DefaultLayout>
        </>

    )
}

export default App
