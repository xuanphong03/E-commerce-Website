import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';

ProductDetail.propTypes = {};

function ProductDetail(props) {
  let { productId } = useParams();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);
  return <div>Product Detail </div>;
}

export default ProductDetail;
