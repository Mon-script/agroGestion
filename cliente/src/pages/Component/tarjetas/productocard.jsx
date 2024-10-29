import React from 'react';
import TarjetaProducto from './TarjetaProducto';

const ProductoCard = ({ files }) => {
  // Ordenar los archivos numéricamente
  files.sort((a, b) => {
    const numA = parseInt(a.split("-")[0]);
    const numB = parseInt(b.split("-")[0]);
    return numA - numB;
  });

  return (
    <> 
    <div className="contenerdorTarjetaProducto" style={{display:'flex', flexWrap:'wrap'}}>
    {files.map((avatar) => (
     <TarjetaProducto key={avatar} avatar={avatar} />
       ))}
    </div>
    </>
  );
};

export default ProductoCard;


/*{<div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-md">
   <img src={} alt='...' className="w-full h-auto rounded-lg mb-2" />
   <p className="text-white text-lg font-semibold">hola</p>
 </div>}*/ 

 /* <div key={avatar} className="bg-white bg-opacity-20 p-4 rounded-lg shadow-md">
        <img src={'http://localhost:3000/'+ avatar} alt='...' className="w-full h-auto rounded-lg mb-2" />
        <p className="text-white text-lg font-semibold">hola</p>
      </div> */