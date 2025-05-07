import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Toast from '../components/Toast';
import { fetchProductById } from '../services/api';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  return (
    <div className="product-detail-page">
      <button onClick={() => navigate('/')} className="back-button">
        &larr; Back to Search
      </button>
      
      {error && <Toast message={error} onClose={() => setError(null)} />}
      
      {loading ? (
        <Spinner />
      ) : product ? (
        <div className="product-detail">
          <img src={product.imageUrl} alt={product.name} className="product-image" />
          <div className="product-info">
            <h2>{product.name}</h2>
            <p className="price">${product.price.toFixed(2)}</p>
            <p className="brand">Brand: {product.brand}</p>
            <p className="category">Category: {product.category}</p>
            <p className="description">{product.description}</p>
          </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
}

export default ProductDetailPage;