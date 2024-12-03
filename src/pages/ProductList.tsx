import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductsStore } from '../store/useProductsStore';
import ProductCard from '../components/ProductCard';
import ConfirmationModal from '../components/ConfirmationModal';

const ProductList = () => {
  const navigate = useNavigate();
  const { products, fetchProducts, toggleLike, deleteProduct, filterFavorites } = useProductsStore((state) => state);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCardClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  const handleFilterFavorites = () => {
    filterFavorites();
  };

  const handleShowAll = () => {
    fetchProducts();
  };

  const handleDeleteProduct = (id: number) => {
    setProductToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete !== null) {
      deleteProduct(productToDelete);
      setIsModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="product-list-container">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <div className="div-show">
        <button onClick={handleFilterFavorites} className="show-favorites-btn">
          Show Favorites
        </button>
        <button onClick={handleShowAll} className="show-all-btn">
          Show All
        </button>
      </div>
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onLike={() => toggleLike(product.id)}
              onDelete={() => handleDeleteProduct(product.id)} // Use the delete handler with modal
              onClick={() => handleCardClick(product.id)}
            />
          ))
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        productName={productToDelete !== null ? products.find((product) => product.id === productToDelete)?.title || 'Product' : ''}
      />
    </div>
  );
};

export default ProductList;
