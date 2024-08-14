import { Rating } from '@mui/material';

function ProductSkeletonItem() {
  return (
    <article className="flex animate-pulse flex-col gap-4">
      <div className="relative flex h-[250px] items-center justify-center rounded bg-[#f5f5f5]">
        <img
          alt="product image"
          src="https://placehold.co/200x200"
          className="max-h-[80%]"
        />
      </div>
      <div>
        <h3 className="mb-2 line-clamp-1 h-3 w-52 rounded bg-[#e8e7e7] font-medium"></h3>
        <p className="mb-2 h-3 w-20 rounded bg-[#e8e7e7]"></p>
        <div className="flex items-center gap-2 text-sm">
          <Rating name="read-only" value={0} readOnly />
          <span className="font-semibold text-[#A0A0A0]">(0)</span>
        </div>
      </div>
    </article>
  );
}

export default ProductSkeletonItem;
