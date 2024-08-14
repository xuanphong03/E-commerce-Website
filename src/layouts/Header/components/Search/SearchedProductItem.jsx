import PropTypes from 'prop-types';

SearchedProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

function SearchedProductItem({ product }) {
  return (
    <article className="flex items-center gap-4">
      <div className="h-12 w-12">
        <img
          className="max-h-full"
          alt="product image"
          src={product.imageMain}
        />
      </div>
      <div className="">
        <h4 className="mb-2 font-medium leading-none text-black">
          {product.name}
        </h4>
        <p className="text-sm italic leading-none text-[#9A91A7]">
          {product.category}
        </p>
      </div>
    </article>
  );
}

export default SearchedProductItem;
