import { Sidebar } from "keep-react";
import { TeamOutlined, UserAddOutlined, CloseCircleFilled, SunOutlined, TruckOutlined, StarOutlined, ShopOutlined, MoonOutlined, RubyOutlined, ControlOutlined } from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import logo from '../../assets/WhatsApp Image 2024-11-11 at 16.08.54.jpeg';
import React, { useContext } from 'react';
import { UserContext } from '../../userContext';

export const SidebarComponent = () => {
  const { user, setUser } = useContext(UserContext);

  const logOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = 'http://localhost:6969/';
  }


  const menuItemsAd = [
    { id: 0, nombre: 'Siembras', ruta: '/siembra', icono: <SunOutlined size={32} color="#7376a0" /> },
    { id: 1, nombre: 'Cosechas', ruta: '/cosecha', icono: <MoonOutlined size={32} color="#7376a0" /> },
    { id: 2, nombre: 'Productos', ruta: '/producto', icono: <StarOutlined size={32} color="#7376a0" /> },
    { id: 3, nombre: 'Stock', ruta: '/stock', icono: <ShopOutlined size={32} color="#0715cf" /> },
    { id: 4, nombre: 'Entradas', ruta: '/entrada', icono: <RubyOutlined size={32} color="#0adb23" /> },
    { id: 5, nombre: 'Salidas', ruta: '/salida', icono: <TruckOutlined size={32} color="#db0a0a" /> },
    { id: 6, nombre: 'Registro', ruta: '/registro', icono: <UserAddOutlined size={32} color="#db0a0a" /> },
    { id: 7, nombre: 'Materiales', ruta: '/materiales', icono: <ControlOutlined size={32} color="#db0a0a" /> },
    { id: 8, nombre: 'Personal', ruta: '/personal', icono: <TeamOutlined size={32} color="#db0a0a" /> },
  ];

  const menuItems = [
    { id: 0, nombre: 'Siembras', ruta: '/siembra', icono: <SunOutlined size={32} color="#7376a0" /> },
    { id: 1, nombre: 'Cosechas', ruta: '/cosecha', icono: <MoonOutlined size={32} color="#7376a0" /> },
    { id: 2, nombre: 'Productos', ruta: '/producto', icono: <StarOutlined size={32} color="#7376a0" /> },
    { id: 3, nombre: 'Stock', ruta: '/stock', icono: <ShopOutlined size={32} color="#0715cf" /> },
    { id: 4, nombre: 'Entradas', ruta: '/entrada', icono: <RubyOutlined size={32} color="#0adb23" /> },
    { id: 5, nombre: 'Salidas', ruta: '/salida', icono: <TruckOutlined size={32} color="#db0a0a" /> },
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
            <button
              onClick={() => {
                logOut()
              }}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
            >
              Cerrar sesión
            </button>
          </Sidebar.Item>


        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
