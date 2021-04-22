import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// Get all available service schedules
// GET api/schedule/
const getSchedules = asyncHandler(async (req, res) => {
    try{
        let availabeSchedules = [];
        const orders = await Order.find({isSchedulePicked: false, isDelivered: true});
        const today = new Date;

        orders.map((item)=>{

            let deliveredDate = item.createdAt;
            let deliveredMonth = devliveredDate.getMonth();
            let deliveredYear = devliveredDate.getFullYear();

            if(deliveredMonth + 6 > 11){
                deliveredMonth = devliveredMonth - 11;
                deliveredYear++;
                deliveredDate.setMonth(deliveredMonth + 6);
                deliveredDate.setFullYear(deliveredYear);
            }else{
                deliveredDate.setMonth(deliveredMonth + 6);
            }

            deliveredDate.setDate(1);

            if(deliveredDate < today){
                availabeSchedules.push(item);
            }
        })

        res.status(200).json(availabeSchedules);
    }catch(ex){
        res.status(200).json({
            message : ex.message
        })
    }
});


// Get all picked service schedules
// GET api/schedule/all
const getAllSchedules = asyncHandler(async (req, res) => {
    try{
        const orders = await Order.find({isSchedulePicked: true, isDelivered: true});
        res.status(200).json(profile);
    }catch(ex){
        res.status(200).json({
            message : 'No schedules found'
        })
    }
});


// Pick schedule
// POST api/schedule/
const pickSchedule = asyncHandler(async (req, res) => {
    try{
        const orders = await Order.find({isSchedulePicked: false, isDelivered: true});  
        res.status(200).json(profile);
    }catch(ex){
        res.status(200).json({
            message : 'No schedules found'
        })
    }
});



export { getSchedules, getAllSchedules, pickSchedule };