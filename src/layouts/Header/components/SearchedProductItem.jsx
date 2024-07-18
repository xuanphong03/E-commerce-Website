import PropTypes from 'prop-types';

SearchedProductItem.propTypes = {
  productName: PropTypes.string,
  productCategory: PropTypes.string,
};

function SearchedProductItem({ productName, productCategory }) {
  return (
    <article className="flex items-center gap-4">
      <div className="h-12 w-12">
        <img
          className="max-h-full"
          alt="product image"
          src="https://s3-alpha-sig.figma.com/img/ee9a/3800/1e9f94261b28e16ea21bacb4144473e8?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=X0pKQz8Vp8ZCxrPqEmBL7GtGQj2BsnT4A1OmRIDqo8GyldgGXe9nVGWRKxl9at1fFSuO~zuAtFS5-n0k2sekdXytZkW~v51bqjmtT14Vv9T2RdsEDtOzOwMAgwrrjK1DKtTdKBhintCDLsr~ihQImCCLNXUCYEGIdwJDmeDWDcZuiGOvmU9rZU6AftStSOm6SCP6fMD4gB25OdWJDpuf9Xp7r3pWyQ9bVcCciOQEYP88YrxI37DsSqli2zDQNQEZHMYRYFxWBz7PlgcMldKyNEm0yp9x0UUjQnKa8Dq0M8BqwMOpUfdhNgQz-O0G-6FDyQyKZMNgnys-KbysxrEEew__"
        />
      </div>
      <div className="font-poppins">
        <h4 className="mb-2 font-medium leading-none text-black">
          {productName}
        </h4>
        <p className="text-sm italic leading-none text-[#9A91A7]">
          {productCategory}
        </p>
      </div>
    </article>
  );
}

export default SearchedProductItem;
