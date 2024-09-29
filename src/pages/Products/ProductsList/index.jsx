import { Pagination } from '@mui/material';
import queryString from 'query-string';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import productApi from '~/apis/productApi';
import ProductItem from '~/components/ProductItem';
import ProductSkeletonItem from '~/components/ProductSkeletonItem';
import FilterByPrice from './components/FilterByPrice';
import FilterBySort from './components/FilterBySort';

function ProductsList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = useParams();

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    const categoryParam =
      category !== 'all_products' ? { categoryName: category } : {};
    return {
      ...params,
      ...categoryParam,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 20,
      _sort: params._sort || 'ASC',
    };
  }, [location.search, category]);

  const [productsList, setProductsList] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const [loading, setLoading] = useState(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
  });

  const handlePageChange = (event, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    setPagination((prev) => ({ ...prev, page }));
    navigate(`/products/${category}?${queryString.stringify(filters)}`);
  };

  const handleFiltersChange = (newFilters) => {
    if (!filtering) {
      setFiltering(true);
    }
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    navigate(`/products/${category}?${queryString.stringify(filters)}`);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      _page: 1,
      _limit: queryParams._limit || 20,
      _sort: 'ASC',
    };
    setFiltering(false);
    navigate(`/products/${category}?${queryString.stringify(resetFilters)}`);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setLoading(true);
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductsList(data);
        setPagination((prev) => ({
          ...prev,
          total: pagination._total,
          page: queryParams._page || 1,
        }));
      } catch (error) {
        throw new Error('Error in Products List');
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    })();
  }, [queryParams]);

  return (
    <main className="pb-20 pt-5">
      <div className="mx-auto max-w-[1300px] gap-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <h3 className="flex items-center gap-2 font-medium uppercase">
              <img
                src="https://icons.veryicon.com/png/o/miscellaneous/alicloud-official-website/filter-32.png"
                className="size-6"
              />
              Bộ lọc
            </h3>
            <FilterBySort
              onChange={handleFiltersChange}
              currentSort={queryParams._sort ?? 'ASC'}
            />
            <FilterByPrice
              priceGte={queryParams.price_gte ?? null}
              priceLte={queryParams.price_lte ?? null}
              onChange={handleFiltersChange}
            />
          </div>
          <button
            disabled={!filtering}
            onClick={handleResetFilters}
            className={`rounded px-5 py-2 text-white ${filtering ? 'cursor-pointer bg-red-500 hover:bg-opacity-80' : 'cursor-not-allowed bg-gray-300'}`}
          >
            Thiết lập lại bộ lọc
          </button>
        </div>
        <hr className="my-5"></hr>
        <div className="mt-5">
          <section className="grid grid-cols-10 gap-10">
            {loading &&
              [...Array(20)].map((_, index) => {
                return (
                  <div className="col-span-2 rounded bg-white" key={index}>
                    <ProductSkeletonItem />
                  </div>
                );
              })}
            {!loading &&
              productsList.length > 0 &&
              productsList.map((product) => {
                return (
                  <div className="col-span-2 rounded bg-white" key={product.id}>
                    <ProductItem product={product} />
                  </div>
                );
              })}
            {!loading && productsList.length === 0 && (
              <div className="col-span-12 flex justify-center rounded-md border border-solid border-gray-200 bg-white">
                <img src="https://xe2banh.com.vn/img/no-products.png" />
              </div>
            )}
          </section>
          {productsList.length > 0 && (
            <div className="m-10 flex justify-center">
              <Pagination
                count={Math.ceil(pagination.total / pagination.limit)}
                page={pagination.page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                color="primary"
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default ProductsList;
