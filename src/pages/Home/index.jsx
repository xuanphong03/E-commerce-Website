import { useSelector } from 'react-redux';
import BestSellingSection from './components/BestSellingSection';
import ExploreProductSection from './components/ExploreProductSection';
import FlashSalesSection from './components/FlashSalesSection';
import IntroduceSection from './components/IntroduceSection';

export default function HomePage() {
  const { id } = useSelector((state) => state.user.current);

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
