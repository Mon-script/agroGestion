import TablasEstantes from '../Component/estante/estante'
import "./Stockpag.css";
import { useState, useEffect } from "react";
import {  message, Skeleton } from "antd";


export const Stock = () => {
  const [showForm, setShowForm] = useState('')
  const [codigoProducto, setCodigoProducto] = useState('')
  const [estanteria, setEstanteria] = useState('')
  const [productos, setProductos] = useState('')
  const [productosid, setProductosid] = useState([])
  const [stockActializado, setStockActualizado] = useState(false)



  useEffect(() => {


    fetch('http://localhost:3000/stock/get')
      .then(response => response.json())
      .then(response => {
        setProductos(response)
        console.log(response)
      })
      .catch(error => { console.error(error) })

    setStockActualizado(false)


    fetch('http://localhost:3000/productos/get/id')
      .then(response => response.json())
      .then(response => {
        // Transforma el resultado en un array simple de IDs
        const ids = response.map(item => item.id_codigo_barra);
        setProductosid(ids);
        console.log(ids);
      })
      .catch(error => { console.error(error) });

  }, [stockActializado])



  const agregarEntrada = () => {
    /* if (estanteria < 1 && estanteria > numEstantes) {
       alert(`Debes indicar un estante entre 1 y ${numEstantes} `)
       return
     }*/

    if (!codigoProducto || !estanteria) {
      alert('Todos los campos deben estar completados')
      return
    }
    if (productosid.includes(parseInt(codigoProducto))) {

      const now = new Date(); // trae la fecha y hora actual
      const fecha = now.toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
      const hora = now.toTimeString().split(' ')[0]; // Hora en formato HH:MM:SS

      const data = {
        codigo: codigoProducto,
        estante: parseInt(estanteria),
        fecha: fecha,
        hora: hora
      };

      fetch('http://localhost:3000/post/entrada', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(resp => {
          if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
          }
          return resp.text();
        })
        .then(respText => console.log(respText))
        .catch(error => {console.error('Error:', error)
          message.error('Algo salio mal')
        });


      setStockActualizado(true)
      setCodigoProducto('');
      setEstanteria('');
      message.success('Operacion exitosa')
      setShowForm(false)
    }




  }

  return <>

    <div className="m-4 flex flex-col items-center pt-4">
      <div className="bg-gray-100 p-4 shadow-md w-full flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-green-700 text">Entrada de Stock!</h2>
        <button
          className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition duration-300"
          onClick={() => {
            setShowForm(true)
            setCodigoProducto('');
            setEstanteria('');

          }}
          hidden={showForm ? true : false}
        >
          Agregar
        </button>
      </div>
      {showForm && (
        <div className="flex flex-col items-center justify-center w-full mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
            <form className="space-y-6 w-full">

              <div>
                <label htmlFor="codigoProducto" className="block text-sm font-medium text-gray-700 mb-1">
                  Codigo de producto:
                </label>
                <input
                  id="codigoProducto"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-500 sm:text-sm"
                  type="number"
                  required
                  value={codigoProducto}
                  onChange={(e) => setCodigoProducto(e.target.value)}

                />
              </div>
              <div>
                <label htmlFor="estanteria" className="block text-sm font-medium text-gray-700 mb-1">
                  Estanteria:
                </label>
                <input
                  id="estanteria"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-500 sm:text-sm"
                  type="number"
                  required
                  value={estanteria}
                  onChange={(e) => setEstanteria(e.target.value)}

                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300"
                  type="button"
                  onClick={agregarEntrada}

                >
                  Agregar
                </button>
                <button
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-400 transition duration-300"
                  type="button"
                  onClick={() => setShowForm(false)}
                >
                  Salir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>

    <TablasEstantes productos={productos} actualizarpagestock={setStockActualizado} /> </>
};

/*
if (productosid.includes(parseInt(codigoProducto))) {  // Verifica si el código ya existe
      alert('El ID del producto ya existe. Por favor, introduce un ID diferente.')
      return
    }

export const Stock=()=>{

  const matrizEjemplo = [
    // Estante 1
    [
      ['A', 'B', 'C'],
      ['D', 'E', 'F'],
    ],
    // Estante 2
    [
      ['G', 'H', 'I'],
      ['J', 'K', 'L'],
    ],
    // ... más estantes
  ];

  return <Matriz estantes={matrizEjemplo} />;
  

    return(
          <>
        <div className="TarjetaStock">
            {<TarjetaStock/> }

        </div>
          
          </>
    )
}
*/
/*numeroooo 2 
export const Stock = () => {
  const numEstantes = 2;
  const numFilas = 3;
  const numColumnas = 3;

  const matrizEjemplo = [];
  for (let i = 0; i < numEstantes; i++) {
    matrizEjemplo.push([]);
    for (let j = 0; j < numFilas; j++) {
      matrizEjemplo[i].push([]);
      for (let k = 0; k < numColumnas; k++) {
        matrizEjemplo[i][j].push(`${String.fromCharCode(65 + i)}${j + 1}${String.fromCharCode(65 + k)}`);
      }
    }
  }

  const productos = [
    { nombre: 'Frutilla', peso: '30kg', calidad: 'primera calidad', color: 'rojas' },
    { nombre: 'Manzana', peso: '25kg', calidad: 'segunda calidad', color: 'verde' },
    { nombre: 'Pera', peso: '20kg', calidad: 'tercera calidad', color: 'amarilla' },
  ];

  const ejemplo = [
    [0, null, 1],
    [null, 2, null],
  ];

  return (
    <>
      <h2>Stock Component</h2>
      <Matriz estantes={matrizEjemplo} productos={productos} ejemplo={ejemplo} />
    </>
  );
};
*/

