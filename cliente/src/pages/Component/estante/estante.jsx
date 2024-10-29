// TablasEstantes.js
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TarjetaStock from '../tarjetas/TarjetaStock';
import TarjetaProducto from '../tarjetas/TarjetaProducto';
const TablasEstantes = ({ productos, actualizarpagestock }) => {
  // Si 'productos' no es un array, retornamos un mensaje o manejamos el caso
  if (!Array.isArray(productos)) {
    console.error('Productos no es un array:', productos);
    return <div>No hay productos disponibles.</div>;
  }
  console.log(productos)
  // Agrupamos productos por estante
  const estantes = productos.reduce((acc, producto) => {
    const { estante } = producto;
    if (!acc[estante]) {
      acc[estante] = [];
    }
    acc[estante].push(producto);
    return acc;
  }, {});

  return (
    <Tabs>
      <TabList>
        {Object.keys(estantes).map((estante) => (
          <Tab key={estante}>Estante {estante}</Tab>
        ))}
      </TabList>
      {Object.keys(estantes).map((estante) => (
        <TabPanel key={estante}>
          <div className="flex flex-wrap">
            {estantes[estante].map((producto, index) => (
              <TarjetaStock key={index} producto={producto} actualizarpagestock={actualizarpagestock} />
            ))}
          </div>
        </TabPanel>
      ))}
    </Tabs>
  );
};



export default TablasEstantes;
