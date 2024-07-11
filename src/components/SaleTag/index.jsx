export default function SaleTag({ salePercent }) {
  return (
    <span className="block rounded bg-[#DB4444] px-3 py-1 font-poppins text-xs text-[#fafafa]">
      -{salePercent}%
    </span>
  );
}
