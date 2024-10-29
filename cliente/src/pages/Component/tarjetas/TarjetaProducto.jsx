import React, { useState } from 'react';
import './TarjetaProducto.css';
import Logo from '../img/Logo.jpg';
import CodigodeBarras2 from '../codigodebarra/CodigodeBarras2';

const TarjetaProducto = ({ producto }) => {
  const { producto_nombre, calidad, id_codigo_barra, entrada_id, estante, fecha, hora, avatar } = producto;

  const [mostrarFormularioSalida, setMostrarFormularioSalida] = useState(false);

  const manejarSalida = () => {
    setMostrarFormularioSalida(true);
  };

  // Convertir fecha ISO a un formato legible
  const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Formatear hora si es necesaria (ya que está en formato de 24 horas)
  const horaFormateada = hora.substring(0, 5); // Cortar los segundos si no son necesarios

  return (
    <div className="cards1">
      <div className="title-1">{producto_nombre}</div>
      <img src={'http://localhost:3000/' + avatar} alt={avatar} className='w-[250px] h-[250px] border rounded p-6' />
      <div className="cards1-details">
        <p className="text-body">Calidad: {calidad}</p>
        <p className="text-body">Estante: {estante}</p>
        <p className="text-body">Fecha: {fechaFormateada}</p>
        <p className="text-body">Hora: {horaFormateada}</p>
      </div>
      <button className="btnp" onClick={manejarSalida}>Salida</button>
      <div className="bar">
        <div className="emptybar"></div>
        <div className="filledbar"></div>
      </div>
      {/* Mostrar el formulario si mostrarFormularioSalida es true */}
      <div className="CodigosdeB">
        {mostrarFormularioSalida && (
          <CodigodeBarras2
            estadoForm={setMostrarFormularioSalida}
            Texto="SALIDA"
            idEntrada={entrada_id}
          />
        )}
      </div>
    </div>
  );
}

export default TarjetaProducto;
