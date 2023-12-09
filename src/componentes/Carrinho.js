import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CarrinhoStyles.css'

const Carrinho = () => {
  const [cartItems, setCartItems] = useState([]);
  const [acimaEstoque, setAcimaEstoque] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsQuantity = cart.map(item => {
      if (!item.quantidade) {
        return { ...item, quantidade: 1 };
      }
      return item;
    });
    setCartItems(cartItemsQuantity);
    localStorage.setItem('cart', JSON.stringify(cartItemsQuantity));
  }, []);

  const updateLocalStorage = updatedCart => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const updateQuantity = (id, newQuantidade) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        item.quantidade = newQuantidade;
      }
      return item;
    });

    setAcimaEstoque(false);
    updateLocalStorage(updatedCart);
  };

  const deleteProduct = id => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    updateLocalStorage(updatedCart);
  };

  const updateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.preco * item.quantidade;
    });
    return totalPrice.toFixed(2);
  };

  const handleComprar = () => {
    let acima = false;
    cartItems.forEach(item => {
      if (item.quantidade > item.quantidadeEstoque || item.quantidade < 1) {
        console.log(item.quantidade, item.quantidadeEstoque);
        acima = true;
      } 
    });

    if (!acima) {
      navigate('/login');
    }
  };


  return (
    <div>
      <div id="productList">
        {cartItems.map(product => (
          <div key={product.id} className="product-item">
            <img
              src={product.imagem}
              alt={product.nome}
              style={{ width: '150px', height: '100px' }}
            />
            <p>
              <strong>Nome:</strong> {product.nome}
            </p>
            <p>
              <strong>Estilo:</strong> {product.estilo}
            </p>
            <p>
              <strong>Cor:</strong> {product.cor}
            </p>
            <p>
              <strong>Preço:</strong> ${product.preco}
            </p>
            <p>
              <strong>Quantidade:</strong>
              <input
                type="number"
                value={product.quantidade}
                onChange={e =>
                  updateQuantity(product.id, parseInt(e.target.value))
                }
                min="1"
                max={product.quantidadeEstoque}
                className="quantity-input"
              />
              <button
                onClick={() => deleteProduct(product.id)}
                className="delete-product"
              >
                Deletar
              </button>
            </p>
            <p>
              <strong>Quantidade em Estoque:</strong> {product.quantidadeEstoque}
            </p>
          </div>
        ))}
      </div>
      <div id="totalPrice">Preço Total: ${updateTotalPrice()}</div>
      <button className="buy-button" onClick={handleComprar} disabled={acimaEstoque}>
        Comprar
      </button>
    </div>
  );
};

export default Carrinho;