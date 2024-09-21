function Introduce() {
  return (
    <section className="flex items-center gap-10">
      <div className="max-w-[50%] basis-1/2">
        <h2 className="mb-4 text-xl font-semibold uppercase">Giới thiệu</h2>
        <p className="text-left">
          Chào mừng bạn đến với <span className="font-bold">SOMEHOW</span>, nơi
          mang đến cho bạn những bộ sưu tập thời trang độc đáo và tinh tế. Chúng
          tôi tự hào là thương hiệu thời trang mang đậm phong cách cá nhân, luôn
          cập nhật xu hướng mới nhất và mang lại sự lựa chọn đa dạng cho khách
          hàng.
        </p>
      </div>
      <img
        className="h-80 max-w-[50%] basis-1/2 rounded-md object-cover"
        src="https://vietgangz.com/wp-content/uploads/2020/10/95821448_912157855876773_3364977254303006720_o.jpg"
        alt="banner"
      />
    </section>
  );
}

export default Introduce;
