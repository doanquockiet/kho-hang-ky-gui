import { Carousel, Image, Container } from 'react-bootstrap';
import './Banner.css'
const Banner = () => {
  const images = [
    {
      src: 'https://cdn.chotot.com/admincentre/GWHdYffV4iUjxw2BS0TdKMTQqAP3wFuYtRSMmRHQ5t4/preset:raw/plain/50c48006aad46c4a16f291fcf35ee57c-2896073434166898662.jpg',
      alt: 'iP16',
    },
    {
      src: 'https://cdn.chotot.com/admincentre/eVdMb4fSM2lHISXVcjvbZ1k16dHBomkzsy6YEVkekbY/preset:raw/plain/cf1b83e355f45deec5cdd7d780e450e1-2894086632876446338.jpg',
      alt: 'biz_veh_Ecom_banner',
    },
    {
      src: 'https://cdn.chotot.com/admincentre/86FrRf8VDOq1fxMGwuHFSaETWdd5C_vLhAOv1egExZU/preset:raw/plain/406579102fbbfa9b07a60b10ba151e55-2893064675034523442.jpg',
      alt: 'pty_branding_rental_0724_0924',
    },
  ];

  return (
    <Container>
      <Carousel>
        {images.map((img, index) => (
          <Carousel.Item key={index}>
            <Image
              className="d-block w-100"
              src={img.src}
              alt={img.alt}
              style={{ maxHeight: 'auto', objectFit: 'cover' }}
              fluid
            />
          </Carousel.Item>
        ))}
      </Carousel>
        <div className='mini-menu'>
          <a href="" className='mini-menu-a'>
            <div className='mini-menu-img'>
            <img src='https://www.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2F3xjm4bI3TvIEMmH7ixXfvgrsNlJAuUUjt1D0Ye8gsPM%2Fpreset%3Araw%2Fplain%2F217a8c3c38a20721fb3e985b432e2c3d-2871731397826950358.jpg&w=256&q=95'/>
            </div>
            <div className="mini-menu-span">
              <span>Quần Áo</span>
            </div>
            </a>
            <a href="" className='mini-menu-a'>
            <div className='mini-menu-img'>
            <img src='https://www.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2F3xjm4bI3TvIEMmH7ixXfvgrsNlJAuUUjt1D0Ye8gsPM%2Fpreset%3Araw%2Fplain%2F217a8c3c38a20721fb3e985b432e2c3d-2871731397826950358.jpg&w=256&q=95'/>
            </div>
            <div className="mini-menu-span">
              <span>Giày Dép</span>
            </div>
            </a>
            <a href="" className='mini-menu-a'>
            <div className='mini-menu-img'>
            <img src='https://www.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2F3xjm4bI3TvIEMmH7ixXfvgrsNlJAuUUjt1D0Ye8gsPM%2Fpreset%3Araw%2Fplain%2F217a8c3c38a20721fb3e985b432e2c3d-2871731397826950358.jpg&w=256&q=95'/>
            </div>
            <div className="mini-menu-span">
              <span>Mũ</span>
            </div>
            </a>
            <a href="" className='mini-menu-a'>
            <div className='mini-menu-img'>
            <img src='https://www.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2F3xjm4bI3TvIEMmH7ixXfvgrsNlJAuUUjt1D0Ye8gsPM%2Fpreset%3Araw%2Fplain%2F217a8c3c38a20721fb3e985b432e2c3d-2871731397826950358.jpg&w=256&q=95'/>
            </div>
            <div className="mini-menu-span">
              <span>Balo</span>
            </div>
            </a>
            <a href="" className='mini-menu-a'>
            <div className='mini-menu-img'>
            <img src='https://www.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2F3xjm4bI3TvIEMmH7ixXfvgrsNlJAuUUjt1D0Ye8gsPM%2Fpreset%3Araw%2Fplain%2F217a8c3c38a20721fb3e985b432e2c3d-2871731397826950358.jpg&w=256&q=95'/>
            </div>
            <div className="mini-menu-span">
              <span>Phụ Kiện</span>
            </div>
            </a>
            <a href="" className='mini-menu-a'>
            <div className='mini-menu-img'>
            <img src='https://www.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2F3xjm4bI3TvIEMmH7ixXfvgrsNlJAuUUjt1D0Ye8gsPM%2Fpreset%3Araw%2Fplain%2F217a8c3c38a20721fb3e985b432e2c3d-2871731397826950358.jpg&w=256&q=95'/>
            </div>
            <div className="mini-menu-span">
              <span>Shop 0đ</span>
            </div>
            </a>
        </div>
    </Container>
  );
};

export default Banner;
