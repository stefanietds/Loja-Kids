import React from 'react';
import { useNavigate } from 'react-router-dom';

class SairButton extends React.Component {


   history = useNavigate();
   handleClick = () => {
    var history = useNavigate();
    history('/');
    localStorage.clear();
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Sair
      </button>
    );
  }
}

export default SairButton;
