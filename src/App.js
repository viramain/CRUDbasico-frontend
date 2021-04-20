
import './App.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Inicio from './components/Inicio';
import ListarProductos from './components/productos/ListarProductos';
import AgregarProducto from './components/productos/AgregarProducto';
import Navegacion from './components/common/Navegacion';
import Footer from './components/common/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
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
          <ListarProductos></ListarProductos>
        </Route>
        <Route exact path='/productos/nuevo'>
          <AgregarProducto></AgregarProducto>
        </Route>
      </Switch>
      {/* se invoca el footer */}
      <Footer></Footer>
    </Router>
  );
}

export default App;
