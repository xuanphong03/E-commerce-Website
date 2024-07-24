import { Route, Routes } from 'react-router-dom';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import { ToastContainer } from 'react-toastify';
import SignUpPage from './pages/Auth/SignUp';
import ContactPage from './pages/Contact';
import SignInPage from './pages/Auth/SignIn';
import ErrorPage from './pages/Error';
import WishListPage from './pages/WishList';
import CartPage from './pages/Cart';
import ProductsList from './pages/Products/ProductsList';
import ProductDetail from './pages/Products/ProductDetail';
import OrdersPage from './pages/Order';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/my-orders/:orderStatus/*" element={<OrdersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/wishlist" element={<WishListPage />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products-detail/:productId" element={<ProductDetail />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;
