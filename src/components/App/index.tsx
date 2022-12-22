import {Route, Routes} from "react-router";
import Home from "@/pages/Home";
import Benches from "@/pages/Benches";
import BenchesModeration from "@/pages/BenchesModeration";
import CommonSidebar from "@/components/Common/CommonSidebar";
import CommonHeader from "@/components/Common/CommonHeader";

const App = () => {
    return (
        <>
            <CommonHeader />
            <div className={'d-f'}>
                <CommonSidebar />
                <Routes>
                    <Route path={''} element={ <Home /> } />
                    <Route path={'/benches'} element={ <Benches /> } />
                    <Route path={'/benches-moderation'} element={ <BenchesModeration /> } />
                </Routes>
            </div>
        </>

    )
}

export default App
