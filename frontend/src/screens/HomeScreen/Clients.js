import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

import ceo3 from './Image/ceo3.jpg'
import ceo2 from './Image/ceo2.jpg'
import ceo1 from './Image/ceo1.jpg'

const Clients = (props) => {
  return (
    <div>
      <section class='bg-light mt-5' id='tourist'>
        <div class='container'>
          <h3 class='text-center mt-4 text-secondary'>WHAT CLIENTS SAY.</h3>
          <div class='row'>
            <div class='col-md-4 sm-6'>
              <div class='testimonial mb-5'>
                <div class='avatar mx-auto'>
                  <img
                    src={ceo3}
                    width='240px'
                    height='240px'
                    className='ebert rounded-circle z-depth-1 '
                  />
                </div>
                <h4 class='font-weight-bold dark-grey-text mt-4'>
                  Mr. Lorey Ebert
                </h4>
                <h6 class='font-weight-bold blue-text my-3'>
                  Chife Officer<br></br> EFL 3PL Sri LAnka
                </h6>
                <p class='font-weight-normal dark-grey-text'>
                  " EFL, we dedicatedto stratigically partner with Emisky in
                  order to make sure that our digitization dream will become a
                  reality.".
                </p>
              </div>
            </div>

            <div class='col-md-4 sm-6'>
              <div class='testimonial mb-5'>
                <div class='avatar mx-auto'>
                  <img
                    src={ceo2}
                    width='240px'
                    height='240px'
                    class='rounded-circle z-depth-1 '
                  />
                </div>
                <h4 class='font-weight-bold dark-grey-text mt-4'>
                  Mr. Indika Gunawardena
                </h4>
                <h6 class='font-weight-bold blue-text my-3'>
                  Group CIO <br></br> LAUGHS Holding Limited
                </h6>
                <p class='font-weight-normal dark-grey-text'>
                  ' Eimsky is the one stop vendor for all your RFID/Access
                  management needs. With a wide range of RFID and visitor/access
                  management solutions, Eimsky’s after sales support is simply
                  amazing. The flexible API extensions have allowed us to
                  integrate several of our own systems into Eimsky's visitor
                  Management solution to further automate processes, reduce
                  errors and improve efficiency.
                </p>
              </div>
            </div>

            <div class='col-md-4 sm-6'>
              <div class='testimonial mb-5'>
                <div class='avatar mx-auto'>
                  <img
                    src={ceo1}
                    width='240px'
                    height='240px'
                    class='rounded-circle z-depth-1 '
                  />
                </div>
                <h4 class='font-weight-bold dark-grey-text mt-4'>
                  Mr. Summera Madurapperuma
                </h4>
                <h6 class='font-weight-bold blue-text my-3'>
                  Assistant Manager <br></br>Logiwiz Limited
                </h6>

                <p class='font-weight-normal dark-grey-text'>
                  "We, Advantis 3PL Plus-one of the leading Third party Solution
                  providers in Srship with imsky team and their dedication to
                  "iTouch-Samart Attendence Management System" is evident in all
                  introduction mordern functionality of the provided.We
                  appreciate their attention to detail and and creating approach
                  to bringing the company's vision into reality while strength
                  the professional relationships in all the way"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div>
        <hr />
      </div>
    </div>
  )
}

Clients.propTypes = {}

export default Clients
