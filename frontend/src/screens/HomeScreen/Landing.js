import React from 'react';
// import './bootstrap/dist/bootstrap.min.css';
import { Carousel, Image } from 'react-bootstrap';
import img from '../Image/img.png';
import img1 from '../Image/img1.jpg';
import img3 from '../Image/img3.jpeg';
const Landing = () => {
  return (
    <Carousel pause='hover' className='bg-dark'>
      <Carousel.Item>
        <Image src={img} alt='sample' height='660px' width='1540px'></Image>
        <Carousel.Caption className='carousel-caption'>
          <h1>
            <strong>First slide label</strong>
          </h1>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={img1} alt='sample' height='665px' width='1540px'></Image>
        <Carousel.Caption className='carousel-caption'>
          <h1>
            <strong>Second slide label</strong>
          </h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={img3} alt='sample' height='665px' width='1540px'></Image>
        <Carousel.Caption className='carousel-caption'>
          <h1>
            <strong>Third slide label</strong>
          </h1>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Landing;
