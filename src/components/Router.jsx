import React from 'react';
    import {
        Route, Routes
      } from 'react-router-dom';
import Login from '../Pages/Login';
import Form from './Form';
import Home from './Home';
import Register from './Register';
function Router(props) {
    return (
        <Routes>
            <Route
            path="/"
            element={(<Login/>)}
            
            />
            <Route
            path="/form"
            element={(<Form/>)}
            />
            <Route
            path="/home"
            element={(<Home/>)}
            />

        </Routes>
    );
}

export default Router;