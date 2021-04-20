import React from "react";
import { Container,Form,Button } from "react-bootstrap";

const AgregarProducto = () => {
    return (
    <section className='container w-75 px-5'>
        <h1 className="display-5 text-center py-3">Agregar Nuevo Producto</h1>

        <Form>
            <Form.Group controlId="formNombreProducto" className='py-2'>
                <Form.Label>Nombre del Producto *</Form.Label>
                <Form.Control type="text" placeholder="Nombre del producto" />
            </Form.Group>

            <Form.Group controlId="formPrecioProducto" className='py-2'>
                <Form.Label>Precio *</Form.Label>
                <Form.Control type="number" placeholder="Precio" />
            </Form.Group>
            
            <Form.Group controlId="formCategoriaProducto" className='py-3 text-center'>
                <Form.Label className='lead'>Categoría *</Form.Label>
                {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                    <Form.Check inline label="Bebida Caliente" name="group1" type={type} id={`inline-${type}-1`} />
                    <Form.Check inline label="Bebida Fría" name="group1" type={type} id={`inline-${type}-2`} />
                    <Form.Check inline label="Sandwich" name="group1" type={type} id={`inline-${type}-3`} />
                    <Form.Check inline label="Dulce" name="group1" type={type} id={`inline-${type}-4`} />
                    <Form.Check inline label="Salado" name="group1" type={type} id={`inline-${type}-5`} />
                </div>
                ))}
            </Form.Group>
            {/* <div className='d-grid gap-2 mb-3'>
                <Button variant="danger" size="lg" type="submit" block>
                    Agregar Producto
                </Button>
            </div> */}
            <Button variant="danger" size="lg" block className='mb-3'>
                Block level button
            </Button>
        </Form>
    </section>   
  );
};

export default AgregarProducto;
