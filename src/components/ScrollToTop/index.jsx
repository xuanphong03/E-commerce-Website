import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation(); // Lấy đường dẫn hiện tại

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    }); // Cuộn lên đầu trang
  }, [pathname]); // Chạy lại mỗi khi đường dẫn thay đổi

  return null; // Component không render gì ra UI
}

export default ScrollToTop;
