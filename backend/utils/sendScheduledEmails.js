import cron from 'node-cron';

import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

const sendScheduledEmails = async () => {
  
  let orders = await Order.find({ scheduledEmailsSent: false, isDelivered: true});

  let employees = await User.find({ isEmployee: true });

  if(orders.length != 0){
    orders.map((item)=>{

      let date = item.deliveredAt.getDate();
      let month = item.deliveredAt.getMonth();
      let scheduledMonth = month + 7;
  
      if(scheduledMonth > 12){
        scheduledMonth = scheduledMonth - 12;
      }

      var task = cron.schedule(`0 6 ${date} ${scheduledMonth} *`,async () =>  {

        employees.map((emp)=>{
          // send email 
          transporter.sendMail({
            to: emp.email,
            from: 'teamsparta.eams@gmail.com',
            subject: 'Service Schedule',
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
