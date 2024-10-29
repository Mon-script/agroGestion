import React, { useState } from 'react';

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    rol: '',
    contraseña: '',
    usuario: '',
    fecha_inicio: '' // Agregar el campo fecha_inicio
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.rol== 1||formData.rol== 2){
      if(formData.rol== 1){
        formData.rol= 'admin'
      }
      if(formData.rol== 2){
        formData.rol= 'empleado'
      }
      fetch('http://localhost:3000/registroUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.text())
        .then(data => {
          console.log(data);
        })
  
    }else{
      alert("introducir el rol 1 para admin y 2 para empleado")
    }
    
    console.log(formData);
    setFormData({
      nombre: '',
      apellido: '',
      rol: '',
      contraseña: '',
      usuario: '',
      fecha_inicio: '' // Limpiar el campo después del submit
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-green-600 text-center mb-6">Registrar Usuario</h2>
        
        {/* Campo para el nombre */}
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-green-700 font-medium mb-2">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Campo para el apellido */}
        <div className="mb-4">
          <label htmlFor="apellido" className="block text-green-700 font-medium mb-2">
            Apellido
          </label>
          <input
            type="text"
            name="apellido"
            id="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Campo para el rol */}
        <div className="mb-4">
          <label htmlFor="rol" className="block text-green-700 font-medium mb-2">
            Rol --1-- para admin --2-- para usuario
          </label>
          <input
            type="number"
            name="rol"
            id="rol"
            value={formData.rol}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Campo para el usuario */}
        <div className="mb-4">
          <label htmlFor="usuario" className="block text-green-700 font-medium mb-2">
            Usuario
          </label>
          <input
            type="text"
            name="usuario"
            id="usuario"
            value={formData.usuario}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Campo para la fecha de inicio */}
        <div className="mb-4">
          <label htmlFor="fecha_inicio" className="block text-green-700 font-medium mb-2">
            Fecha de inicio
          </label>
          <input
            type="date"
            name="fecha_inicio"
            id="fecha_inicio"
            value={formData.fecha_inicio}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Campo para la contraseña */}
        <div className="mb-6">
          <label htmlFor="contraseña" className="block text-green-700 font-medium mb-2">
            Contraseña
          </label>
          <input
            type="password"
            name="contraseña"
            id="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-green-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegistroUsuario;
