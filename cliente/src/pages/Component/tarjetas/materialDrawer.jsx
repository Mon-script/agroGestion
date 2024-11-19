import React, { useState } from 'react';
import { Button, Drawer, Space, Divider } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import logo from '../../../assets/Culturismo-Vegano-y-vegetariano-Etenon-1024x878.jpg';


const MaterialDrawer = ({ nombre, detalle, id}) => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const [editando, setEditando] = useState(false);

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
        title={`Siembra de ${nombre}`}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        style={{ color: '#FFFFFF', backgroundColor: 'green' }}
        bodyStyle={{
          position: 'relative',
          backgroundImage: `url(${logo})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        extra={
          <Space>
            <Button danger type="primary" onClick={onClose}>Cancelar</Button>
          </Space>
        }
      >

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="text-3xl font-semibold text-white-600 text-center mb-12 bg-gray-100 rounded-lg shadow-lg p-6" style={{ backgroundColor: 'rgba(20, 90, 20, 0.6)' }}>
            Información :
          </h2>
          <h2 className="text-l font-semibold text-green-200 text-left mb-12 bg-gray-100 rounded-lg shadow-lg p-6" style={{ backgroundColor: 'rgba(0, 40, 0, 0.6)' }}>
            <Divider style={{ color: 'white' }}>Producto</Divider>
            <p><strong>Nombre:</strong> {nombre}</p>
            <p><strong>Detalle:</strong> {detalle}</p>

          </h2>
        </div>

      </Drawer>
    </>
  );
};

export default MaterialDrawer;