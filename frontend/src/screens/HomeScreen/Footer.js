import React from 'react'

import { Table, Button, Row, Col } from 'react-bootstrap'
import * as FaIcons from 'react-icons/fa'
import './style.css'

const Footer = () => {
  return (
    <div>
      <section class='bg-light mt-5' id='tourist'>
        <div class='footer'>
          <div class='row'>
            <div class='col-md-3'>
              <h4 className='font-weight-bold'>ABOUT EIMSKY</h4>
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
              <h4 className='font-weight-bold'>PRODUCT CATALOGUE</h4>
              <p>
                Make a request to receive our latest product catalogue for new
                ideas, inspiration and our services!
              </p>
            </div>
            <div class='col-md-3'>
              <h4 className='font-weight-bold'>Quick content</h4>
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
              <h4 className='font-weight-bold'>Follow Us on</h4>
              <p>
                <FaIcons.FaFacebookSquare />
                <strong> facebook</strong>
              </p>
              <p>
                <FaIcons.FaYoutube />
                <strong> Youtube</strong>
              </p>
              <p>
                <FaIcons.FaTwitterSquare />
                <strong> Twitter</strong>
              </p>
            </div>
          </div>
          <hr></hr>{' '}
        </div>
      </section>
    </div>
  )
}

export default Footer
