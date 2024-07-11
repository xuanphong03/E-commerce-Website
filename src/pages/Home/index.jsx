import FlashSalesSection from './components/FlashSalesSection';
import IntroduceSection from './components/IntroduceSection';

export default function HomePage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-[1300px]">
        <IntroduceSection />
        <FlashSalesSection />
      </div>
    </main>
  );
}
