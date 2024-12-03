import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "./App.css"
import HomePage from './pages/HomePage';

const ProductList = React.lazy(() => import('./pages/ProductList'));
const ProductDetails = React.lazy(() => import('./pages/ProductDetails'));

const App = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
    </Routes>
  </React.Suspense>
);

export default App;
