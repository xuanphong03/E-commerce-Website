import ProductImage from '~/assets/images/product01.png';
import ProductItem from './ProductItem';

WishListSection.propTypes = {};

function WishListSection() {
  return (
    <section className="flex flex-col gap-[60px]">
      <div className="flex items-center justify-between">
        <h2 className="font-poppins text-xl leading-snug text-black">
          Danh sách yêu thích <span>(4)</span>
        </h2>
        <button className="border-[rgba(0, 0, 0, 0.50)] flex items-center justify-center rounded border border-solid px-12 py-4 font-poppins font-medium capitalize transition-colors hover:bg-[#DB4444] hover:text-[#FAFAFA]">
          Xóa tất cả
        </button>
      </div>
      <div className="grid grid-cols-12 gap-16">
        {[...Array(5)].map((_, index) => {
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
                isInWishList={true}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WishListSection;
