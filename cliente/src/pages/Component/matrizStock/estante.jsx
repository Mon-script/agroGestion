import React from 'react';
import Fila from './fila';
import './matriS.css'


const Estante = ({ filas, productos }) => {
  return (
    <div>
      {filas.map((celdas, index) => (
        <Fila key={index} celdas={celdas} productos={productos} />
      ))}
    </div>
  );
};


export default Estante;
/*const Estante = ({ filas, productos, estanteIndex }) => {
  return (
    <div>
      {filas.map((celdas, rowIndex) => (
        <Fila key={rowIndex} celdas={celdas} productos={productos[estanteIndex]} />
      ))}
    </div>
  );
};
export default Estante;*/