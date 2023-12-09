import React, { useState, useEffect } from 'react';
import './comprar.css';
import { useNavigate } from 'react-router-dom';

const Comprar = () => {
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [metodoPagamento, setMetodoPagamento] = useState('');
  const history = useNavigate();

      const enviarDadosAtualizados = async () => {
          try {
            const userId = localStorage.getItem('usuarioId');
            console.log(userId);
            const dadosAtualizados = {
              idCliente: userId,
              telefonecliente: telefone,
              enderecocliente: endereco,
              CpfCliente : cpf,
            };
            console.log(dadosAtualizados);
            if (telefone.length === 11 && endereco.length >= 5 && endereco.length <= 50 && cpf.length === 11) {
              const response = await fetch('http://localhost:5086/api/v1/Cliente', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosAtualizados),
              });
        
              console.log(response);
              if (!response.ok) {
                throw new Error(`Erro ao atualizar dados: ${response.status}`);
              }
        
              console.log('Dados atualizados com sucesso!');
              console.log(response.status);
            } else {
              console.log('Erro.');
            }
          } catch (error) {
            console.error('Erro ao enviar dados atualizados:', error);
          }
         
        };
    

      
        const handleCompra = async () => {
          if (telefone.length === 11 && endereco.length >= 5 && endereco.length <= 50 && cpf.length === 11) {
            try {
              const userId = localStorage.getItem('usuarioId');
              const carrinho = JSON.parse(localStorage.getItem('cart'));
        
              const dadosPedido = carrinho.map(item => ({
                idProduto: item.id,
                quantidade: item.quantidade
              }));
      
              const response = await fetch(`http://localhost:5086/api/v1/Pedido/CriarPedido?idCliente=${userId}&metodoPagamento=${metodoPagamento}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'accept': '*/*'
                },
                body: JSON.stringify(dadosPedido),
              });
        
              if (!response.ok) {
                throw new Error(`Erro na resposta da API: ${response.status}`);
              }
        
              if (response.status === 200) {
                console.log('Pedido criado com sucesso!');
                history('/home');
                localStorage.removeItem('cart');
              }
            } catch (error) {
              console.error('Erro ao criar o pedido:', error);
            }
          } else {
            console.log('Erro: Validação de telefone, endereço ou CPF falhou.');
          }
        };

        const calcularPrecoTotal = () => {
          const carrinho = JSON.parse(localStorage.getItem('cart'));
          let precoTotal = 0;
      
          carrinho.forEach(item => {
            precoTotal += item.preco * item.quantidade;
          });
      
          return precoTotal;
        };
    

  return (
    <div class="form-container">
      <h1 className="form-title">Preencha suas informações</h1>
     
        <form>
          Telefone: <input type="text" value={telefone} onChange={(e) => { setTelefone(e.target.value);
          enviarDadosAtualizados(); }} /><br />
          Cpf:      <input type="text" value={cpf} onChange={(e) => { setCpf(e.target.value);
          enviarDadosAtualizados(); }} /><br />
          Endereço: <input type="text" value={endereco} onChange={(e) => { setEndereco(e.target.value);
          enviarDadosAtualizados(); }} /><br />
          Método de Pagamento:
          <select value={metodoPagamento} onChange={(e) => setMetodoPagamento(e.target.value)}>
            <option value="">Selecione...</option>
            <option value="boleto">Boleto</option>
            <option value="credito">Cartao de Credito</option>
            <option value="debito">Cartao de Debito</option>
            <option value="pix">PIX</option>
          </select>
        </form>
      

<h1>Produtos</h1>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
  {JSON.parse(localStorage.getItem('cart')).map((item, index) => (
    <div key={index} style={{ margin: '10px', textAlign: 'center' }}>
      <img
        src={item.imagem}
        alt={item.nome}
        style={{ maxWidth: '100px', maxHeight: '100px' }}
      />
      <p>{item.nome}</p>
      <p>Quantidade: {item.quantidade}</p>
      <p>Preço: {item.preco}</p>
    </div>
  ))}
</div>
<h1>Preço Total do Pedido: R$ {calcularPrecoTotal().toFixed(2)}</h1>
<button className="buy-button"  type="submit" onClick={handleCompra}>
  Comprar
</button>
  </div>
  );
};

export default Comprar;
