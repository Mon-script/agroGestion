import React from 'react';
import { EditOutlined, EllipsisOutlined, SendOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Draweter from './drawer';
import logo from '../../../assets/1.png';
import fondo from '../../../assets/2.png';

const { Meta } = Card;

const SiembraCard = ({ siembra }) => {
  const { nombre_producto, fecha_siembra, estado } = siembra;

  return (
    <>
      <Card
        style={{
          width: 250, // Reducir aún más el ancho
          padding: '6px', // Reducir el padding
          borderRadius: '8px', // Añadir bordes redondeados
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', // Sombra suave
        }}
        cover={
          <img
            alt="agroGestion"
            src={fondo}
            style={{
              height: 150, // Ajustar altura de la imagen
              objectFit: 'cover',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
            }}
          />
        }
        actions={[
          <SendOutlined key="send" />,
          <Draweter siembra={siembra} key="edit" />,
        ]}
      >
        <Meta
          avatar={<Avatar src={logo} size={24} />} // Reducir el tamaño del avatar
          title={
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {nombre_producto}
            </span>
          }
          description={
            <div style={{ fontSize: '10px', lineHeight: '1.2' }}> {/* Reducir fontSize y espaciamiento */}
              Estado de siembra: {estado}
              <br />
              Fecha de siembra: {new Date(fecha_siembra).toLocaleDateString()} {/* Formato de fecha más corto */}
            </div>
          }
        />
      </Card>
    </>
  );
};

export default SiembraCard;

/* 

SiembraCard


*/