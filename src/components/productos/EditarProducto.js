import React, {useState} from "react";
import { Form,Button, Container, FormCheck, Alert } from "react-bootstrap";

const EditarProducto = () => {
    // CREACION DE STATES: por cada opcion del formulario
    const[nombreProducto,setNombreProducto] = useState('');
    const[precioProducto,setPrecioProducto] = useState(0);
    const[categoriaProducto,setCategoriaProducto] = useState('');
    // state con variable booleana para mostrar u ocultar el alert. Para que react renderice
    const[error,setError] = useState(false);

    const cambiarCategoria= (e)=>{
        setCategoriaProducto(e.target.value);
    }

    const handleSubmit = (e)=>{
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
        }
    }

    return (
    <Container>
    {/* <section className='container w-75 px-5'> */}
        <Form onSubmit={handleSubmit}>
            <h1 className="display-5 text-center py-3">Modificar Producto</h1>
            <Form.Group controlId="formNombreProducto" className='py-2'>
                <Form.Label>Nombre del Producto *</Form.Label>
                <Form.Control type="text" placeholder="Nombre del producto" onChange={(e)=> {setNombreProducto(e.target.value)}}/>
            </Form.Group>

            <Form.Group controlId="formPrecioProducto" className='py-2'>
                <Form.Label>Precio *</Form.Label>
                <Form.Control type="number" placeholder="0" onChange={(e)=> {setPrecioProducto(parseFloat(e.target.value))}} />
            </Form.Group>
            
           {/* form-grup es un div */}
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
                Modificar Producto
            </Button>
            
                {/* // (error === true) idem (error)
                // OPERADOR TERNARIO */}
                {(error===true)?(<Alert variant='warning'>Todos los campos son obligatorios</Alert>):null};            
        </Form>
    {/* </section>   */}
    </Container> 
    );
};

export default EditarProducto;
