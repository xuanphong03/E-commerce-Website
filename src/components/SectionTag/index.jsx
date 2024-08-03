export default function SectionTag({ content }) {
  return (
    <p className="flex items-center gap-4 font-semibold leading-tight text-[#DB4444]">
      <span className="block h-10 w-5 rounded bg-[#DB4444]"></span>
      {content}
    </p>
  );
}
