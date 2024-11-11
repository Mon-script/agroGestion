import React, { useState } from 'react';
import { Button, Drawer, Space, Divider } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import logo from '../../../assets/Culturismo-Vegano-y-vegetariano-Etenon-1024x878.jpg';
import { SiembraDrawerForm } from '../formulario/siembraFormDrawer';

const Draweter = ({ siembra, actualizarSiembra }) => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const [editando, setEditando] = useState(false);

  const {
    nombre_producto,
    nombre_tipo_semilla,
    nombre_marca_semilla,
    cantidad,
    nombre_fertilizante,
    nombre_marca_fertilizante,
    estado,
    fecha_estado,
    nombre_riego,
    fecha_riego,
    fecha_siembra,
    volumen_siembra,
    estimacion_cosecha,
    id_siembra
  } = siembra;
  function formatFecha(fecha) {
  
    const fechaObjeto = new Date(fecha);
    
   
    if (isNaN(fechaObjeto)) {
      return "Fecha inválida";
    }
  
    
    const dia = fechaObjeto.getDate().toString().padStart(2, '0');
    const mes = (fechaObjeto.getMonth() + 1).toString().padStart(2, '0');
    const año = fechaObjeto.getFullYear();
  
    return `${dia}/${mes}/${año}`;
  }
  const fecha_estado_f = formatFecha(fecha_estado)
  const fecha_riego_f = formatFecha(fecha_riego)
  const fecha_siembra_f = formatFecha(fecha_siembra)
  const estimacion_cosecha_f = formatFecha(estimacion_cosecha)

  const showLargeDrawer = () => {
    setSize('large');
    setOpen(true);
  };
  const onClose = () => {
    setEditando(false)
    setOpen(false);
  };

  return (
    <>
      <EllipsisOutlined onClick={showLargeDrawer} />
  
      <Drawer
        title={`Siembra de ${nombre_producto}`}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        style={{ color: '#FFFFFF', backgroundColor : 'green' }}
        bodyStyle={{
          position: 'relative',
          backgroundImage: `url(${logo})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        extra={
          <Space>
            <Button type="primary" onClick={() => setEditando(true)}>Editar</Button> {/* Esto activa el modo de edición */}
            <Button danger type="primary" onClick={onClose}>Cancelar</Button>
          </Space>
        }
      >
        {!editando ? (
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 className="text-3xl font-semibold text-white-600 text-center mb-12 bg-gray-100 rounded-lg shadow-lg p-6" style={{ backgroundColor: 'rgba(20, 90, 20, 0.6)' }}>
              Información del Producto
            </h2>
            <h2 className="text-l font-semibold text-green-200 text-left mb-12 bg-gray-100 rounded-lg shadow-lg p-6" style={{ backgroundColor: 'rgba(0, 40, 0, 0.6)' }}>
              <Divider style={{color: 'white'}}>Producto</Divider>
              <p><strong>Producto:</strong> {nombre_producto}</p>
              <p><strong>Tipo de Semilla:</strong> {nombre_tipo_semilla}</p>
              <p><strong>Marca de Semilla:</strong> {nombre_marca_semilla}</p>
              <p><strong>Cantidad de semillas empleadas:</strong> {cantidad}</p>
            </h2>
  
            <h2 className="text-l font-semibold text-green-200 text-left mb-12 bg-gray-100 rounded-lg shadow-lg p-6" style={{ backgroundColor: 'rgba(0, 40, 0, 0.6)' }}>
              <Divider style={{color: 'white'}}>Fertilizante</Divider>
              <p><strong>Fertilizante:</strong> {nombre_fertilizante}</p>
              <p><strong>Marca de Fertilizante:</strong> {nombre_marca_fertilizante}</p>
            </h2>
            
            <h2 className="text-l font-semibold text-green-200 text-left mb-12 bg-gray-100 rounded-lg shadow-lg p-6" style={{ backgroundColor: 'rgba(0, 40, 0, 0.6)' }}>
              <Divider style={{color: 'white'}}>Estado de Siembra</Divider>
              <p><strong>Estado:</strong> {estado}</p>
              <p><strong>Fecha de Estado:</strong> {fecha_estado_f}</p>
            </h2>
            
            <h2 className="text-l font-semibold text-green-200 text-left mb-12 bg-gray-100 rounded-lg shadow-lg p-6" style={{ backgroundColor: 'rgba(0, 40, 0, 0.6)' }}>
              <Divider style={{color: 'white'}}>Riego y Siembra</Divider>
              <p><strong>Riego:</strong> {nombre_riego}</p>
              <p><strong>Fecha de Riego:</strong> {fecha_riego_f}</p>
              <p><strong>Fecha de Siembra:</strong> {fecha_siembra_f}</p>
              <p><strong>Volumen de Siembra (m²):</strong> {volumen_siembra}</p>
              <p><strong>Estimación de Cosecha:</strong> {estimacion_cosecha_f}</p>
            </h2>
          </div>
        ) : (
          <SiembraDrawerForm editar = {setEditando} id_siembra={id_siembra} actualizarSiembra={actualizarSiembra} />
        )}
      </Drawer>
    </>
  );
};

export default Draweter;

