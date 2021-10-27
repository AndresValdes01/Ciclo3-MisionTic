import React from "react";
import RegisterPage from "./register/RegisterPage";
import LoginPage from "./login/LoginPage";
import NavbarSales from "./shared/components/header/navbarSalesPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UsuariosPage from "./users/UsuariosPage";
import ProductPage from "./products/ProductPage";
import SalesPages from "./sales/SalesPages";
//import StatePages from "./states/StatePages";

function App() {
  return (
    <Router>
      <NavbarSales/>
      <Route path="/" exact>
        <LoginPage></LoginPage>
      </Route>
      <Switch>
        <Route path="/login" exact>
          <LoginPage></LoginPage>
        </Route>
        <Route path="/registro" exact>
          <RegisterPage></RegisterPage>
        </Route>
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
