import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const OrdersComponent = () => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const UserId = localStorage.getItem('usuarioId');
    if (UserId) {
      setUserId(UserId);
    }
  }, []);

  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (userId) {
     
      axios.get(`http://localhost:5086/api/v1/Pedido?idcliente=${userId}`)
        .then(response => {
          setProduct(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar os pedidos:', error);
        });
    }
  }, [userId]);

  return (
    <div className="products">
              {product.map((product) => (
                <div key={product.id} className="product">
                  <img src={product.imagem} alt={product.imagem} className="imagemEstilizada"/>
                  <p>data: {product.dataPedido}</p>
                  <p>Método de Pagamento: {product.metodoPagamentoPedido}</p>
                  <h3>Nome: {product.nome}</h3>
                  <p>Marca: {product.nomeMarca}</p>
                </div>
              ))}
            </div>
  );
};

export default OrdersComponent;
