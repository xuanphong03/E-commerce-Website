import { useEffect } from 'react';
import BestSellingSection from './components/BestSellingSection';
import BrowseByCategorySection from './components/BrowseByCategorySection';
import ExploreProductSection from './components/ExploreProductSection';
import FeaturedSection from './components/FeaturedSection';
import FlashSalesSection from './components/FlashSalesSection';
import IntroduceSection from './components/IntroduceSection';
import ServiceSection from './components/ServiceSection';

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
      <div className="mx-auto max-w-[1300px]">
        <IntroduceSection />
        <FlashSalesSection />
        <BrowseByCategorySection />
        <BestSellingSection />
        <ExploreProductSection />
        <FeaturedSection />
        <ServiceSection />
      </div>
    </main>
  );
}
