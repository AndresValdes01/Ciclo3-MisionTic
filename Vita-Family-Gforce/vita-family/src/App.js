import React from "react";
import LoginPage from "./login/LoginPage";
import Navbar from "./shared/components/header/navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UsuariosPage from "./users/UsuariosPage";
import ProductPage from "./products/ProductPage";
import Welcome from "./Welcome/welcome";
import SalesPages from "./sales/SalesPages";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <Router>
      { isAuthenticated ? <Navbar/> : null }      
      <Route path="/" exact>
        { isAuthenticated ? <Welcome /> : <LoginPage></LoginPage> }        
      </Route>
      <Switch>              
        <Route path="/usuarios" exact>
          <UsuariosPage></UsuariosPage>
        </Route>
        <Route path="/productos" exact>
          <ProductPage></ProductPage>
        </Route>
        <Route path="/gestionventas" exact>          
          <SalesPages></SalesPages>
        </Route>        
      </Switch>
    </Router>
  );
}

export default App;
