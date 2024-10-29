import React from 'react';
import "./Lista.css";

const ListaCalidad = (props ) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para manejar el envío del formulario
  };

  return (
    
     <div className='campo-texto' onSubmit={handleSubmit}>
      <label>{props.titulo}</label>
      <select name="lenguajes" id="lang">
        <option value="Premium">Premium</option>
        <option value="Mediana">Mediana</option>
        <option value="Grande">Grande</option>
      </select>
      </div>
  )
};

export default ListaCalidad;