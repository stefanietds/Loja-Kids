import React, { useState, useEffect } from 'react';
import './styles.css'; // Importe o arquivo de estilo
import Carrinho from './Carrinho';

function ListaDeProdutos() {
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5086/api/v1/Produto');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao obter os produtos:', error);
      }
    };

    fetchData();
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      const updatedCart = cart.map(item => {
        if (item.id === product.id) {
          return { ...item, quantidade: item.quantidade + 1 };
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      cart.push({ ...product, quantidade: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  };

  const clearCart = () => {
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('cart');
  };

  const Toolbar = ({ setPage }) => {
    return (
      <div className="toolbar">
        <button onClick={() => setPage('products')}>Produtos</button>
        <button onClick={() => setPage('cart')}>Carrinho</button>
        <button onClick={clearCart}>Sair</button>
      </div>
    );
  };

  const [page, setPage] = useState('products');

  return (
    <div>
      <Toolbar setPage={setPage} />
      {page === 'products' && (
        <ul className="product-list">
          <div>
            <h1>Loja Kids</h1>
            <div className="products">
              {products.map((product) => (
                <div key={product.id} className="product">
                  <img src={product.imagem} alt={product.imagem} className="imagemEstilizada"/>
                  <h3>{product.nome}</h3>
                  <p>Marca: {product.nomeMarca}</p>
                  <p>Valor: ${product.preco}</p>
                  <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
                </div>
              ))}
            </div>
          </div>
        </ul>
      )}
      {page === 'cart' && <Carrinho />}
    </div>
  );
}

export default ListaDeProdutos;
