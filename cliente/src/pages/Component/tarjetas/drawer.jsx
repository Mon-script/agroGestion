import React, { useState } from 'react';
import { Button, Drawer, Space, Divider } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import logo from '../../../assets/fresas-cultivos-berries.jpg';

const Draweter = ({ siembra }) => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();

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
    estimacion_cosecha
  } = siembra;

  const showLargeDrawer = () => {
    setSize('large');
    setOpen(true);
  };
  const onClose = () => {
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
        style={{ color: '#FFFFFF' }}
        bodyStyle={{
          position: 'relative',
          backgroundImage: `url(${logo})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button ghost type="primary" onClick={onClose}>OK</Button>
          </Space>
        }
      >

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Cambia el color y la opacidad según prefieras
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Divider style={{ color: '#FFFFFF' }}>Información del Producto</Divider>
          <p style={{ color: '#FFFFFF' }}><strong>Producto:</strong> {nombre_producto}</p>
          <p style={{ color: '#FFFFFF' }}><strong>Tipo de Semilla:</strong> {nombre_tipo_semilla}</p>
          <p style={{ color: '#FFFFFF' }}><strong>Marca de Semilla:</strong> {nombre_marca_semilla}</p>
          <p style={{ color: '#FFFFFF' }}><strong>Cantidad:</strong> {cantidad}</p>

          <Divider style={{ color: '#FFFFFF' }}>Fertilizante</Divider>
          <p style={{ color: '#FFFFFF' }}><strong>Fertilizante:</strong> {nombre_fertilizante}</p>
          <p style={{ color: '#FFFFFF' }}><strong>Marca de Fertilizante:</strong> {nombre_marca_fertilizante}</p>

          <Divider style={{ color: '#FFFFFF' }}>Estado de Siembra</Divider>
          <p style={{ color: '#FFFFFF' }}><strong>Estado:</strong> {estado}</p>
          <p style={{ color: '#FFFFFF' }}><strong>Fecha de Estado:</strong> {fecha_estado}</p>

          <Divider style={{ color: '#FFFFFF' }}>Riego y Siembra</Divider>
          <p style={{ color: '#FFFFFF' }}><strong>Riego:</strong> {nombre_riego}</p>
          <p style={{ color: '#FFFFFF' }}><strong>Fecha de Riego:</strong> {fecha_riego}</p>
          <p style={{ color: '#FFFFFF' }}><strong>Fecha de Siembra:</strong> {fecha_siembra}</p>
          <p style={{ color: '#FFFFFF' }}><strong>Volumen de Siembra:</strong> {volumen_siembra}</p>
          <p style={{ color: '#FFFFFF' }}><strong>Estimación de Cosecha:</strong> {estimacion_cosecha}</p>
        </div>
      </Drawer>
    </>
  );
};

export default Draweter;

