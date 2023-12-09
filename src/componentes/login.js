
import { useState } from 'react';
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";
import Comprar from './Comprar';
import './loginstyles.css';
const GoogleAuth = () => {

  const [isAuthenticated, setAuthenticated] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY;
 
const responseGoogle = (response) => {
  console.log(response);
  console.log(response.wt.cu);
  console.log(response.wt.Ad);
  console.log(response.googleId);
  var nome = response.wt.Ad;
  console.log(nome);
  var email = response.wt.cu;
  console.log(email);
  var id = response.googleId;
  console.log(id);
  setAuthenticated(true);
  enviarDadosParaAPI(email, nome);
};

const enviarDadosParaAPI = async (email, nome) => {
     console.log(email);
   
    try {
      const response = await fetch('http://localhost:5086/api/v1/Cliente/Autenticacão', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              nome: nome,
              email: email,
          }),
      });

      if (!response.ok) {
          throw new Error('Erro ao enviar dados para a API');
      }

      const data = await response.json();
      console.log(data);

    
    if (data !== undefined) {
        localStorage.setItem('usuarioId', data);
        console.log('ID do usuário armazenado no localStorage:', data);

        setAuthenticated(true);
        
    } else {
        console.log('ID do usuário não encontrado na resposta da API');
    }

  } catch (error) {
      console.error('Erro na chamada da API:', error.message);
  }
};

  return (
    <div class="login-box">
      {!isAuthenticated ? (
        <GoogleLogin
          clientId={apiKey}
          buttonText="Continue com Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      ) : (
        <Comprar/>
      )}
    </div>
  );
};

export default GoogleAuth;