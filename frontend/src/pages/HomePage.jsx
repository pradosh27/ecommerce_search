import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import Toast from '../components/Toast';
import { fetchProducts } from '../services/api';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(searchTerm);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      getProducts();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="home-page">
      <h1 style={{color : "green" , fontSize : "3rem"}}> Welcome to E-commerce Store</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {error && <Toast message={error} onClose={() => setError(null)} />}
      
      {loading ? (
        <Spinner />
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => handleProductClick(product.id)} 
            />
          ))}
        </div>
      )}
      
      {!loading && products.length === 0 && (
        <p className="no-results">No products found. Try a different search term.</p>
      )}
    </div>
  );
}

export default HomePage;