import cron from 'node-cron';

import Product from '../models/productModel.js';
import User from '../models/userModel.js';

const sendScheduledEmails = async () => {
  
  let products = await Product.find({ scheduledEmailsSent: false});

  let employees = await User.find({ isEmployee: true });

  if(products.length != 0){
    products.map((item)=>{

      let date = item.createdAt.getDate();
      let month = item.createdAt.getMonth();
      let year = item.createdAt.getFullYear();

      let scheduledMonth = month + 7;
      let schceduledYear = year;

      if(scheduledMonth > 12){
        scheduledMonth = scheduledMonth - 12;
        schceduledYear++;
      }

      var task = cron.schedule(`0 6 ${date} ${scheduledMonth} *`,async () =>  {

        employees.map((emp)=>{
          // send email 
          transporter.sendMail({
            to: emp.email,
            from: 'teamsparta.eams@gmail.com',
            subject: 'Reset Password',
            html: `<h2>Welcome to Enterprise Asset Management System ${user.name}</h2>
            <h3>Please Click on the given link to reset your password</h3>
          <a href="${process.env.CLIENT_URL}/resetpassword/${user._id}">Reset Link</a>
            `,
          });
        })
        item.scheduledEmailsSent = true;
        await item.save(); // Update product
      }, {
        scheduled: true
      });
      
      task.start();
      
    })
  }

}

export default sendScheduledEmails
