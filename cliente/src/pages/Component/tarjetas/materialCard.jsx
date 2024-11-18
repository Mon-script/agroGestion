import React from 'react';
import { Avatar, Card } from 'antd';
import Draweter from './drawer';
import logo from '../../../assets/1.png';
import fondo from '../../../assets/2.png';
import MaterialDrawer from './materialDrawer';

const { Meta } = Card;

const MaterialCard = ({ nombre, detalle, id, actualizarMateriales, Form }) => {
  

  return (
    <>
      <Card
        style={{
          width: 250, 
          padding: '6px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', 
        }}
        cover={
          <img
            alt="agroGestion"
            src={fondo}
            style={{
              height: 150, 
              objectFit: 'cover',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
            }}
          />
        }
        actions={[
          <MaterialDrawer nombre={nombre} detalle={detalle} id={id} actualizarMateriales={actualizarMateriales} Form={Form} key="edit" />,
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
            <div style={{ fontSize: '10px', lineHeight: '1.2' }}> 
              Nombre: {nombre}
              <br />
              Detalle: {detalle} 
            </div>
          }
        />
      </Card>
    </>
  );
};

export default MaterialCard;