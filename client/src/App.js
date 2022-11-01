import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './bootstrap.min.css'

import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';

// redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './utils/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Landing />} />
          </Routes>
          <section className='container'>
            <Alert />
            <Routes>
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/login' element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route exact path='/dashboard' element={<Dashboard />} />
              </Route>
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
