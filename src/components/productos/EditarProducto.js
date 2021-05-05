import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Container, FormCheck, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import { useParams, withRouter } from "react-router-dom";

// importo archivo de validaciones
import { campoRequerido, rangoPrecio } from "../common/helpers"


const EditarProducto = (props) => {
    // obtener el valor del parametro. useParams() da aceso al objeto donde estan los parametros de la URL donde estoy posicionado
    console.log(useParams().id);
    // defino varable "codProducto" para guardar el valor del parametro del ID
    const codProducto = useParams().id;
    // const {id}=useParams();  otra forma de escribir lo mismo

    // CREACION DE STATES:
    const [categoriaProducto, setCategoriaProducto] = useState("");

    // state con variable booleana para mostrar u ocultar el alert. Para que react renderice
    const [error, setError] = useState(false);

    // state para almacenar el producto a editar
    const [producto, setProducto] = useState({});

    // asigno a variable URL donde esta almacenada la api y el parametro
    const URL = process.env.REACT_APP_API_URL + "/" + codProducto;
    // console.log(URL)

    // Se crean variables del hook USEREF (variables de referencia, que no necesitan renderizado)
    const nombreProductoRef = useRef("");
    const precioProductoRef = useRef(0);

    // se ejecuta GET solo en el montaje del componente editar
    // en async va delante del parmetro de la funcion anonima
    useEffect(async () => {
        try {
            // hacemos GET
            const respuesta = await fetch(URL);
            console.log(respuesta);
            if (respuesta.status === 200) {
                // guardo respuesta en state
                const productoSolicitado = await respuesta.json();
                setProducto(productoSolicitado);
            }
        } catch (error) {
            console.log(error);
            //mostrar al usuario un mnsaje de error
            Swal.fire("Ocurrió un Error!", "Inténtelo en unos minutos.", "error");
        }
    }, []);

    const cambiarCategoria = (e) => {
        setCategoriaProducto(e.target.value);
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        // si el campo categoria es vacio, toma el valor que tenia, sino toma el nuevo valor
        let categoriaModificada = (categoriaProducto === '') ? (producto.categoriaProducto) : (categoriaProducto)
        console.log(categoriaModificada);
        console.log(nombreProductoRef);
        // accedo al html del elemento
        console.log(nombreProductoRef.current);
        // accedo al valor del html del elemento
        console.log(nombreProductoRef.current.value)
        // === validar datos ===
        if (campoRequerido(nombreProductoRef.current.value) &&
            rangoPrecio(parseFloat(precioProductoRef.current.value)) && campoRequerido(categoriaModificada)) {
            setError(false);
            
            try{
                const productoModificado = {
                    nombreProducto: nombreProductoRef.current.value,
                    precioProducto: precioProductoRef.current.value,
                    categoriaProducto: categoriaModificada
                }
                // console.log(productoModificado)

                const respuesta = await fetch(URL,{
                    method: "PUT",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify(productoModificado)
                });
                // console.log(respuesta);
                if (respuesta.status===200){
                    // se actualizaron los datos en la api
                    Swal.fire(
                        'Producto Modificado!',
                        'Se actualizaron los datos del producto.',
                        'success'
                    )
                    // actualizar los datos. pongo parentesis porque la llamo a la funcion
                    props.consultarAPI();

                    //REDIRECCIONAR a otra pagina
                    props.history.push('/productos')

                }
            }catch(error){
                console.log(error);
                // mesajr de error
            }
        } else {
            setError(true);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h1 className="display-5 text-center py-3">Editar Producto</h1>
                <Form.Group controlId="formNombreProducto" className="py-2">
                    <Form.Label>Nombre del Producto *</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nombre del producto"
                        defaultValue={producto.nombreProducto}
                        ref={nombreProductoRef}
                    />
                </Form.Group>
                <Form.Group controlId="formPrecioProducto" className="py-2">
                    <Form.Label>Precio *</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="0"
                        defaultValue={producto.precioProducto}
                        ref={precioProductoRef}
                    />
                </Form.Group>
                <h3 className="text-center py-3">Categoría</h3>
                <div className="my-3 text-center">
                    {/* asignar el valor del value segun como lo quiere la API */}
                    <FormCheck
                        name="categoria"
                        type="radio"
                        inline
                        label="Bebida Caliente"
                        value="bebidaCaliente"
                        onChange={cambiarCategoria}
                        defaultChecked={producto.categoriaProducto && producto.categoriaProducto === 'bebidaCaliente'}
                    ></FormCheck>
                    <FormCheck
                        name="categoria"
                        type="radio"
                        inline
                        label="Bebida Fría"
                        value="bebidaFria"
                        onChange={cambiarCategoria}
                        defaultChecked={producto.categoriaProducto && producto.categoriaProducto === 'bebidaFria'}
                    ></FormCheck>
                    <FormCheck
                        name="categoria"
                        type="radio"
                        inline
                        label="Sandwich"
                        value="sandwich"
                        onChange={cambiarCategoria}
                        defaultChecked={producto.categoriaProducto && producto.categoriaProducto === 'sandwich'}
                    ></FormCheck>
                    <FormCheck
                        name="categoria"
                        type="radio"
                        inline
                        label="Dulce"
                        value="dulce"
                        onChange={cambiarCategoria}
                        defaultChecked={producto.categoriaProducto && producto.categoriaProducto === 'dulce'}
                    ></FormCheck>
                    <FormCheck
                        name="categoria"
                        type="radio"
                        inline
                        label="Saldado"
                        value="salado"
                        onChange={cambiarCategoria}
                        defaultChecked={producto.categoriaProducto && producto.categoriaProducto === 'salado'}
                    ></FormCheck>
                </div>
                <Button variant="danger" block className="mb-4" type="submit">
                    Modificar Producto
                </Button>
                {/* // (error === true) idem (error)
                // OPERADOR TERNARIO */}
                {error === true ? (
                    <Alert variant="warning">Todos los campos son obligatorios</Alert>
                ) : null};
            </Form>  
        </Container>
    );
};

export default withRouter(EditarProducto);
