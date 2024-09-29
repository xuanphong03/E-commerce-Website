import { Route, Routes } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import ProductsList from './ProductsList';

function Product() {
  return (
    <div>
      <Routes>
        <Route path="/:category" element={<ProductsList />} />
        <Route path="/detail/:productId" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default Product;
