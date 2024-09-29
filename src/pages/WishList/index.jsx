import WishListSection from './components/WishListSection';

function WishListPage() {
  return (
    <main className="mx-auto mb-[140px] mt-[80px] flex max-w-[1300px] flex-col gap-[80px]">
      <div className="py-5">
        <WishListSection />
      </div>
    </main>
  );
}

export default WishListPage;
