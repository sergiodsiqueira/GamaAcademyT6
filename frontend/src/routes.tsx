import {
    BrowserRouter,
    Route,
    Routes as RoutesDOM
} from "react-router-dom";

import Home from './pages/home/index'
import Contato from './pages/contato/index'

const Routes = function () {
    return (
        <BrowserRouter>
            <RoutesDOM>
                <Route path="/" element={<Home />} />
                <Route path="/contato" element={<Contato />} />
            </RoutesDOM>
        </BrowserRouter>
    )
}

export default Routes;