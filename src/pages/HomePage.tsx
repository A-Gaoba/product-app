import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="welcome-heading">Welcome to Our Website!</h1>
      <p className="description">Explore our amazing products and more.</p>
      <Link to="/products">
        <button className="view-products-btn">View Products</button>
      </Link>
    </div>
  );
};

export default HomePage;
