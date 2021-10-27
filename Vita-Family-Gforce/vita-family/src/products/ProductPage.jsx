import React, { useState, useEffect } from "react";
import logo from './logo.jpeg';
import "./productsstyle.css";

// Defino Componente Funcional
const ProductPage = () => {

    // Defino State del Componente
    const [ formData, setFormData ] = useState({
        descripcion: '',
        precio: 0,
        cantidad: 0,
        estado: ''
    });
    const [ productos, setProductos ] = useState([]);
    const [ update, setUpdate ] = useState( false );

    const { descripcion, precio, cantidad, estado } = formData;       //  Desestructura la data del State

    // Hace seguimiento a los cambios del estado de productos
    useEffect( () => {

        const getDataAPI = async () => {
            const response = await fetch( `http://localhost:3001/api/productos`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            });
            const data = await response.json();

            console.log( data );
            setProductos( data.productos );         // Establece nuevo estado de productos
        }

        getDataAPI();

    }, [ update ] );

    // Peticion API para agregar un producto
    const createProduct = async ( producto ) => {
        const response = await fetch( `http://localhost:3001/api/productos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify( producto )
        });

        const data = await response.json();

        console.log( data );

        setFormData({
            descripcion: '',
            precio: 0,
            cantidad: 0,
            estado: ''
        });

        setUpdate( false );
    }

    // Peticion API para eliminar un producto
    const deleteProduct = async ( productId ) => {
        const response = await fetch( `http://localhost:3001/api/productos/${ productId }`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        const data = await response.json();

        console.log( data );
    }

    // Peticion API para actualizar un producto
    const updateProduct = async () => {
        const productoActualizado = formData;

        const response = await fetch( `http://localhost:3001/api/productos/${ formData._id }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify( productoActualizado )
        });

        const data = await response.json();

        console.log( data );
        
        setFormData({
            descripcion: '',
            precio: 0,
            cantidad: 0,
            estado: ''
        });

        setUpdate( false );
    }

    // Maneja actualizacion de producto
    const handleUpdate = ( productId ) => {

        const index = productos.findIndex( index => index._id === productId );
        setUpdate( true );
        setFormData( productos[ index ] );
    }

    // Maneja eliminar producto
    const handleDelete = ( productId ) => {

        // Elimina la data a la BD haciendo peticion al API
        deleteProduct( productId );

        //  Elimina el registro del estado del componente
        setProductos( productos.filter( producto => producto._id !== productId ) );
    }

    // Maneja el envio de la data del formulario
    const handleSubmit = ( event ) => {
        event.preventDefault();     // Evita la redireccion

        if( update ) {
            updateProduct();
        }
        else {

            // Agrega la data a la BD haciendo peticion al API
            createProduct( formData );

            //  Agrega el nuevo registro al estado del componente
            setProductos([
                formData,
                ...productos
            ]);
        }

    }

    // Maneja los cambios cuando dan click al boton cancelar
    const handleCancel = ( event ) => {
        event.preventDefault();     // Evita la redireccion

        setFormData({
            descripcion: '',
            precio: 0,
            cantidad: 0,
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
        <>
            <div>
                <img src={logo} alt="Logo" className="imagen" />
                <h1 className= "h1products">Gestión de productos</h1>
            </div>
            <div className ="cont">
                <form
                    onSubmit={ handleSubmit }
                    className="fproduct"
                >
                    <div className="form-fields">
                        <div className="form-field">
                            <label htmlFor="descripcion">Descripción</label>
                            <input
                                type="text"
                                placeholder="Nuevo producto"
                                name="descripcion"              //  String/Nombre del campo, con el mismo nombre de la variable que viene de la desestructuracion
                                value={ descripcion }           //  Variable viene de la desestructuracion
                                onChange={ handleChange }       //  Closure/Funcion que actua ante los cambios
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="precio">Precio unitario</label>
                            <input
                                type="number"
                                placeholder="Ej: 400"
                                name="precio"                   //  String/Nombre del campo, con el mismo nombre de la variable que viene de la desestructuracion
                                value={ precio }                //  Variable viene de la desestructuracion
                                onChange={ handleChange }       //  Closure/Funcion que actua ante los cambios
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="cantidad">Cantidad</label>
                            <input
                                type="number"
                                placeholder="cantidad"
                                name="cantidad"                 //  String/Nombre del campo, con el mismo nombre de la variable que viene de la desestructuracion
                                value={ cantidad }              //  Variable viene de la desestructuracion
                                onChange={ handleChange }       //  Closure/Funcion que actua ante los cambios
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="estado">Estado</label>
                            <select
                                name="estado"
                                value={ estado }
                                onChange={ handleChange }
                            >
                                <option value="">Seleccione...</option>
                                <option value="disponible">Disponible</option>
                                <option value="no disponible">No Disponible</option>
                            </select><br/>
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button
                            className="btn btn-submit bt-product"
                            type="submit"
                        >{ `${ update ? 'Actualiza producto' : 'Crea producto' }` }</button>
                        <button
                            className="btn btn-cancel"
                            onClick={ handleCancel }
                        >Cancelar</button>
                    </div>
                </form>
            </div>
            <div className="container">
                {   productos.length <= 0
                        ?   <p>No hay productos en la lista</p>
                        :   <table className= "tproducts">
                                <thead className ="theadproducts">
                                    <tr className="trproducts">
                                    <th className ="thproducts">Precio unitario</th>
                                    <th className ="thproducts">Cantidad</th>
                                    <th className ="thproducts">Descripción producto</th>
                                    <th className ="thproducts">estado</th>
                                    <th className ="thproducts">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {   productos.map( ( producto, index ) => (
                                        <tr key={ index } className="trproducts">
                                            <td className ="tdproducts">{ producto.precio }</td>
                                            <td className ="tdproducts">{ producto.cantidad }</td>
                                            <td className ="tdproducts">{ producto.descripcion }</td>
                                            <td className ="tdproducts">{ producto.estado }</td>
                                            <td className ="tdproducts">
                                                <button
                                                    onClick={ () => handleDelete( producto._id ) }
                                                >Borrar</button>
                                                <button
                                                    onClick={ () => handleUpdate( producto._id ) }
                                                >Actualizar</button>
                                            </td>
                                        </tr>)
                                    )}
                                </tbody>
                            </table>
                }
            </div>
        </>
    )
}

export default ProductPage;