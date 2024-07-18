import { useEffect, useRef, useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import productApi from '~/apis/productApi';
import { useDebounce } from '~/hooks/useDebounce';
import SearchedProductItem from './SearchedProductItem';
import SearchedSkeletonItem from './SearchedSkeletonItem';
import { Link } from 'react-router-dom';

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showRecommendedSearch, setShowRecommendedSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const debounced = useDebounce(searchTerm, 1000);

  const recommendSearchBoxRef = useRef(null);
  useEffect(() => {
    let handler = (e) => {
      if (!recommendSearchBoxRef.current.contains(e.target)) {
        setShowRecommendedSearch(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);
  useEffect(() => {
    setLoading(true);

    (async () => {
      if (!searchTerm.trim()) return;
      try {
        const res = await productApi.getAll({ q: debounced });
        setSearchResult(res.products.slice(0, 5));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const handleSearch = () => {
    if (!searchTerm) return;
    setShowRecommendedSearch(false);
  };

  const handleSearchChange = (e) => {
    let searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    if (!searchTerm.trim()) {
      setShowRecommendedSearch(false);
      return;
    }
    setShowRecommendedSearch(true);
  };

  const handleOnClickRecommendedProduct = () => {
    setSearchTerm('');
    setShowRecommendedSearch(false);
  };

  return (
    <div
      ref={recommendSearchBoxRef}
      className="relative flex w-2/3 items-center rounded bg-[#f5f5f5] py-2 pl-5 pr-3 lg:w-80"
    >
      <input
        autoComplete="false"
        onFocus={() => {
          if (searchTerm) {
            setShowRecommendedSearch(true);
          }
        }}
        onChange={handleSearchChange}
        value={searchTerm}
        id="product-searchTerm"
        type="text"
        placeholder="Bạn đang tìm kiếm cái gì?"
        className="w-full bg-[#f5f5f5] pr-10 text-sm outline-none lg:text-base"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <label
        htmlFor="product-searchTerm"
        className="absolute right-0 top-0 flex h-full w-10 cursor-pointer items-center justify-center rounded-r bg-[#4E4B66] text-xl text-white"
        onClick={handleSearch}
      >
        <LuSearch />
      </label>
      {showRecommendedSearch && (
        <div className="search-box absolute left-0 right-0 top-[calc(100%+12px)] w-full rounded bg-white p-2">
          <h3 className="mb-4 text-lg font-medium text-gray-700">
            Tìm kiếm sản phẩm
          </h3>
          <div className="flex flex-col gap-4">
            {!loading &&
              searchResult.length > 0 &&
              searchResult.map((product, index) => {
                return (
                  <Link
                    to={`products-detail/${product.id}`}
                    key={index}
                    className="block cursor-pointer rounded bg-white p-1 transition-colors hover:bg-slate-200"
                    onClick={handleOnClickRecommendedProduct}
                  >
                    <SearchedProductItem
                      searchTerm={searchTerm}
                      productName={product.name}
                      productCategory={product.category}
                    />
                  </Link>
                );
              })}
            {!loading && !searchResult.length && <p>Không tìm thấy sản phẩm</p>}
            {loading &&
              [...Array(5)].map((_, index) => {
                return <SearchedSkeletonItem key={index} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBox;
