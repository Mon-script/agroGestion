import { Sidebar } from "keep-react";
import { TeamOutlined, UserAddOutlined, CloseCircleFilled } from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import {
  Storefront,
  ArrowCircleLeft,
  StackOverflowLogo,
  ArrowCircleRight,
} from "phosphor-react";
import logo from '../../assets/2.png';
import React, { useContext } from 'react';
import { UserContext } from '../../userContext';

export const SidebarComponent = () => {
  const { user, setUser } = useContext(UserContext);

  const logOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  }


  const menuItemsAd = [
    { id: 1, nombre: 'Producto', ruta: '/producto', icono: <Storefront size={32} color="#7376a0" /> },
    { id: 2, nombre: 'Stock', ruta: '/stock', icono: <StackOverflowLogo size={32} color="#0715cf" /> },
    { id: 3, nombre: 'Entrada', ruta: '/entrada', icono: <ArrowCircleRight size={32} color="#0adb23" /> },
    { id: 4, nombre: 'Salida', ruta: '/salida', icono: <ArrowCircleLeft size={32} color="#db0a0a" /> },
    { id: 5, nombre: 'Registro', ruta: '/registro', icono: <UserAddOutlined size={32} color="#db0a0a" /> },
    { id: 6, nombre: 'Personal', ruta: '/personal', icono: <TeamOutlined size={32} color="#db0a0a" /> },
  ];

  const menuItems = [
    { id: 1, nombre: 'Producto', ruta: '/producto', icono: <Storefront size={32} color="#7376a0" /> },
    { id: 2, nombre: 'Stock', ruta: '/stock', icono: <StackOverflowLogo size={32} color="#0715cf" /> },
    { id: 3, nombre: 'Entrada', ruta: '/entrada', icono: <ArrowCircleRight size={32} color="#0adb23" /> },
    { id: 4, nombre: 'Salida', ruta: '/salida', icono: <ArrowCircleLeft size={32} color="#db0a0a" /> },
  ];

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <img src={logo} alt="" className='w-[150px] h-[150px] border rounded p-1' />
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {(user && user.role === 'admin' ? menuItemsAd : menuItems).map(element => (
            <Sidebar.Item icon={element.icono} key={element.id} style={{ marginTop: '4vh', padding: '2vw' }}>
              <NavLink to={element.ruta} style={{ cursor: 'pointer' }}>{element.nombre}</NavLink>
            </Sidebar.Item>
          ))}
          <Sidebar.Item icon={<CloseCircleFilled />} style={{ marginTop: '4vh', padding: '2vw' }}>
            <button onClick={logOut} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
              Cerrar sesión
            </button>
          </Sidebar.Item>

        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
