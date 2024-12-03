import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductsStore } from '../store/useProductsStore';

const CreateProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useProductsStore(state => state);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(), // Generate a simple ID for the product
      title,
      description,
      image,
      liked: false,
    };
    addProduct(newProduct);
    navigate('/products');
  };

  return (
    <div>
      <h2>Create a New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Product Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
