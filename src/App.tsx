import React, { useState } from "react";
import "./App.css";
import { Layout, Menu } from "antd";
import HomePage from "./components/HomePageComponents/HomePage";
import About from "./components/AboutPageComponents/About";
import { HashRouter, Route } from "react-router-dom";
import { AuthContext, TokenContext } from "./Context/UserContext";
import AuthenticationPage from "./components/AuthComponents/AuthenticationPage";
import ProtectedRoute from "./Routes/ProtectedRoute";

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <TokenContext.Provider value={{ token, setToken }}>
          <HashRouter basename="/">
            <Route exact path="/" component={AuthenticationPage} />
            <ProtectedRoute
              component={HomePage}
              isAuthenticated={isAuth}
              path="/home"
            />
            <ProtectedRoute
              component={About}
              isAuthenticated={isAuth}
              path="/about"
            />
          </HashRouter>
        </TokenContext.Provider>
      </AuthContext.Provider>
    </Layout>
  );
};

export default App;
