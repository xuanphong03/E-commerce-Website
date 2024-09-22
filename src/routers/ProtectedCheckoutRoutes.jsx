import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedCheckoutRoutes() {
  const quantityOrderedProduct = useSelector(
    (state) => state.cart.totalQuantity,
  );
  const isHasPermission = quantityOrderedProduct > 0;

  return isHasPermission ? <Outlet /> : <Navigate to="/cart" />;
}

export default ProtectedCheckoutRoutes;
