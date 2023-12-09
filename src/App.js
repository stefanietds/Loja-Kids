import React from 'react'; // Certifique-se de ter o caminho correto para o componente ProductList
import GoogleAuth from './componentes/login';
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';
import Comprar from './componentes/Comprar';
import Carrinho from './componentes/Carrinho';
import ListaDeProdutos from './componentes/ListaDeProdutos';

function App() {

  return (
    <Router>

      <Routes>
      <Route path='/' element={<ListaDeProdutos/>} />
      <Route path='/home' element={<ListaDeProdutos/>} />
      <Route path='/login' element={<GoogleAuth/>} />
      <Route path='/compras' element={<Comprar/>} />
      <Route path='/carrinho' element={<Carrinho/>} />
    
      </Routes>
  </Router>
  );
}

export default App;

