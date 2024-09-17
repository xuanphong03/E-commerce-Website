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
import 'react-toastify/dist/ReactToastify.css';

import OrdersPage from './pages/Order';
import CheckOutPage from './pages/CheckOut/CheckOutPage';
import Product from './pages/Products';
import ChatBox from './components/Chat';
import { useSelector } from 'react-redux';
import PaymentByVNPay from './pages/CheckOut/PaymentByVNPay';
import PaymentByCOD from './pages/CheckOut/PaymentByCOD';
import AccountManagement from './pages/Account';
import ReviewPage from './pages/Review';
import ForgotPasswordPage from './pages/Auth/ForgotPassword';

function App() {
  const infoUser = useSelector((state) => state.user.current);
  const isAuthenticated = !!infoUser.id;

  return (
    <div className="relative font-roboto">
      <Header />
      <div className="mt-[124px]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/payment/result" element={<PaymentByVNPay />} />
          <Route path="/payment/cod" element={<PaymentByCOD />} />
          <Route path="/my-orders/:orderStatus/*" element={<OrdersPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-in/identify" element={<ForgotPasswordPage />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/products/*" element={<Product />} />
          <Route path="/account/*" element={<AccountManagement />} />
          <Route path="/my-reviews/*" element={<ReviewPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ToastContainer />
      </div>
      <Footer />
      {isAuthenticated && <ChatBox />}
    </div>
  );
}

export default App;
