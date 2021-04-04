import React from 'react'
import Meta from '../../components/Meta'
import LandingCarousel from './LandingCarousel'
import Clients from './Clients'
import Awards from './Awards'
import Footer from './Footer'
import AboutUs from './AboutUs'

const HomeScreen = () => {
  return (
    <body>
      <div>
        <Meta />
        <LandingCarousel />
        <AboutUs />
        <Clients />
        <Awards />
        <Footer />
      </div>
    </body>
  )
}

export default HomeScreen
