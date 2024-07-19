import { AiOutlineShop } from 'react-icons/ai';
import { BsCoin } from 'react-icons/bs';
import { GrMoney } from 'react-icons/gr';
import { PiHandbag } from 'react-icons/pi';
import './Service.css';

const SERVICES = [
  {
    icon: <AiOutlineShop />,
    title: 'Seller hoạt động trên website của chúng tôi',
    subtitle: '10.5K',
  },
  {
    icon: <BsCoin />,
    title: `Sản phẩm được bán hàng tháng`,
    subtitle: '33K',
  },
  {
    icon: <PiHandbag />,
    title: 'Khách hàng hoạt động trên website của chúng tôi',
    subtitle: '45.5K',
  },
  {
    icon: <GrMoney />,
    title: 'Tổng doanh thu hàng năm trên website của chúng tôi',
    subtitle: '25K',
  },
];

function Service(props) {
  return (
    <section className="grid grid-cols-12 gap-[30px]">
      {SERVICES.map((service, index) => (
        <article
          key={index}
          className="service-item border-[rgba(0, 0, 0, 0.30)] col-span-3 flex flex-col items-center gap-6 rounded border border-solid px-[50px] py-[30px]"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#C1C0C1]">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-5xl text-white">
              {service.icon}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <h3 className="font-inter text-[32px] font-bold leading-[93.75%] tracking-[1.28px]">
              {service.subtitle}
            </h3>
            <h2 className="text-center">{service.title}</h2>
          </div>
        </article>
      ))}
    </section>
  );
}

export default Service;
