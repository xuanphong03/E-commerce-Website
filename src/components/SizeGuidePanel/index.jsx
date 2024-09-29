import { IoMdClose } from 'react-icons/io';
import PantsSizeGuide from './PantsSizeGuide';
import ShirtSizeGuide from './ShirtSizeGuide';

function SizeGuidePanel({ type, onClose }) {
  const handleCloseForm = () => {
    if (onClose) {
      onClose();
    }
  };
  return (
    <div className="w-175 flex max-h-screen flex-col gap-3 overflow-y-auto rounded bg-white px-4 py-3">
      <div className="flex justify-between">
        <h2 className="font-bold">Kích thước sản phẩm</h2>
        <button
          onClick={handleCloseForm}
          className="flex size-8 items-center justify-center rounded-sm text-xl hover:bg-slate-200"
        >
          <IoMdClose />
        </button>
      </div>
      <hr></hr>
      <div className="w-full">
        {type === 'Áo' ? <ShirtSizeGuide /> : <PantsSizeGuide />}
      </div>
    </div>
  );
}

export default SizeGuidePanel;
