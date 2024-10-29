import React from 'react';
import './Botones.css'; // Asegúrate de tener el archivo CSS correspondiente

const BotonEspecial = ({ texto }) => {
  return (
    <button className="button" >
      <span className="button_lg">
        <span className="button_sl"></span>
        <span className="button_text">{ texto }</span>
      </span>
    </button>
  );
};

export default BotonEspecial;