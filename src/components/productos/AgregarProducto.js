import React, {useState} from "react";
import { Form,Button, Container, FormCheck, Alert } from "react-bootstrap";
import Swal from 'sweetalert2'

const AgregarProducto = (props) => {
     // variable de entorno
    const URL = process.env.REACT_APP_API_URL;

    // CREACION DE STATES: por cada campo del formulario
    const[nombreProducto,setNombreProducto] = useState('');
    const[precioProducto,setPrecioProducto] = useState(0);
    const[categoriaProducto,setCategoriaProducto] = useState('');

    // state con variable booleana para mostrar u ocultar el alert. Para que react renderice
    const[error,setError] = useState(false);

    // FUNCIONES
    const cambiarCategoria= (e)=>{
        setCategoriaProducto(e.target.value);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        // validar los datos ANTES de guardar usando los valores de los states
        if(nombreProducto.trim()==='' || precioProducto<=0 || precioProducto>5000 || categoriaProducto === ''){
            //si falla mostrar alert de error u ocultarlo
            setError(true);
            return;
        } else{
            // ocultar alert
            setError(false);
            // si esta todo ok, envio datos a la API
            // CREA un objeto con la estructura de la API para enviar a almacenar, 
            // a los atributos del objeto le asigno el nombre del STATE
            // const producto = {
            //     nombreProducto: nombreProducto,
            //     precioProducto: precioProducto,
            //     categoriaProducto: categoriaProducto
            // }

            //cuando las propiedades del objeto y los states se llaman iguales
            const producto = {
                nombreProducto,
                precioProducto,
                categoriaProducto
            }
            console.log(producto)

            // enviar los datos para guardar en la API
            //estructura de control: try{codigo}, si hay un error se ejecuta catch
            try{
                // interaccion con la API
                // defino un OBJETO que sera el 2° parametro del fetch cunado hago POST,DELETE . siempre tiene la misma estructura
                const datosEnviar = {
                    method: "POST", 
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(producto)
                }
                console.log(datosEnviar)
                //-------------------------
                // hace POST a la api
                const respuesta = await fetch(URL,datosEnviar);
                console.log(respuesta);
                if(respuesta.status===201){
                    // mostrar que el producto fue cargado correctamente
                    Swal.fire(
                        'Producto Agregado!',
                        'Se registró un nuevo producto.',
                        'success'
                    )
                    // actualizar los datos. pongo parentesis porque la llamo a la funcion
                    props.consultarAPI();
                }
            }catch(error){
                console.log(error);
                // mostrar cartel al usuario  "intentelo nuevamente"
                Swal.fire(
                    'Ocurrió un Error!',
                    'Inténtelo en unos minutos.',
                    'error'
                )
            }
        }
    }

    return (
    <Container>
        <Form onSubmit={handleSubmit}>
        {/* <Form noValidate validated={validado} onSubmit={handleSubmit}> */}
            <h1 className="display-5 text-center py-3">Agregar Nuevo Producto</h1>
            <Form.Group className='py-2'>
                <Form.Label>Nombre del Producto *</Form.Label>
                <Form.Control type="text" placeholder="Nombre del producto" onChange={(e)=> {setNombreProducto(e.target.value)}} required/>
                
                {/* <Form.Control type="text" placeholder="Nombre del producto" onChange={(e)=> {setNombreProducto(e.target.value)}} onBlur={validarTexto} required/>
                <Form.Control.Feedback type="invalid">Debe ingresar un nombre del producto</Form.Control.Feedback> */}
            </Form.Group>

            <Form.Group className='py-2'>
                <Form.Label>Precio *</Form.Label>
                <Form.Control type="number" placeholder="0" onChange={(e)=> {setPrecioProducto(parseFloat(e.target.value))}} />
            </Form.Group>
            
           {/* form-grup es igual a un div */}
                <h3 className="text-center py-3">Categoría</h3>
                <div className='my-3 text-center'>
                    {/* asignar el valor del value segun como lo quiere la API */}
                    <FormCheck name='categoria' type='radio' inline label="Bebida Caliente" value='bebidaCaliente' onChange={cambiarCategoria}></FormCheck>
                    <FormCheck name='categoria' type='radio' inline label="Bebida Fría" value='bebidaFria' onChange={cambiarCategoria}></FormCheck>
                    <FormCheck name='categoria' type='radio' inline label="Sandwich" value='sandwich' onChange={cambiarCategoria}></FormCheck>
                    <FormCheck name='categoria' type='radio' inline label="Dulce" value='dulce' onChange={cambiarCategoria}></FormCheck>
                    <FormCheck name='categoria' type='radio' inline label="Saldado" value='salado' onChange={cambiarCategoria}></FormCheck>
                </div>
            
            <Button variant="danger" block className='mb-4' type='submit'>
                Agregar Producto
            </Button>
            
                {/* // (error === true) idem (error)
                // OPERADOR TERNARIO */}
                {(error===true)?(<Alert variant='warning'>Todos los campos son obligatorios</Alert>):null}           
        </Form>
    </Container> 
    );
};

export default AgregarProducto;
