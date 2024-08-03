import Account from './components/Account';
import Introduce from './components/Introduce';
import QuickLink from './components/QuickLink';
import Support from './components/Support';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto flex max-w-[1300px] justify-between gap-20 py-14">
        <Introduce />
        <Support />
        <Account />
        <QuickLink />
      </div>
      <p className="pb-6 text-center text-sm text-white">
        Copyright ThangLong University 2024. All right reserved
      </p>
    </footer>
  );
}
