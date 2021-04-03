import React from 'react'
// import './bootstrap/dist/bootstrap.min.css';
import { Carousel, Image } from 'react-bootstrap'
import img from './Image/img.png'
import img1 from './Image/img1.jpg'
import img3 from './Image/img3.jpeg'
import './style.css'
const LandingCarousel = () => {
  return (
    <Carousel pause='hover' className='landingCar'>
      <Carousel.Item>
        <Image
          className='image1'
          src={img}
          alt='sample'
          height='660px'
          width='1540px'
        ></Image>
        <Carousel.Caption className='carousel-caption1'>
          <h1>
            <strong>Enterprise Asset Management System</strong>
          </h1>
          <p>Eimsky Business Solutions (Pvt) ltd.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className='image2'
          src={img1}
          alt='sample'
          height='665px'
          width='1540px'
        ></Image>
        <Carousel.Caption className='carousel-caption2'>
          <h1>
            <strong>Enterprise Asset Management System</strong>
          </h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className='image3'
          src={img3}
          alt='sample'
          height='665px'
          width='1540px'
        ></Image>
        <Carousel.Caption className='carousel-caption3'>
          <h1>
            <strong>Enterprise Asset Management System</strong>
          </h1>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default LandingCarousel
