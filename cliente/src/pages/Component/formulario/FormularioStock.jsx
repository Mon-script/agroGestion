import React, { useState } from 'react';
import './FormularioStock.css'; 

const FormularioStock = () => {
  // Estados para los datos del formulario
  const [nombreProducto, setNombreProducto] = useState('');
  const [peso, setPeso] = useState('');
  const [calidad, setCalidad] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar acciones con los datos, como enviarlos al servidor
    console.log('Nombre del producto:', nombreProducto);
    console.log('Peso:', peso);
    console.log('Calidad:', calidad);
  };

  return (
    <div className='formularios-containers'>
    <form onSubmit={handleSubmit}>
      <label htmlFor="producto">Nombre del Producto:</label>
      <select
        id="producto"
        name="producto"
        value={nombreProducto}
        onChange={(e) => setNombreProducto(e.target.value)}
        required
      >
        <option value="">Seleccione un producto</option>
        <option value="producto1">Frutilla Congelada</option>
        <option value="producto2">Frutos Rojos</option>
        <option value="producto2">Mangos</option>
        <option value="producto2">Frambuesa</option>
        {/* Agrega más opciones según sea necesario */}
      </select>

      <label htmlFor="peso">Peso:</label>
      <select
        id="peso"
        name="peso"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
        required
      >
        <option value="">Seleccione un peso</option>
        <option value="15kg">15kg</option>
        <option value="25kg">25kg</option>
        <option value="35kg">35kg</option>
        {/* Agrega más opciones según sea necesario */}
      </select>

      <label htmlFor="calidad">Calidad:</label>
      <select
        id="calidad"
        name="calidad"
        value={calidad}
        onChange={(e) => setCalidad(e.target.value)}
        required
      >
        <option value="">Seleccione la calidad</option>
        <option value="Premium">Premium</option>
        <option value="Mediana">Mediana</option>
        <option value="Grande">Grande</option>
        {/* Agrega más opciones según sea necesario */}
      </select>

      <button type="submit">Enviar</button>
    </form>
    </div>
  );
};

export default FormularioStock;