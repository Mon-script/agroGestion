import React, { useState, useEffect } from 'react';
import "./Producto.css";
import Modal from 'react-modal';




export const Producto = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [codigoBarra, setCodigoBarra] = useState('');
  const [calidad, setCalidad] = useState('');
  const [photo, setPhoto] = useState('');
  const [files, setFiles] = useState([]);
  const [fileupdated, setFileupdated] = useState(false)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [imagenActual, setIamgenActual] = useState(null)
  const [nombreActual, setNombreActual] = useState('')
  const [calidadActual, setCalidadActual] = useState('')
  const [idActual, setIdActual] = useState('')
  const [productosid, setProductosid] = useState([])



  useEffect(() => {

    Modal.setAppElement('body')
    fetch('http://localhost:3000/productos/get')
      .then(response => response.json())
      .then(response => {
        setFiles(response)
        console.log(response)
      })
      .catch(error => { console.error(error) })

      fetch('http://localhost:3000/productos/get/id')
      .then(response => response.json())
      .then(response => {
        // Transforma el resultado en un array simple de IDs
        const ids = response.map(item => item.id_codigo_barra);
        setProductosid(ids);
        console.log(ids);
      })
      .catch(error => { console.error(error) });

    setFileupdated(false)
  }, [fileupdated])

  const handleAddProduct = () => {
    const formdata = new FormData()//formdata prepara la info de la peticion 
    //(con cabecera incluido)

    formdata.append('nombre', name)
    formdata.append('avatar', photo)
    formdata.append('codigoBarra', parseInt(codigoBarra))
    formdata.append('calidad', calidad)
    /* const data = {
       nombre: JSON.stringify(name),
       avatar: avatarProcesado
     }*/

    if (!name || !photo || !calidad || !codigoBarra) {
     
      alert('ERROR, Debes todo el formulario para poder enviarlo PUTARDO')
      return
    } 

    if (productosid.includes(parseInt(codigoBarra))) {  // Verifica si el código ya existe
      alert('El ID del producto ya existe. Por favor, introduce un ID diferente.')
      return
    }

      fetch('http://localhost:3000/saveProduct', {
        method: 'POST',

        body: formdata
      })
        .then(response => response.text())
        .then(data => {


          console.log(data)
          setFileupdated(true)

        })
        .catch(error => {
          console.error(error)
        })

      setName('');
      setPhoto('');
      setCalidad('');
      document.getElementById("NOMBRE").value = ""
      document.getElementById("FOTO").value = null
      setShowForm(false);
    

  };
  const manejadorModal = (estaAbierto, imagenActual) => {
    setModalAbierto(estaAbierto)
    setIamgenActual(imagenActual)
  }

  const manejarBorrar = () => {
    // tira un alert para confirmar - cambiar estetica luego
    if (window.confirm('¿Está seguro de borrar este producto?')) {
      let imageninfo = imagenActual.split('-');
      let id = parseInt(imageninfo[0]);
      let nombree = imageninfo[1];
      let calidaa = imageninfo[2];

      fetch('http://localhost:3000/producto/delete/' + id +'/'+ nombree +'/'+ calidaa, {
        method: 'DELETE'
      })
        .then(resp => resp.text())
        .then(resp => {
          console.log(resp);
          setModalAbierto(false);
          setFileupdated(true);
        });
    } else {
      setModalAbierto(false);
    }
  }

  const setearNombreCalidad = (imagenActual)=>{
    let imageninfo = imagenActual.split('-');
    let id = imageninfo[0];
    let nombree = imageninfo[1];
    let calidaa = imageninfo[2];
    console.log(imagenActual)
    console.log(nombree,calidaa)
    setCalidadActual(calidaa)
    setNombreActual(nombree)
    setIdActual(id)
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center pt-4">
        <div className="bg-gray-100 p-4 shadow-md w-full flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-green-700 text">Agregar Producto Aqui!</h2>
          <button
            className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition duration-300"
            onClick={() => {setShowForm(true)
              setName('');
              setPhoto('');
              setCalidad('')
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
                  <label htmlFor="NOMBRE" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de tu nuevo producto:
                  </label>
                  <input
                    id="NOMBRE"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value.toLowerCase())}
                  />
                </div>
                <div>
                  <label htmlFor="codigo" className="block text-sm font-medium text-gray-700 mb-1">
                    Introducir codigo de barra:
                  </label>
                  <input
                    id="codigo"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    type="number"
                    required
                    value={codigoBarra}
                    onChange={(e) => setCodigoBarra(e.target.value)}

                  />
                </div>
                <div>
                  <label htmlFor="calidad" className="block text-sm font-medium text-gray-700 mb-1">
                    Introducir calidad de producto:
                  </label>
                  <input
                    id="calidad"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    type="text"
                    required
                    value={calidad}
                    onChange={(e) => setCalidad(e.target.value.toLowerCase())}

                  />
                </div>
                <div>
                  <label htmlFor="FOTO" className="block text-sm font-medium text-gray-700 mb-1">
                    Imagen:
                  </label>
                  <input
                    id="FOTO"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    type="file"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300"
                    type="button"
                    onClick={handleAddProduct}

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
        <br />
        {/*aquirenderizaproductos*/}
        <div className="container mx-auto mt-6">
          <div className="flex flex-wrap justify-center">
            {files.map((imagen, index) => (
              <div key={index} className="max-w-xs rounded overflow-hidden shadow-lg m-4">
                <img src={'http://localhost:3000/' + imagen} alt="producto" className="w-full" style={{ height: '30vh', width: '30vw' }} />
                <div className="px-6 py-4">
                  <button
                    onClick={() =>{ manejadorModal(true, imagen)
                                    setearNombreCalidad(imagen)
                    }}
                    className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
                  >
                    Detalle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>




      </div>

      <Modal
        className="modal"
        style={{ content: { right: '20%', left: '20%', background: 'white', opacity: 1 } }}
        isOpen={modalAbierto}
        onRequestClose={() => manejadorModal(false, null)}
      >
        <div className="max-w-lg mx-auto mt-10 border border-gray-300 rounded-lg shadow-lg">
          <div className="card bg-white opacity-100">
            <img
              src={'http://localhost:3000/' + imagenActual}
              alt="producto"
              className="h-64 w-full object-contain"
            />
            <div className="card-body flex justify-between px-4 py-2">
              
              <article><h3>Nombre: {nombreActual.toUpperCase()} <br /> Calidad: {calidadActual.toUpperCase()} <br /> Codigo: {idActual.toUpperCase()} </h3></article>
              <buttonz
                onClick={manejarBorrar}
                className="bg-red-500 text-white p-2 rounded-md mt-2"
              >
                Borrar Producto
              </buttonz>
            </div>
          </div>
        </div>
      </Modal>


    </>
  );


}

