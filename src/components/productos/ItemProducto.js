import React from 'react';
import {ListGroup,Button} from 'react-bootstrap'
import Swal from 'sweetalert2'

const ItemProducto = (props) => {
    const eliminarProducto = (idProducto)=>{
        console.log(idProducto);
        Swal.fire({
            title: 'Quiere eliminar el Producto?',
            text: "No puede volver atras esta operación luego de eliminar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async(result) => {
            if (result.isConfirmed) {
                // agregar la logica para borrar producto
                try{
                    const URL = `${process.env.REACT_APP_API_URL}/${idProducto}`;
                    console.log(URL);
                    const respuesta = await fetch(URL,{
                        method:"DELETE",
                        headers:{"Content-Type":"application/json"}
                    });
                    if (respuesta.status===200){
                        Swal.fire(
                            'Producto Eliminado!',
                            'El produto seleccionado fue correctamente eliminado.',
                            'success'
                        )
                        //actualizar los datos de la api
                        props.consultarAPI();
                    }
                }catch(error){
                    console.log(error)
                    // agregar ventana de error
                    Swal.fire(
                        'Se ha producido un Error!',
                        'Intentelo nuevamente en unos minutos',
                        'warning'
                    )
                }
            }
        })
    }
    return (
        <ListGroup.Item className='d-flex justify-content-between'>
            {/* <p>Nombre del producto <span className='font-weight-bold'>$200</span></p> */}
            <p>{props.producto.nombreProducto}<span className='font-weight-bold pl-5'>$ {props.producto.precioProducto}</span></p>
            <div>
                <Button variant='warning' className='mr-3'>editar</Button>
                <Button variant='danger' onClick={()=> eliminarProducto(props.producto.id)}>borrar</Button>
            </div>
        </ListGroup.Item>
        );
};

export default ItemProducto;