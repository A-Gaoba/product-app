import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "./App.css"

const ProductList = React.lazy(() => import('./pages/ProductList'));
const ProductDetails = React.lazy(() => import('./pages/ProductDetails'));
const CreateProduct = React.lazy(() => import('./pages/CreateProduct'));

const App = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/create-product" element={<CreateProduct />} />
    </Routes>
  </React.Suspense>
);

export default App;
