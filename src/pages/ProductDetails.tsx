import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductsStore } from '../store/useProductsStore';

type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  liked: boolean;
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProductsStore(state => state);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const selectedProduct = products.find(product => product.id === parseInt(id));
      setProduct(selectedProduct || null); 
    }
  }, [id, products]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="product-details">
      <h2 className="product-title">{product.title}</h2>
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
      {/* <p>Liked: {product.liked ? "Yes" : "No"}</p> */}
      <p className="product-description">{product.description}</p>
      <button
        onClick={() => navigate('/products')}
        className="back-button"
      >
        Back to Products
      </button>
    </div>
  );
};

export default ProductDetails;
