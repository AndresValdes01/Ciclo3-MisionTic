import React from "react";
import logo from "./logo.jpeg";
import "./estadoStyles.css";

function StatePages() {
  const Mensaje = () => {
    alert("Los datos de las ventas se han actuliazado correctamente");
  };
  return (
    <div className="Bestate">
      <img src={ logo } className="imagen" alt="VitaFamily"/>
      <h1 className="h1-state">Estado de ventas</h1>;
      <div className="pstate">
        <form className="fstate">
          <input type="search" id="Bucador" placeholder="Buscar"></input>
        </form>
      </div>
      <form className="fstate">
        <button type="submit" onClick={() => Mensaje()}>
          {" "}
          Guardar
        </button>
      </form>
      <div>
        <div id="formato_Principal">
          <table className="tb-state">
            <thead className="thad-state">
              <tr className="row-state">
                <th className="th-state">No</th>
                <th className="th-state">Total</th>
                <th className="th-state">Identificador</th>
                <th className="th-state">Cantidad</th>
                <th className="th-state">Precio Unitario</th>
                <th className="th-state">Fecha Venta</th>
                <th className="th-state">IdCliente</th>
                <th className="th-state">NombreCliente</th>
                <th className="th-state">Estado</th>
                <th className="th-state">Acción</th>
              </tr>
            </thead>
            <tr className="row-state">
              <td className="td-state">1</td>
              <td className="td-state">9000</td>
              <td className="td-state">V001</td>
              <td className="td-state">3</td>
              <td className="td-state">3000</td>
              <td className="td-state">24/09/2021</td>
              <td className="td-state">108957432</td>
              <td className="td-state">Andres Valdes</td>
              <td className="td-state">
                <select>
                  <option>En proceso</option>
                  <option>Cancelado</option>
                  <option>Entregado</option>
                </select>
              </td>
              <td className="td-state">
                <button> Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
            <tr className="row-state">
              <td className="td-state">2</td>
              <td className="td-state">9000</td>
              <td className="td-state">V002</td>
              <td className="td-state">3</td>
              <td className="td-state">3000</td>
              <td className="td-state">24/09/2021</td>
              <td className="td-state">108957432</td>
              <td className="td-state">Samuel Corso</td>
              <td className="td-state">
                <select>
                  <option>En proceso</option>
                  <option>Cancelado</option>
                  <option>Entregado</option>
                </select>
              </td>
	      <td className="td-state">
                <button> Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
            
            <tr className="row-state">
              <td className="td-state">3</td>
              <td className="td-state">9000</td>
              <td className="td-state">V003</td>
              <td className="td-state">3</td>
              <td className="td-state">3000</td>
              <td className="td-state">24/09/2021</td>
              <td className="td-state">108957432</td>
              <td className="td-state">Juan Rodriguez</td>
              <td className="td-state">
                <select>
                  <option>En proceso</option>
                  <option>Cancelado</option>
                  <option>Entregado</option>
                </select>
              </td>
              <td className="td-state">
                <button> Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StatePages;
