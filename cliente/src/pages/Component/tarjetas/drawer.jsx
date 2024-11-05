import React, { useState } from 'react';
import { Button, Drawer, Space, Divider } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

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
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>OK</Button>
          </Space>
        }
      >
        <Divider>Información del Producto</Divider>
        <p><strong>Producto:</strong> {nombre_producto}</p>
        <p><strong>Tipo de Semilla:</strong> {nombre_tipo_semilla}</p>
        <p><strong>Marca de Semilla:</strong> {nombre_marca_semilla}</p>
        <p><strong>Cantidad:</strong> {cantidad}</p>

        <Divider>Fertilizante</Divider>
        <p><strong>Fertilizante:</strong> {nombre_fertilizante}</p>
        <p><strong>Marca de Fertilizante:</strong> {nombre_marca_fertilizante}</p>

        <Divider>Estado de Siembra</Divider>
        <p><strong>Estado:</strong> {estado}</p>
        <p><strong>Fecha de Estado:</strong> {fecha_estado}</p>

        <Divider>Riego y Siembra</Divider>
        <p><strong>Riego:</strong> {nombre_riego}</p>
        <p><strong>Fecha de Riego:</strong> {fecha_riego}</p>
        <p><strong>Fecha de Siembra:</strong> {fecha_siembra}</p>
        <p><strong>Volumen de Siembra:</strong> {volumen_siembra}</p>
        <p><strong>Estimación de Cosecha:</strong> {estimacion_cosecha}</p>
      </Drawer>
    </>
  );
};

export default Draweter;
