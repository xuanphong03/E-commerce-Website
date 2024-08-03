import ProductItem from '~/components/ProductItem';
import SectionTag from '~/components/SectionTag';

import ProductImage from '~/assets/images/product01.png';
import { useTranslation } from 'react-i18next';

ExploreProductSection.propTypes = {};

function ExploreProductSection() {
  const { t } = useTranslation();

  // const [productsList, setProductsList] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     const res = await productApi.getAll();
  //     const { products } = res;
  //     setProductsList(products);
  //   })();
  // }, []);

  return (
    <section>
      <div className="mb-6">
        <SectionTag content={t('Subtitle Explore Our Products')} />
      </div>
      <h2 className="text-4xl font-semibold tracking-[1.44px]">
        {t('Title Explore Our Products')}
      </h2>
      <div className="my-[60px]">
        <div className="grid grid-cols-12 gap-16">
          {[...Array(8)].map((_, index) => {
            return (
              <div className="col-span-3" key={index}>
                <ProductItem
                  productImage={ProductImage}
                  productSalePercent={40}
                  productName="HAVIT HV-G92 GamepadHAVIT HV-G92 Gamepad"
                  productSalePrice={120}
                  productPrice={160}
                  productReviewRate={4.5}
                  productReviewNumber={88}
                  isNewProduct={true}
                />
              </div>
            );
          })}
          {/* {productsList.slice(0, 8).map((product, index) => {
            return (
              <div className="col-span-3" key={index}>
                <ProductItem
                  productImage={product.image}
                  productSalePercent={40}
                  productName={product.name}
                  productSalePrice={product.salePrice}
                  productPrice={product.price}
                  productReviewRate={product.rating}
                  productReviewNumber={product.nRating}
                  isNewProduct={product.newStatus}
                />
              </div>
            );
          })} */}
        </div>
      </div>
      <button className="mx-auto flex items-center justify-center rounded border-2 border-solid border-[#DB4444] bg-[#DB4444] px-10 py-2 font-medium text-[#FAFAFA] transition-colors hover:bg-[#FAFAFA] hover:text-[#DB4444]">
        {t('View All Products Button')}
      </button>
    </section>
  );
}

export default ExploreProductSection;
