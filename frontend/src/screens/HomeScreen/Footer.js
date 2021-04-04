import React from 'react'
import * as FaIcons from 'react-icons/fa'

const Footer = () => {
  return (
    <div>
      <section class='bg-light mt-5' id='tourist'>
        <div class='footer'>
          <div class='row'>
            <div class='col-md-3'>
              <h4>ABOUT EIMSKY</h4>
              <p>
                We are specialized in providing cutting edge
                <br />
                RFID, IoT and NFC solutions.
                <br />
                We are also expertized in re-designing the
                <br />
                current service delivery model through <br />
                innovations and enabling technologies.{' '}
              </p>
            </div>
            <div class='col-md-3'>
              <h4>PRODUCT CATALOGUE</h4>
              <p>
                Make a request to receive our latest product catalogue for new
                ideas, inspiration and our services!
              </p>
            </div>
            <div class='col-md-3'>
              <h4>Quick content</h4>
              <p>
                {' '}
                <i class='fa fa-phone-square'></i>+1 0123456789
              </p>
              <p>
                {' '}
                <i class='fa fa-envelope'></i>info@eimsky.com{' '}
              </p>
              <p>
                {' '}
                <i class='fa fa-home'></i> St. Alban's Place,
                <br />
                Colombo 4, Sri Lanka.
              </p>
            </div>
            <div class='col-md-3'>
              <h4>Follow Us on</h4>
              <div className='col-md-2'>
                <p>
                  <i class='fa fa-facebook-square'></i>
                </p>
              </div>
              <div>
                <p>facebook</p>
              </div>
              <p>
                <FaIcons.FaFacebookSquare />
                Facebook
              </p>
              <p>
                {' '}
                <i class='fa fa-youtube-play'></i>YouTube
              </p>
              <p>
                {' '}
                <i class='fa fa-twitter'></i>Twitter
              </p>
            </div>
          </div>
          <hr></hr>{' '}
          <h6 class='copyright text-center mt-4 text-secondary'>
            © 2020 Eimsky Business Solutions Pvt Ltd. All Rights Reserved.
          </h6>
        </div>
      </section>
    </div>
  )
}

export default Footer
