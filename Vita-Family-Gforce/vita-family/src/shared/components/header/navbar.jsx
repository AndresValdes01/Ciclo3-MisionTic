import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function NavbarSales() {

    const { user, isAuthenticated } = useAuth0();
    const { logout } = useAuth0();

    return (
        <nav id="navColor" className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid"> 
                <Link to = "/" className="nav-link"><img src="./logo2.png" width='60' alt="VitaFamily"/> </Link>                           
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">                        
                        <li className="nav-item navMain">
                            <Link to = "/gestionventas" className="nav-link" >Gestion de Ventas</Link>
                        </li>
                        <li className="nav-item navMain">
                            <Link to = "/productos" className="nav-link" >Gestion de Productos</Link>
                        </li>
                        <li className="nav-item navMain">
                            <Link to = "/usuarios" className="nav-link" >Gestion de Usuarios</Link>
                        </li>                                           
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>                    
                </div>                                                    
                 
                {isAuthenticated ? 
                    <button type="button" className="rounded-circle" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img id="circleLog" src={ user.picture } alt={ user.name } className="rounded-circle" title="User" /> 
                    </button> :
                    <button id="btnSinImagen" type="button" className="rounded-circle" data-bs-toggle="modal" 
                        data-bs-target="#exampleModal">U</button>     
                }                                                                                                     
                {isAuthenticated ? 
                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">                     
                            <div className="modal-header">
                                <img id="circleLog2" src={ user.picture } alt={ user.name } 
                                    className="rounded-circle" title="User" />                                
                            </div>
                            <div className="modal-body">
                                <h5 className="userEmail">{ user.name }</h5>
                                <h6 className="userEmail">{ user.email }</h6>
                            </div>
                            <div id="btnLogout" className="modal-footer">                                
                                <button type="button" className="btn btn-success" 
                                    onClick={() => logout({ returnTo: window.location.origin })}>
                                    Cerrar Sesion
                                </button>
                            </div>
                        </div>
                    </div>
                </div> : 
                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">                                              
                            <div id="btnLogout" className="modal-footer">                                
                                <button type="button" className="btn btn-success" 
                                    onClick={() => logout({ returnTo: window.location.origin })}>
                                    Iniciar Sesion
                                </button>
                            </div>
                        </div>
                    </div>
                </div> 
                }                            
            </div>
        </nav>
    )
}

export default NavbarSales;