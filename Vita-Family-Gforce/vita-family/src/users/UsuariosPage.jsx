import React, {useState, useEffect} from 'react';
import logo from './logo.jpeg'
import './usuariosStyles.css'

  const UsuariosPage =() => {
    const [ formData, setFormData ] = useState({
      codigo: '',
      nombre: '',
      email: '',
      rol: '',
      estado: '',

    });
    const [ usuarios, setUsuarios ] = useState([]);
    const [ update, setUpdate ] = useState( false );

    const { codigo, nombre,email,rol, estado } = formData;

    useEffect( () => {

      const getDataAPI = async () => {
          const response = await fetch( `https://vitafamilyfrontend.herokuapp.com/api/usuarios`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json;charset=utf-8'
              }
          });
          const data = await response.json();

            console.log( data );
            setUsuarios( data.usuarios );         // Establece nuevo estado de usuarios
        }

        getDataAPI();

    }, [ update ] );

    const createUsuario = async ( usuario ) => {
      const response = await fetch( `https://vitafamilyfrontend.herokuapp.com/api/usuarios`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify( usuario )
      });

      const data = await response.json();

      console.log( data );

      setFormData({
          codigo: '',
          nombre: '',
          email: '',
          rol: '',
          estado: ''
      });
      setUpdate( false );
    }

    const deleteUsuario = async ( usuarioId ) => {
      const response = await fetch( `https://vitafamilyfrontend.herokuapp.com/api/usuarios/${ usuarioId }`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json;charset=utf-8'
          }
      });

      const data = await response.json();

      console.log( data );
  }
  const updateUsuario = async () => {
    const usuarioActualizado = formData;

    const response = await fetch( `https://vitafamilyfrontend.herokuapp.com/api/usuarios/${ formData._id }`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify( usuarioActualizado )
    });
    const data = await response.json();

        console.log( data );
        
        setFormData({
            codigo: '',
            nombre: '',
            email: '',
            rol: '',
            estado: ''
        });

        setUpdate( false );
    }
    const handleUpdate = ( usuarioId ) => {

      const index = usuarios.findIndex( index => index._id === usuarioId );
      setUpdate( true );
      setFormData( usuarios[ index ] );
  }

  // Maneja eliminar producto
  const handleDelete = ( usuarioId ) => {

      // Elimina la data a la BD haciendo peticion al API
      deleteUsuario( usuarioId );

      //  Elimina el registro del estado del componente
      setUsuarios( usuarios.filter( usuario => usuario._id !== usuarioId ) );
  }

  // Maneja el envio de la data del formulario
  const handleSubmit = ( event ) => {
      event.preventDefault();     // Evita la redireccion

      if( update ) {
          updateUsuario();
      }
      else {

          // Agrega la data a la BD haciendo peticion al API
          createUsuario( formData );

          //  Agrega el nuevo registro al estado del componente
          setUsuarios([
              formData,
              ...usuarios
          ]);
      }

  }   
  const handleCancel = ( event ) => {
    event.preventDefault();     // Evita la redireccion

    setFormData({
        codigo: '',
        nombre: '',
        email: '',
        rol: '',
        estado: ''
    });

    setUpdate( false );
}

// Maneja los cambios en la data de los campos y establece el estado del componente
const handleChange = ( event ) => {

    // Funcion del State con el que cambiamos el estado del componente
    setFormData({
        ...formData,
        [ event.target.name ]: event.target.value
    })
}
    return (
      <div className="App">           
          <div className ="todo">
  
        <img src={logo} className= "imagen"/>
        <h1 className ="h1-users">Crear usuario</h1>
        <form  onSubmit={handleSubmit} className = "fusers">
            <input className="registro" type="text" placeholder="codigo" name = "codigo" value={codigo} onChange={handleChange}/>
            <input className="registro" type="text" placeholder="Nombre" name = "nombre" value={nombre} onChange={handleChange}/>
            <input className="registro" type="email" placeholder="email" name="email"value={email} onChange={handleChange}/><br/>
            <select name="rol" className="selectorRol" name="rol" value={rol} onChange={handleChange}>
            <option selected hidden>Seleccione una opcion</option>
                <option >Vendedor</option>
                <option >Administrador</option>
            </select>
            <select name="rol" className="selectorRol" name="estado" value={estado} onChange={handleChange}>
                <option hidden>Selecione una opción</option>
                <option >Autorizado</option>
                <option >No Autorizado</option>
            </select><br/>
            <button className="bt-users" type="submit" >{`${update ?'Actualizar usuario': 'crear usuario'}`}</button>
            <button className = "bt-users" onClick ={handleCancel}> Cancelar</button>
            
        </form>
        </div>
        <div className="conte">
          {usuarios.length <= 0 
            ?<p>No hay usuarios registrados</p>
            :
          <form className = "fusers">
          <input type="search" id="Bucador" placeholder="Buscar usuario"/>
          <button>Buscar</button>
                  
          
          <table className="tabla">
                <tr class="fpusers">
                  <th className ="th-users">Usuario ID</th>
                  <th className ="th-users">Nombre</th>
                  <th className ="th-users">Email</th>
                  <th className ="th-users">Rol de usuario</th>
                  <th className ="th-users">Estado</th>
                  <th className ="th-users">Acción</th>
                </tr>
                {   usuarios.map( ( usuario, index ) => (
                                        <tr key={ index } className="filausers">
                  <td className="td-users">{usuario.codigo}</td>
                      <td className="td-users">{usuario.nombre}</td>
                      <td className="td-users">{usuario.email}</td>
                      <td className="td-users">{usuario.rol}</td>
                      <td className="td-users">{usuario.estado}</td>
                      <td className ="td-users"><button type="button" onClick ={()=>handleDelete(usuario._id)}> Eliminar</button><button type="button" onClick={ ()=> handleUpdate(usuario._id)}>Actualizar</button>
                      </td>
                </tr>)
                )}   
                </table>
                </form>
          }
        </div>
      </div>

    )}
export default UsuariosPage;