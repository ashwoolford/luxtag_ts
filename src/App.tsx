import React from 'react';
import './App.css';
import { Layout, Menu } from 'antd';
import TopNavBar from './components/TopNavBar';
import HomePage from './components/HomePage';
import About from './components/About';
import { HashRouter, Route } from "react-router-dom";

const App = () =>{
  return (
    
    <Layout style={{ minHeight: '100vh' }}>
      <HashRouter basename="/">
        <TopNavBar />
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={About}></Route>
      </HashRouter>
    </Layout>
  );
}

export default App;
