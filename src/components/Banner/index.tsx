
import { Carousel, Image, Container } from 'react-bootstrap';
import './Banner.css'
import mini_item from '../../assets/sanpham/sanpham2.svg';
import banner1 from '../../assets/banner/banner5.jpg'
const Banner = () => {
  const images = [
    {
      src: banner1,
      alt: 'iP16',
    },
    {
      src: banner1,
      alt: 'biz_veh_Ecom_banner',
    },
    {
      src: banner1,
      alt: 'pty_branding_rental_0724_0924',
    },
  ];

  return (
    <Container>
      <Carousel>
        {images.map((img, index) => (
          <Carousel.Item key={index}>
            <Image
              className="d-block w-100 mt-4"
              src={img.src}
              alt={img.alt}
              style={{ maxHeight: 'auto', objectFit: 'contain' }}
              
            />
          </Carousel.Item>
        ))}
      </Carousel>
        <div className='mini-menu'>
          <a href="" className='mini-menu-a'>
            <div className='mini-menu-img'>
            <img src={mini_item}/>
            </div>
            <div className="mini-menu-span">
              <span>Quần Áo</span>
            </div>
            </a>
            <a href="" className='mini-menu-a'>
            <div className='mini-menu-img'>
            <img src={mini_item}/>            </div>
            <div className="mini-menu-span">
              <span>Giày Dép</span>
            </div>
            </a>
            <a href="" className='mini-menu-a'>
            <div className='mini-menu-img'>
            <img src={mini_item}/>            </div>
            <div className="mini-menu-span">
              <span>Mũ</span>
            </div>
            </a>
            <a href="" className='mini-menu-a'>
            <div className='mini-menu-img'>
            <img src={mini_item}/>            </div>
            <div className="mini-menu-span">
              <span>Balo</span>
            </div>
            </a>
            <a href="" className='mini-menu-a'>
            <div className='mini-menu-img'>
            <img src={mini_item}/>            </div>
            <div className="mini-menu-span">
              <span>Phụ Kiện</span>
            </div>
            </a>
            <a href="" className='mini-menu-a'>
            <div className='mini-menu-img'>
            <img src={mini_item}/>            </div>
            <div className="mini-menu-span">
              <span>Khác</span>
            </div>
            </a>
            <a href="" className='mini-menu-a'>
            <div className='mini-menu-img'>
            <img src={mini_item}/>            </div>
            <div className="mini-menu-span">
              <span>Shop 0đ</span>
            </div>
            </a>
        </div>
    </Container>
  );
};

export default Banner;
