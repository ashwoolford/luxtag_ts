import React from 'react';
import './App.css';
import { Layout, Menu } from 'antd';
import TopNavBar from './components/TopNavBar';
import HomePage from './components/HomePage';
import About from './components/About';
import { HashRouter, Route } from "react-router-dom";
import DetailsForm from './components/DetailsPage/DetailsForm';
import AuthenticationPage from './components/AuthComponents/AuthenticationPage';

const App = () =>{
  return (
    
    <Layout style={{ minHeight: '100vh' }}>
      <HashRouter basename="/">
        <TopNavBar />
        <Route exact path="/" component={AuthenticationPage} />
        <Route path="/about" component={About}></Route>
        <Route path="/details-form" component={DetailsForm}></Route>
      </HashRouter>
    </Layout>
  );
}

export default App;
