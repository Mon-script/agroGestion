import React from 'react';
import { EditOutlined, EllipsisOutlined, SendOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Draweter from './drawer';
import Smodal from '../modal/modalwork'
import logo from '../../../assets/1.png';
import fondo from '../../../assets/2.png';

const { Meta } = Card;

const SiembraCard = ({ siembra }) => {
  const { nombre_producto, fecha_siembra, estado, actualizarSiembra } = siembra;

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
          <Smodal siembra={siembra} />,
          <Draweter siembra={siembra} actualizarSiembra={actualizarSiembra} key="edit" />,
        ]}
      >
        <Meta
          avatar={<Avatar src={logo} size={24} />} 
          title={
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {nombre_producto}
            </span>
          }
          description={
            <div style={{ fontSize: '10px', lineHeight: '1.2' }}> {/* Reducir fontSize y espaciamiento */}
              Estado de siembra: {estado}
              <br />
              Fecha de siembra: {new Date(fecha_siembra).toLocaleDateString()} 
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