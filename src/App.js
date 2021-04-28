
import './App.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Inicio from './components/Inicio';
import ListarProductos from './components/productos/ListarProductos';
import AgregarProducto from './components/productos/AgregarProducto';
import Navegacion from './components/common/Navegacion';
import Footer from './components/common/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditarProducto from './components/productos/EditarProducto';
import {useState,useEffect} from 'react';

function App() {
  // variable de entorno
  const URL = process.env.REACT_APP_API_URL;
  console.log(URL);
  // state para get de preductos y ejecutar solo en montaje
  const[productos,setProductos]=useState([]);
  useEffect(()=>{
    consultarAPI();
  },[])

  const consultarAPI = async ()=>{
    try{
      const respuesta = await fetch(URL);
      console.log(respuesta);
      if(respuesta.status===200){
        const listaProductos= await respuesta.json();
        setProductos(listaProductos);
      }
    }catch(error){
      console.log("error")
    }
  }
  return (
    // Crear sistema de rutas usando SIEMPRE Router y switch
    <Router>
      {/* se invoca el navbar*/}
      <Navegacion></Navegacion>
      <Switch>
        {/* Elegir entre las rutas. La barra / es la pagina principal del proyecto (idem index.hml) */}
        <Route exact path='/'>
          {/* llamar al componente inicio */}
          <Inicio></Inicio>
        </Route>
        <Route exact path='/productos'>
          <ListarProductos productos = {productos} consultarAPI={consultarAPI}></ListarProductos>
        </Route>
        <Route exact path='/productos/nuevo'>
          <AgregarProducto consultarAPI={consultarAPI}></AgregarProducto>
        </Route>
        <Route exact path='/productos/editar'>
          <EditarProducto></EditarProducto>
        </Route>
      </Switch>
      {/* se invoca el footer */}
      <Footer></Footer>
    </Router>
  );
}

export default App;
