import PropTypes from 'prop-types';
import { Fragment } from 'react';
import SectionTag from '~/components/SectionTag';
import { v4 as uuidv4 } from 'uuid';
import ProductItem from '~/components/ProductItem';

RelatedProducts.propTypes = {
  products: PropTypes.array,
};

function RelatedProducts({ products = [] }) {
  return (
    <Fragment>
      <div className="mb-5">
        <SectionTag content="Sản phẩm liên quan" />
      </div>
      <div className="grid grid-cols-12 gap-20">
        {products.map((product) => {
          return (
            <div className="col-span-3" key={uuidv4()}>
              <ProductItem product={product} />
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}

export default RelatedProducts;
