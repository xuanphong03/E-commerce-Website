import { useEffect } from 'react';
import WishListSection from './components/WishListSection';
// import RecommendForYouSection from './components/RecommendForYouSection';

function WishListPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);
  return (
    <main className="mx-auto mb-[140px] mt-[80px] flex max-w-[1300px] flex-col gap-[80px]">
      <div className="py-5">
        <WishListSection />
      </div>
      <div>{/* <RecommendForYouSection /> */}</div>
    </main>
  );
}

export default WishListPage;
