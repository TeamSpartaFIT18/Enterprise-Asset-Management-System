import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import mongoose from 'mongoose';
import cron from 'node-cron';

// Fetch all products , public
// GET -> /api/products/
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// Get all products count , admin only
// GET -> /api/products/all
const getAllProducts = asyncHandler(async (req, res) => {
  const allProducts = await Product.find({}).populate('user', 'id name');
  res.json(allProducts);
});

// Fetch one product , public
// GET -> /api/products/:id
const getOneProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// delete product , admin only
// DELETE -> /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// create product , admin only
// POST -> /api/products/
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: ' ',
    price: ' ',
    user: req.user._id,
    image: ' ',
    brand: ' ',
    category: ' ',
    countInStock: 0,
    numReviews: 0,
    description: ' ',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// update product , admin only
// PUT -> /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.desdescription = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// create review , pvt
// POST -> /api/products/:id/reviews
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// create complaint , pvt
// POST -> /api/products/:id/complaints
const createProductComplaint = asyncHandler(async (req, res) => {
  const { complain, isHandled } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const complaint = {
      name: req.user.name,
      address: req.user.address,
      contact: req.user.contact,
      complain,
      isHandled,
      user: req.user._id,
    };

    product.complaints.push(complaint);

    await product.save();
    res.status(201).json({ message: 'Complaint added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// update complaint to handled and assign employee , admin only
// PUT -> /api/products/:id/complaints
const updateComplaint = asyncHandler(async (req, res) => {
  const { employee, complaintId } = req.body;
  const product = await Product.findById(req.params.id);

  const complaints = product.complaints;

  var name = req.body.employee;
  var isHandled = true;
  for (var i = 0; i < complaints.length; i++) {
    if (complaints[i]._id == req.body.complaintId) {
      if (product) {
        (complaints[i].employee = name), (complaints[i].isHandled = isHandled);

        const updated = await product.save();
        res.json(updated);
      } else {
        res.status(404);
        throw new Error('Order not found');
      }

      break;
    }
  }
});

// update complaint to handled and assign employee , admin only
// PUT -> /api/products/:id/complaints
const updateComplaintByEmp = asyncHandler(async (req, res) => {
  const { jobDescription, complaintId } = req.body;
  const product = await Product.findById(req.params.id);

  const complaints = product.complaints;

  console.log(req.body.jobDescription, product, req.body.complaintId);

  var desc = req.body.jobDescription;
  var isJobDone = true;
  for (var i = 0; i < complaints.length; i++) {
    if (complaints[i]._id == req.body.complaintId) {
      if (product) {
        (complaints[i].jobDescription = desc),
          (complaints[i].isJobDone = isJobDone);

        const updated = await product.save();
        res.json(updated);
      } else {
        res.status(404);
        throw new Error('Order not found');
      }

      break;
    }
  }
});

// get top rated products , public
// GET -> /api/products/top
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});


const emailSchedular = asyncHandler(async (req,res)=>{
  // let product = {
  //   rating: 4,
  //   numReviews: 12,
  //   price: 8000,
  //   countInStock: 0,
  //   _id: '605ecbfd29723722744f28bf',
  //   name: 'Laser Printer',
  //   image: '/images/laserPrinter.png',
  //   description: 'Epson laser printer for clear printing',
  //   brand: 'Epson',
  //   category: 'Printer',
  //   user: '605ecbfd29723722744f28b5',
  //   reviews: [],__v: 0,
  //   createdAt: '2021-03-27T06:09:01.784Z',
  //   updatedAt: '2021-03-27T06:09:01.784Z',
  //   complaints: []}

    //let date = product.createdAt.getDate();
    // let date = Date.parse(product.createdAt);
    // let month = date.getMonth();
    // let year = date.getFullYear();

    // console.log('date : '+date, ' month : '+month+' year : '+year);

    let products =await Product.find({})

    products.map((item)=>{
      console.log(item.createdAt.getDate());
    })

    let date = products[0].createdAt.getDate();
    let month = products[0].createdAt.getMonth();
    let year = products[0].createdAt.getFullYear();

    let scheduledMonth = month + 7;
    let schceduledYear = year;

    if(scheduledMonth > 12){
      scheduledMonth = scheduledMonth - 12;
      schceduledYear++;
    }

    // console.log('Date : '+date,' Month : '+month,' Year : '+ year)
    console.log('Date : '+date,' Scheduled Month : '+scheduledMonth,' Scheduled Year : '+ schceduledYear)

    // cron.schedule('* * * * *', () => {
    //   console.log('running a task every minute');
    // });

    // cron.schedule('0 45 12 4 *', () => {
    //   console.log('Scheduled for 12 50');
    // });

    console.log(cron.validate('3 13 * * *'))

    var task = cron.schedule('9 13 * * *', () =>  {
      console.log('stopped task execute at 13 9 '+Date.now().toLocaleString());
    }, {
      scheduled: true
    });
    
    task.start();
  
  // transporter.sendMail({
  //   to: user.email,
  //   from: 'teamsparta.eams@gmail.com',
  //   subject: 'Reset Password',
  //   html: `<h2>Welcome to Enterprise Asset Management System ${user.name}</h2>
  //   <h3>Please Click on the given link to reset your password</h3>
  //   <a href="${process.env.CLIENT_URL}/resetpassword/${user._id}">Reset Link</a>
  //   `,
  // });

  res.json(products);
})

export {
  getProducts,
  getAllProducts,
  getOneProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  createProductComplaint,
  updateComplaint,
  updateComplaintByEmp,
  getTopProducts,
  emailSchedular
};
