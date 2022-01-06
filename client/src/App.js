import React, { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";

// Redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path='/' element={<Landing />} exact></Route>
          </Routes>
          <section className='container'>
            <Alert />
            <Routes>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
