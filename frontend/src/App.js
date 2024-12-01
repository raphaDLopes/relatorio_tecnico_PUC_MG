import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Menu from './components/menu.js';
import Login from './components/login/login.js';
import Home from './components/home.js';
import Atendido from './components/atendido/list.js';
import Voluntario from './components/voluntario/list.js';
import AgendaVoluntario from './components/agendaVoluntario/list.js';
import User from './components/user/list.js';
import PrivateRoute from './components/privateRoute.js';

const App = () => {
    return (
        <Router>
            <div>
                <Menu />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                    <Route path="/atendido/list" element={<PrivateRoute element={<Atendido />} />} />
                    <Route path="/voluntario/list" element={<PrivateRoute element={<Voluntario />} />} />
                    <Route path="/agendaVoluntario/list" element={<PrivateRoute element={<AgendaVoluntario />} />} />
                    <Route path="/user/list" element={<PrivateRoute element={<User />} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;