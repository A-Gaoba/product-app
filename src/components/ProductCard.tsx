import React from 'react';

type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  liked: boolean;
};

interface ProductCardProps {
  product: Product;
  onLike: () => void;
  onDelete: () => void;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onLike, onDelete, onClick }) => {
  const { title, description, image, liked } = product;

  return (
    <div className="product-card p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer min-h-[400px]" onClick={onClick}>
      <img src={image} alt={title} className="w-full h-56 object-cover rounded-t-lg mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description.slice(0, 100)}...</p>
      <div className="product-actions flex gap-4 mt-auto">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering onClick of the card
            onLike();
          }}
          className={`px-4 py-2 rounded-lg ${liked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'} transition-colors`}
        >
          {liked ? '❤️ Liked' : '♡ Like'}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            onDelete();
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
