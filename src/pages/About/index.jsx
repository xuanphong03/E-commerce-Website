import Introduce from './components/Introduce';
import AboutBanner from '~/assets/images/about.webp';
import Mission from './components/Mission';
import CoreValues from './components/CoreValues';
export default function AboutPage() {
  return (
    <main className="pb-[140px]">
      <div className="h-[600px] w-full">
        <img src={AboutBanner} className="h-full w-full object-cover" />
      </div>
      <div className="mx-auto mt-10 flex max-w-[1300px] flex-col gap-5 pt-10">
        <Introduce />
        <Mission />
      </div>
      <div className="mx-auto mt-20 max-w-[1300px]">
        <CoreValues />
      </div>
    </main>
  );
}
