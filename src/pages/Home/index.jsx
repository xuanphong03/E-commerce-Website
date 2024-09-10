import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import BestSellingSection from './components/BestSellingSection';
import ExploreProductSection from './components/ExploreProductSection';
import FlashSalesSection from './components/FlashSalesSection';
import IntroduceSection from './components/IntroduceSection';

export default function HomePage() {
  const { id } = useSelector((state) => state.user.current);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  return (
    <main className="bg-white">
      <IntroduceSection />
      <div className="mx-auto max-w-[1300px] py-20">
        <FlashSalesSection userId={id} />
        <BestSellingSection userId={id} />
        <ExploreProductSection userId={id} />
      </div>
    </main>
  );
}
