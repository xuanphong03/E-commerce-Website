import ShirtSizeGuideImage from '~/assets/images/shirt_size_guide.webp';

function ShirtSizeGuide() {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Size</th>
              <th className="border border-gray-300 px-4 py-2">Vai</th>
              <th className="border border-gray-300 px-4 py-2">Ngực</th>
              <th className="border border-gray-300 px-4 py-2">Tay Áo</th>
              <th className="border border-gray-300 px-4 py-2">Dài Áo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-center">
                S
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                46
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                108
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                58
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                69
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-center">
                M
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                47
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                112
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                59
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                71
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-center">
                L
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                48
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                116
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                60
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                73
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-center">
                XL
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                49
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                120
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                61
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                75
              </td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2 text-sm">
          *Dữ liệu này có được bằng cách đo thủ công sản phẩm , các phép đo có
          thể bị thay đổi 1-2 CM.
        </p>
      </div>
      <hr></hr>
      <div className="space-y-2 text-sm">
        <div className="flex items-center">
          <div className="max-w-1/2 basis-1/2">
            <h3 className="font-bold">Cách đo kích thước sản phẩm ?</h3>
            <ul className="mt-1 space-y-1">
              <li>
                <h4 className="font-bold">1. Vai</h4>
                <p>Đo từ đỉnh vai bên này sang bên kia.</p>
              </li>
              <li>
                <h4 className="font-bold">2. Ngực</h4>
                <p>
                  Từ nách hạ xuống 2cm, đo thẳng từ nách bên này sang nách bên
                  kia.
                </p>
              </li>
              <li>
                <h4 className="font-bold">3. Chiều dài</h4>
                <p>Đo thân trước từ sát mí chân cổ trước đến lai áo.</p>
              </li>
              <li>
                <h4 className="font-bold">4. Tay áo</h4>
                <p>Đo từ đỉnh vai đến cuối tay áo.</p>
              </li>
            </ul>
          </div>
          <div className="max-w-1/2 basis-1/2">
            <img
              alt="preview image"
              src={ShirtSizeGuideImage}
              className="max-h-full max-w-full object-cover"
            />
          </div>
        </div>
        <p>
          * Tuỳ thuộc vào fom dáng của mỗi người và thói quen mặc quần áo, các
          thông số trên giúp bạn lựa chọn size dễ dàng hơn.
        </p>
      </div>
    </div>
  );
}

export default ShirtSizeGuide;
