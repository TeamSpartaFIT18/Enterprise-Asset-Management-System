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
            let deliveredMonth = deliveredDate.getMonth();
            let deliveredYear = deliveredDate.getFullYear();

            // if(deliveredMonth + 6 > 11){
            //     deliveredMonth = deliveredMonth - 11;
            //     deliveredYear++;
            //     deliveredDate.setMonth(deliveredMonth + 6);
            //     deliveredDate.setFullYear(deliveredYear);
            // }else{
            //     deliveredDate.setMonth(deliveredMonth + 6);
            // }

            deliveredDate.setDate(22);

            if(deliveredDate < today){
                availabeSchedules.push(item);
            }
        })

        res.status(200).json(availabeSchedules);
    }catch(ex){
        res.status(500).json({
            message : "Something went wrong"
        })
    }
});


// Get all service schedules
// GET api/schedule/all
const getAllSchedules = asyncHandler(async (req, res) => {
    try{
        let availabeSchedules = [];
        const orders = await Order.find({isDelivered: true});
        const today = new Date;

        orders.map((item)=>{

            let deliveredDate = item.createdAt;
            let deliveredMonth = deliveredDate.getMonth();
            let deliveredYear = deliveredDate.getFullYear();

            if(deliveredMonth + 6 > 11){
                deliveredMonth = deliveredMonth - 11;
                deliveredYear++;
                deliveredDate.setMonth(deliveredMonth + 6);
                deliveredDate.setFullYear(deliveredYear);
            }else{
                deliveredDate.setMonth(deliveredMonth + 6);
            }

            if(deliveredDate < today){
                availabeSchedules.push(item);
            }
        })

        res.status(200).json(availabeSchedules);
    }catch(ex){
        res.status(500).json({
            message : "Something went wrong"
        })
    }
});


// Pick schedule
// POST api/schedule/
const pickSchedule = asyncHandler(async (req, res) => {
    try{
        let updatedOrder;
        const employeeId = req.body.employeeId;
        const orderId = req.body.orderId;
        const order = await Order.find({_id : orderId});

        if(order){
            updatedOrder = await Order.findByIdAndUpdate(
                {_id: orderId},
                {isSchedulePicked : true, schedulePickedBy : employeeId, isScheduleCompleted : false},
                {useFindAndModify: false}
            );
        }

        res.status(200).json(updatedOrder);
    }catch(ex){
        res.status(500).json({
            message : ex.message
        })
    }
});


// Pick schedule
// POST api/schedule/
const unPickASchedule = asyncHandler(async (req, res) => {
    try{
        let updatedOrder;
        const orderId = req.body.orderId;
        const order = await Order.find({_id : orderId});

        if(order){
            updatedOrder = await Order.findByIdAndUpdate(
                {_id: orderId},
                {isSchedulePicked : false, schedulePickedBy : '', isScheduleCompleted : false},
                {useFindAndModify: false}
            );
        }

        res.status(200).json(updatedOrder);
    }catch(ex){
        res.status(500).json({
            message : ex.message
        })
    }
});


// Completed picked schedule
// POST api/schedule/complete
const completeSchedule = asyncHandler(async (req, res) => {
    try{
        let updatedOrder;
        const orderId = req.body.orderId;
        const order = await Order.find({_id : orderId});

        if(order){
            updatedOrder = await Order.findByIdAndUpdate(
                {_id: orderId},
                {isScheduleCompleted : true},
                {useFindAndModify: false}
            );
        }

        res.status(200).json(updatedOrder);
    }catch(ex){
        res.status(500).json({
            message : ex.message
        })
    }
});


// Get all picked service schedules
// GET api/schedule/completed/all
const getAllCompletedSchedules = asyncHandler(async (req, res) => {
    try{
        const orders = await Order.find({isSchedulePicked: true, isScheduleCompleted : true});  
        res.status(200).json(orders);
    }catch(ex){
        res.status(500).json({
            message : 'Something went wrong'
        })
    }
});

// Get all ongoing service schedules
// GET api/schedule/ongoing/all
const getAllOngoingSchedules = asyncHandler(async (req, res) => {
    try{
        const orders = await Order.find({isSchedulePicked: true, isScheduleCompleted : false});
        res.status(200).json(orders);
    }catch(ex){
        res.status(500).json({
            message : 'Something went wrong'
        })
    }
});


// Get user all picked service schedules
// GET api/schedule/completed/all/:id
const getAllCompletedSchedulesByEmployee = asyncHandler(async (req, res) => {
    try{
        const employeeId  = req.params.id;
        const orders = await Order.find({isScheduleCompleted : true, schedulePickedBy: employeeId});  
        res.status(200).json(orders);
    }catch(ex){
        res.status(500).json({
            message : 'Something went wrong'
        })
    }
});

// Get user all ongoing service schedules
// GET api/schedule/ongoing/all/:id
const getAllOngoingSchedulesByEmployee = asyncHandler(async (req, res) => {
    try{
        const employeeId  = req.params.id;
        const orders = await Order.find({isScheduleCompleted : false, schedulePickedBy: employeeId});
        res.status(200).json(orders);
    }catch(ex){
        res.status(500).json({
            message : 'Something went wrong'
        })
    }
});



export { 
    getSchedules ,
    getAllSchedules ,
    pickSchedule , 
    unPickASchedule ,
    completeSchedule , 
    getAllCompletedSchedules , 
    getAllOngoingSchedules ,
    getAllCompletedSchedulesByEmployee ,
    getAllOngoingSchedulesByEmployee
};