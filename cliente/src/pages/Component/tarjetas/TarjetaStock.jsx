// TarjetaStock.js
import React, { useState } from 'react';
import './TarjetaStock.css'; // Asegúrate de importar tu archivo de estilos
import Logo from '../../../assets/1.png';
import CodigodeBarras2 from '../codigodebarra/CodigodeBarras2';

const TarjetaStock = ({ producto, actualizarpagestock}) => {
  const { producto_nombre, calidad, id_codigo_barra, entrada_id, estante, fecha, hora } = producto;

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
    <div className="cards">
      <div className="title-1">{producto_nombre}</div>
      <img src={Logo} alt="" className="w-[250px] h-[250px] border rounded p-6" />
      <div className="content">
        calidad: {calidad} <br />
        fecha: {fechaFormateada} <br />
        hora: {horaFormateada}
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
            id_codigo_barra= {id_codigo_barra}
            actualizarpagestock={actualizarpagestock}
          />
        )}
      </div>
    </div>
  );
};

export default TarjetaStock;




