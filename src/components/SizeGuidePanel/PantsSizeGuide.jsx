import PantsSizeGuideImage from '~/assets/images/pants_size_guide.webp';

PantsSizeGuide.propTypes = {};

function PantsSizeGuide() {
  return (
    <div className="flex flex-col gap-3">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Size</th>
            <th className="border border-gray-300 px-4 py-2">Lưng</th>
            <th className="border border-gray-300 px-4 py-2">Mông</th>
            <th className="border border-gray-300 px-4 py-2">Đáy Quần</th>
            <th className="border border-gray-300 px-4 py-2">Đùi</th>
            <th className="border border-gray-300 px-4 py-2">Ống</th>
            <th className="border border-gray-300 px-4 py-2">Dài Quần</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2 text-center">29</td>
            <td className="border border-gray-300 px-4 py-2 text-center">76</td>
            <td className="border border-gray-300 px-4 py-2 text-center">93</td>
            <td className="border border-gray-300 px-4 py-2 text-center">26</td>
            <td className="border border-gray-300 px-4 py-2 text-center">55</td>
            <td className="border border-gray-300 px-4 py-2 text-center">32</td>
            <td className="border border-gray-300 px-4 py-2 text-center">97</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 text-center">30</td>
            <td className="border border-gray-300 px-4 py-2 text-center">78</td>
            <td className="border border-gray-300 px-4 py-2 text-center">95</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              26.5
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">57</td>
            <td className="border border-gray-300 px-4 py-2 text-center">33</td>
            <td className="border border-gray-300 px-4 py-2 text-center">98</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 text-center">31</td>
            <td className="border border-gray-300 px-4 py-2 text-center">81</td>
            <td className="border border-gray-300 px-4 py-2 text-center">97</td>
            <td className="border border-gray-300 px-4 py-2 text-center">27</td>
            <td className="border border-gray-300 px-4 py-2 text-center">58</td>
            <td className="border border-gray-300 px-4 py-2 text-center">34</td>
            <td className="border border-gray-300 px-4 py-2 text-center">99</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 text-center">32</td>
            <td className="border border-gray-300 px-4 py-2 text-center">83</td>
            <td className="border border-gray-300 px-4 py-2 text-center">99</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              27.5
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">60</td>
            <td className="border border-gray-300 px-4 py-2 text-center">35</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              100
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 text-center">34</td>
            <td className="border border-gray-300 px-4 py-2 text-center">86</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              102
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">28</td>
            <td className="border border-gray-300 px-4 py-2 text-center">61</td>
            <td className="border border-gray-300 px-4 py-2 text-center">36</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              101
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 text-center">36</td>
            <td className="border border-gray-300 px-4 py-2 text-center">90</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              105
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              28.5
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">63</td>
            <td className="border border-gray-300 px-4 py-2 text-center">37</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              102
            </td>
          </tr>
        </tbody>
      </table>

      <hr></hr>
      <div className="space-y-2 text-sm">
        <div className="flex">
          <div className="max-w-1/2 basis-1/2">
            <h3 className="font-bold">Cách đo kích thước sản phẩm ?</h3>
            <ul className="mt-1 space-y-1">
              <li>
                <h4 className="font-bold">1. Lưng</h4>
                <p>Đo thẳng trên đầu của cạp quần từ mép này sang mép kia.</p>
              </li>
              <li>
                <h4 className="font-bold">2. Mông</h4>
                <p>
                  Đo phần cao nhất của vùng mông. Đo chiều rộng từ mặt trước, từ
                  trái sang phải.
                </p>
              </li>
              <li>
                <h4 className="font-bold">3. Đáy quần</h4>
                <p>Đo chiều dài từ thắt lưng xuống phần đáy quần.</p>
              </li>
              <li>
                <h4 className="font-bold">4. Đùi</h4>
                <p>
                  Đo hạ xuống cách đáy 2cm,đo chiều rộng từ mặt trước, từ trái
                  sang phải.
                </p>
              </li>
              <li>
                <h4 className="font-bold">5. Ống</h4>
                <p>
                  Đo thẳng từ đường may đũng quần đến mặt ngoài của ống chân.
                </p>
              </li>
              <li>
                <h4 className="font-bold">6. Dài quần</h4>
                <p>Đo thẳng từ lưng quần đến lai quần.</p>
              </li>
            </ul>
          </div>
          <div className="max-w-1/2 basis-1/2">
            <img
              alt="preview image"
              src={PantsSizeGuideImage}
              className="mx-auto max-w-[60%] object-cover"
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

export default PantsSizeGuide;
