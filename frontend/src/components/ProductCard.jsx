import React from 'react';

function ProductCard({ product, onClick }) {
  return (
    <div className="product-card" onClick={onClick}>
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">${product.price.toFixed(2)}</p>
        <p className="brand">{product.brand}</p>
        <p className="category">{product.category}</p>
      </div>
    </div>
  );
}

export default ProductCard;