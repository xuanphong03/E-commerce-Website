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
      <hr className="my-2"></hr>
      <div className="grid grid-cols-12 gap-20">
        {products.length > 0 ? (
          products.map((product) => {
            return (
              <div className="col-span-3" key={uuidv4()}>
                <ProductItem product={product} />
              </div>
            );
          })
        ) : (
          <p className="col-span-12 py-2 text-center text-sm">
            Không có sản phẩm liên quan
          </p>
        )}
      </div>
    </Fragment>
  );
}

export default RelatedProducts;
