import { useEffect } from 'react';
import BestSellingSection from './components/BestSellingSection';
import ExploreProductSection from './components/ExploreProductSection';
import FlashSalesSection from './components/FlashSalesSection';
import IntroduceSection from './components/IntroduceSection';

export default function HomePage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <main className="bg-white">
      <IntroduceSection />
      <div className="mx-auto max-w-[1300px] py-20">
        <FlashSalesSection />
        <BestSellingSection />
        <ExploreProductSection />
      </div>
    </main>
  );
}
