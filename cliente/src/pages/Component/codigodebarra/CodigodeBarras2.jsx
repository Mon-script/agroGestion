// CodigodeBarras2.js
import React, { useEffect, useContext } from 'react';
import './CodigodeBarra2.css';
import { UserContext } from '../../../userContext';

const CodigodeBarras2 = ({ estadoForm, Texto, idEntrada, actualizarpagestock, id_codigo_barra }) => {
  
  const { user } = useContext(UserContext);


  const now = new Date(); // trae la fecha y hora actual
      const fecha = now.toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
      const hora = now.toTimeString().split(' ')[0]; // Hora en formato HH:MM:SS
  useEffect(()=>{
    console.log(data)
  }


  ,[])

  const data = {
    id_codigo_barra: id_codigo_barra,
    id_empleado: user.id,
    fecha: fecha,
    hora: hora,
    id_entrada: idEntrada
  }


  const manejarEnvioSalida = () => {
    if (!id_codigo_barra || !user.id) {
      alert("Error: Código de barras o ID de empleado no válido.");
      return;
    }

    

    if (window.confirm('¿Está seguro de enviar este producto a salida?')) {
      fetch('http://localhost:3000/postEntredaSalida', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(resp => resp.text())
        .then(resp => {
          console.log(resp);
          actualizarpagestock(true)
        });
    }

    console.log('Código de barras escaneado:',id_codigo_barra , 'Empleado:', user.id);
    estadoForm(false);
  };

  return (
    <div className='CodigoDeBarras2'>
      <h2 className='CodigoLabel2' >
        Por medio de este comnado usted envia desde nuestras camaras de stock hacia SALIDA nuentro control de produccion saliente,
        confirme para seguir!
      </h2> <br />
      <h3 className='CodigoLabel2' >
        Codigo del Producto:{id_codigo_barra} <br /><br />
        Codigo interno de empleado: {user.id}

      </h3>
      
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className='CodigoButton2' onClick={manejarEnvioSalida}>{Texto}</button>
        <button className='CodigoButton2' onClick={() => estadoForm(false)}>Cerrar</button>
      </div>
    </div>
  );
};

export default CodigodeBarras2;


{/*modificr implementacion:
  // TarjetaStock.jsx
import React, { useState } from 'react';
import CodigodeBarras2 from './CodigodeBarras2'; // Asegúrate de que la ruta sea correcta

const TarjetaStock = ({ producto }) => {
  const { nombre, peso, calidad, color } = producto;
  const [mostrarFormularioSalida, setMostrarFormularioSalida] = useState(false);

  const manejarSalida = () => {
    setMostrarFormularioSalida(true);
  };

  return (
    <div className="cards">
      <div className="title-1">{nombre}</div>
      <img src={Logo} alt="" className='w-[250px] h-[250px] border rounded p-6' />
      <div className="content">
        peso: {peso} <br />
        calidad: {calidad} <br />
        color: {color}
      </div>
      <button className="btn1" onClick={manejarSalida}>Salida</button>
      <div className="bar">
        <div className="emptybar"></div>
        <div className="filledbar"></div>
      </div>
      <div className='CodigosdeB'>
        {mostrarFormularioSalida && <CodigodeBarras2 estadoForm={setMostrarFormularioSalida} Texto="SALIDA" />}
      </div>
    </div>
  );
};

export default TarjetaStock;

// CodigodeBarras2.jsx
import React, { useState } from 'react';

const CodigodeBarras2 = ({ estadoForm, Texto }) => {
  const [codigoBarras, setCodigoBarras] = useState('');

  const manejarCambioCodigoBarras = (event) => {
    setCodigoBarras(event.target.value);
  };

  const obtenerInformacionCodigoBarras = () => {
    // Realiza acciones con el código de barras aquí
    estadoForm(false); // Oculta el formulario
    console.log('Código de barras escaneado:', codigoBarras);
  };

  return (
    <div className='CodigoDeBarras2'>
      <label className='CodigoLabel2' htmlFor="codigoBarras">Ingrese el código de barras:</label>
      <input
        className='CodigoInput2'
        type="number"
        id="codigoBarras"
        value={codigoBarras}
        onChange={manejarCambioCodigoBarras}
      />
      <button className='CodigoButton2' onClick={obtenerInformacionCodigoBarras}>{Texto}</button>
    </div>
  );
};

export default CodigodeBarras2;
 */ }
