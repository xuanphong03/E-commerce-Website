import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

ProductDetail.propTypes = {};

function ProductDetail(props) {
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
