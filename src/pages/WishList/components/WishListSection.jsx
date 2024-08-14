import ProductImage from '~/assets/images/product01.png';
import ProductItem from './ProductItem';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import favoriteApi from '~/apis/favoriteApi';

WishListSection.propTypes = {};

function WishListSection() {
  const { id } = useSelector((state) => state.user.current);
  const [favoriteProductsList, setFavoriteProductsList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const params = { use_id: id };
          const response = await favoriteApi.getAll(params);
          console.log('Favorite Products List: ', response);
          setFavoriteProductsList(response);
        }
      } catch (error) {
        throw new Error('Error in Get All Favorite Product');
      }
    })();
  }, []);

  return (
    <section className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl leading-snug text-black">
          Danh sách yêu thích <span>({favoriteProductsList.length})</span>
        </h2>
        <button className="border-[rgba(0, 0, 0, 0.50)] flex items-center justify-center rounded border border-solid px-12 py-4 font-medium capitalize transition-colors hover:bg-[#DB4444] hover:text-[#FAFAFA]">
          Xóa tất cả
        </button>
      </div>
      <div className="grid grid-cols-12 gap-16">
        {favoriteProductsList.map((product, index) => {
          return (
            <div className="col-span-3" key={index}>
              <ProductItem product={product} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WishListSection;
