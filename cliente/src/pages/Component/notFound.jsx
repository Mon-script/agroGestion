import React from 'react';
import { useNavigate } from 'react-router';

export function NotFound() {

  const Navigate=useNavigate()
  return (
    <>
   
    <main className="grid mt-2 place-items-center bg-white px-0 py-24 sm:py-32 lg:px-0">
      <div className="text-center px-2">
        <p className="text-base font-semibold text-red-600">404</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Direccion equivocada!</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">No se encontro su recurso...</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={()=>{Navigate('/home')}}
          >
            Aqui para volver
          </a>
          <a href="#" className="text-sm font-semibold text-gray-900">
            Contacta a nuestro soporte <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  </>
  );
}


