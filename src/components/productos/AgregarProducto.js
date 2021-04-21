import {React, useState} from "react";
import { Form,Button, Container, FormCheck, Alert } from "react-bootstrap";

const AgregarProducto = () => {
    // creo states por cada opcion del formulario
    const[nombreProducto,setNombreProducto] = useState('');
    const[precioProducto,setPrecioProducto] = useState(0);
    const[categoriaProducto,setCategoriaProducto] = useState('');

    const cambiarCategoria=(e)=>{
        setCategoriaProducto(e.target.value);
    }
    return (
    <Container>
    {/* <section className='container w-75 px-5'> */}
        <Form>
            <h1 className="display-5 text-center py-3">Agregar Nuevo Producto</h1>
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
            
            <Button variant="danger" block className='mb-4'>
                Agregar Producto
            </Button>
            <Alert variant='warning'>
                Todos los campos son obligatorios
            </Alert>
        </Form>
    {/* </section>   */}
    </Container> 
    );
};

export default AgregarProducto;
