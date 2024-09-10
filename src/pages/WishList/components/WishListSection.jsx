import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProductItem from './ProductItem';
import favoriteApi from '~/apis/favoriteApi';
import ProductSkeletonItem from '~/components/ProductSkeletonItem';

WishListSection.propTypes = {};

function WishListSection() {
  const { id } = useSelector((state) => state.user.current);
  const [favoriteProductsList, setFavoriteProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          setIsLoading(true);
          const params = { use_id: id };
          const response = await favoriteApi.getAll(params);
          setFavoriteProductsList(response);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      } catch (error) {
        throw new Error('Error in Get All Favorite Product');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reRenderFavoriteProductsList = () => {
    (async () => {
      try {
        if (id) {
          const params = { use_id: id };
          const response = await favoriteApi.getAll(params);
          setFavoriteProductsList(response);
        }
      } catch (error) {
        throw new Error('Error in Get All Favorite Product');
      }
    })();
  };

  const handleDeleteFavoriteProduct = async (data) => {
    try {
      await favoriteApi.delete(data);
      toast.success('Đã xóa sản phẩm khỏi danh sách yêu thích');
      reRenderFavoriteProductsList();
    } catch (error) {
      throw new Error('Error in delete product from wish list');
    }
  };

  const handleDeleteAllFavoriteProduct = async () => {
    try {
      if (id) {
        const params = { use_id: id };
        await favoriteApi.deleteAll(params);
        reRenderFavoriteProductsList();
      }
    } catch (error) {
      throw new Error('Error in Delete All Favorite Product');
    }
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl leading-snug text-black">
          Danh sách yêu thích <span>({favoriteProductsList.length})</span>
        </h2>
        <button
          onClick={handleDeleteAllFavoriteProduct}
          className="border-[rgba(0, 0, 0, 0.50)] flex items-center justify-center rounded border border-solid px-12 py-4 font-medium capitalize transition-colors hover:bg-[#DB4444] hover:text-[#FAFAFA]"
        >
          Xóa tất cả
        </button>
      </div>
      <div className="grid grid-cols-12 gap-16">
        {isLoading &&
          [...Array(8)].map((_, index) => {
            return (
              <div className="col-span-3 rounded bg-white" key={index}>
                <ProductSkeletonItem />
              </div>
            );
          })}
        {!isLoading &&
          favoriteProductsList.length > 0 &&
          favoriteProductsList.map((product, index) => {
            return (
              <div className="col-span-3" key={index}>
                <ProductItem
                  onDelete={handleDeleteFavoriteProduct}
                  product={product}
                />
              </div>
            );
          })}

        {!isLoading && favoriteProductsList.length === 0 && <div></div>}
      </div>
    </section>
  );
}

export default WishListSection;
