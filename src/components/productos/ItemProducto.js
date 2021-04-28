import React from 'react';
import {ListGroup,Button} from 'react-bootstrap'

const ItemProducto = (props) => {
    return (
        <ListGroup.Item className='d-flex justify-content-between'>
            {/* <p>Nombre del producto <span className='font-weight-bold'>$200</span></p> */}
            <p>{props.producto.nombreProducto}<span className='font-weight-bold pl-5'>$ {props.producto.precioProducto}</span></p>
            <div>
                <Button variant='warning' className='mr-3'>editar</Button>
                <Button variant='danger'>borrar</Button>
            </div>
        </ListGroup.Item>
        );
};

export default ItemProducto;