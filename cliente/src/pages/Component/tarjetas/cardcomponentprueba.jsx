import React from 'react';

const CardComponent = ({ product, onEdit, onDelete }) => {
  return (
    <div className="cardc">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="cardc-body">
        <h5 className="cardc-title">{product.name}</h5>
        <p className="cardc-text">Precio: {product.price}</p>
        <p className="cardc-text">Empaquetado: {product.packaging}</p>
        <p className="cardc-text">Detalle: {product.detail}</p>
        <button onClick={() => onEdit(product)} className="btn btn-warning me-2">
          Editar
        </button>
        <button onClick={() => onDelete(product.id)} className="btn btn-danger">
          Borrar
        </button>
      </div>
    </div>
  );
};

export default CardComponent;

