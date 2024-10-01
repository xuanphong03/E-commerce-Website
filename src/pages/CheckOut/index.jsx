import { Route, Routes } from 'react-router-dom';
import PaymentByCOD from './PaymentByCOD';
import PaymentByVNPay from './PaymentByVNPay';
import { createContext, useState } from 'react';
import ErrorPage from '../Error';
import InvoicePage from './InvoicePage';
import PaymentByVietQR from './components/PaymentByVietQR';

export const CheckoutContext = createContext();

function CheckOutPage() {
  const [discountCode, setDiscountCode] = useState('');

  return (
    <CheckoutContext.Provider value={{ discountCode, setDiscountCode }}>
      <Routes>
        <Route path="/" element={<InvoicePage />} />
        <Route path="/payment-cod-result" element={<PaymentByCOD />} />
        <Route path="/payment-vnp-result" element={<PaymentByVNPay />} />
        <Route path="/vietqr" element={<PaymentByVietQR />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </CheckoutContext.Provider>
  );
}

export default CheckOutPage;
