Mission.propTypes = {};

function Mission() {
  return (
    <section>
      <div className="flex items-center gap-10">
        <img
          src="https://theme.hstatic.net/1000306633/1001194548/14/slideshow_2.jpg?v=231"
          className="h-80 max-w-[50%] basis-1/2 rounded-md object-cover"
        />
        <div className="max-w-[50%] basis-1/2 text-right">
          <h2 className="mb-4 text-right text-2xl font-semibold">
            Sứ mệnh của chúng tôi
          </h2>
          <p>
            Chúng tôi không chỉ bán quần áo, mà còn tạo ra phong cách sống. Mỗi
            sản phẩm tại SomeHow đều được tuyển chọn kỹ lưỡng, từ chất liệu đến
            thiết kế, nhằm mang đến cho bạn những trải nghiệm thời trang thoải
            mái và tự tin. Sứ mệnh của chúng tôi là giúp bạn thể hiện phong cách
            riêng biệt và sự tự tin trong từng khoảnh khắc.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Mission;
