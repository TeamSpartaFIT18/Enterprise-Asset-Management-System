import React from 'react'

import Award1 from './Image/Award1.jpg'
import Award3 from './Image/Award3.jpg'
import Award4 from './Image/Award4.png'

const Awards = () => {
  return (
    <div>
      <section class='' id='destinations'>
        <div class='container'>
          <div class='row'>
            <div class='col-sm-4 col-md-12'>
              <h2 class='text-center mt-4 text-secondary'>AWARDS </h2>
              <h6 class='text-center mt-4 text-secondary'>
                Eimsky won the Gold award for Digital Supply Chain Suite at
                NBQSA 2019
              </h6>
            </div>
          </div>
          <div class='row'>
            <div class='col-sm-4 mb-5'>
              <div class='card mt-4'>
                <img class='card-img-top' src={Award1} alt='' />
                <div class='card-body'>
                  <h4 class='card-title text-secondary'>NBQSA 2017</h4>
                  <p class='card-text text-secondary'>
                    Eimsky won the Overall Bronze Award and the Most Innovative
                    & best solution in cloud computing Application for Smart
                    Office Suite.
                  </p>
                </div>
                {/* <div class="card-footer">
                                    <a href="#" class="btn btn-primary">Find Out More!</a>
                                </div> */}
              </div>
            </div>
            <div class='col-sm-4 mb-5'>
              <div class='card mt-4'>
                <img class='card-img-top' src={Award3} alt='' />
                <div class='card-body'>
                  <h4 class='card-title text-secondary'>
                    APICTA Awards 2017 - Dhaka
                  </h4>
                  <p class='card-text text-secondary'>
                    Eimsky won First Merit Award for Smart Office Suite in the
                    Application Tools and Platforms category.
                  </p>
                </div>
                {/* <div class="card-footer">
                                    <a href="#" class="btn btn-primary">Find Out More!</a>
                                </div> */}
              </div>
            </div>
            <div class='col-sm-4 mb-5'>
              <div class='card mt-4'>
                <div class='bg-image hover-zoom'>
                  <img class='card-img-top' src={Award4} class='w-100' alt='' />
                </div>

                <div class='card-body'>
                  <h4 class='card-title text-secondary'>NBQSA 2019</h4>
                  <p class='card-text text-secondary'>
                    Eimsky won First Merit Award for Smart Office Suite also won
                    the Gold award for Digital Supply Chain Suite in Digital
                    Supply Chain Category.
                  </p>
                </div>
                {/* <div class="card-footer">
                                    <a href="#" class="btn btn-primary">Find Out More!</a>
                                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Awards
