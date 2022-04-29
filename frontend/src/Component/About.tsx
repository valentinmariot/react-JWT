import { Outlet, Route, Routes } from "react-router";
import Default from "./Default";
import SousL1 from "./SousL1";
import SousL2 from "./SousL2";


export default function About() {
    return (
        <div>
            About page
            <Outlet />
            <Routes>
            <Route index element={<Default/>}/>
                    <Route path='*' element={<About/>}/>
                    <Route path='sousl1' element={<SousL1/>}/>
                    <Route path='sousl2' element={<SousL2/>}/>
            </Routes>
        </div>
    )   
   }