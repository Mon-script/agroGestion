import React from 'react';
import "./Lista.css";

const ListaPeso = (props ) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para manejar el envío del formulario
  };

  return (
    
     <div className='campo-texto' onSubmit={handleSubmit}>
      <label>{props.titulo}</label>
      <select name="lenguajes" id="lang">
        <option value="15KG">15KG</option>
        <option value="25KG">25KG</option>
        <option value="35KG">35KG</option>
      </select>
      </div>
  )
};

export default ListaPeso;