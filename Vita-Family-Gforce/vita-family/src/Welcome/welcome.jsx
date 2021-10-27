import React from 'react';
import ('./css/style.css');

function welcome() {
    return (
        <div id="backcontent">
            <h5 id="title1Start">Seguimiento Control de ventas</h5>
            <h1>¡BIENVENIDOS A VITA FAMILY!</h1>
            <p className="aligntext padtop1">
                Binevenidos a nuestro sitio web, gracias por preferirnos, <br />
                aqui podra encontrar los modulos necesarios y las funcionalidades para que lleve un adecuado <br />
                control a las ventas realizadas en la empresa.                 
            </p>
            <p className="aligntext padTop">
                Aqui usted puede establecer, organizar y automatizar la información de la empresa, para mejorar la gestión <br />
                de los datos sobre el inventario y la facturación, donde el sistema incluirá todos los <br />
                elementos necesarios para realizar el proceso de manera eficaz y oportuna, que permita  <br />
                conocer datos exactos y coherentes.
            </p>
        </div>
    )
}

export default welcome
