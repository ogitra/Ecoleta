import React from 'react';
import './App.module.css';

import { BrowserRouter, Route } from 'react-router-dom';
import CreatePoint from '../src/container/createPoint/createPoint';
import Home from '../src/container/home/home';

function App() {
  return (
    <BrowserRouter>
      <Route component={CreatePoint} path='/cadastro'></Route>
      <Route component={Home} path='/' exact></Route>
    </BrowserRouter>
  );
}

export default App;
