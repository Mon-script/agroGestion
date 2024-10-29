import { SidebarComponent } from '../Component/MenuLateral';
import { Outlet } from 'react-router-dom';


export const Root = () => {

   return(<>
    <div className="contenedor">
      <div className="sidebar-container">
        <SidebarComponent />
      </div>
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  </>) 
  }