import React from 'react';
import Home from './components/landing';
import Counter from './components/state'
import Properties from './components/properties'
import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <div>
    <Home />
    <Properties name ={"Farhan"} city={"Nagercoil"}/>
    <h1>Hello world</h1>
    <Counter/>
    </div>
  );
}

export default App;
